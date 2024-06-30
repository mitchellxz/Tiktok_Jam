import "./mainSong.css";
import Slider from "./Slider";
import sliderData from "./SliderCreate";
import { Tooltip as ReactTooltip } from "react-tooltip";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import React from "react";
import useTrackInfo from "./useTrackInfo";
import useTrackFeatures from "./useTrackFeatures";
import { defaultValues } from "./defaultValues";

function MainSong({ onConfirm, onNewSong, setTrackFeatures, setTrackInfo }) {
  const queryList = [
    "track:How Sweet artist:NewJeans",
    "track:Ditto artist:NewJeans",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState(queryList[currentIndex]);
  const [trackId, setTrackId] = useState(null);
  const [sliderValues, setSliderValues] = useState(defaultValues);

  const trackInfo = useTrackInfo(query);
  const features = useTrackFeatures(trackId);

  const handleSliderChange = (sliderName, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [sliderName.toLowerCase()]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(sliderValues);
    setTrackFeatures(sliderValues);
  };

  const handleNewSongClick = () => {
    const nextIndex = (currentIndex + 1) % queryList.length;
    setCurrentIndex(nextIndex);
    setQuery(queryList[nextIndex]);

    setTrackId(trackInfo?.track_id);
    onNewSong();
  };

  useEffect(() => {
    if (features) {
      setTrackFeatures(features);
    }
  }, [features, setTrackFeatures]);

  useEffect(() => {
    if (trackInfo) {
      setTrackInfo(trackInfo);
    }
  }, [trackInfo, setTrackInfo]);

  useEffect(() => {
    if (trackId && features) {
      console.log("Track ID", trackId);
      const resetValues = sliderData.reduce((acc, slider) => {
        const sliderNameLower = slider.sliderName.toLowerCase();
        acc[sliderNameLower] = features[sliderNameLower] || 0;
        return acc;
      }, {});
      setSliderValues(resetValues);
    }
  }, [trackId, features]);

  return (
    <div className="border">
      <div className="col-left">
        {sliderData.slice(0, 5).map((slider) => (
          <React.Fragment key={slider.sliderName}>
            <h3 data-tooltip-id={slider.sliderName}>{slider.sliderName}</h3>
            <Slider
              MIN={slider.min}
              MAX={slider.max}
              initialValue={sliderValues[slider.sliderName.toLowerCase()]}
              onChange={(value) => handleSliderChange(slider.sliderName, value)}
            />

            <ReactTooltip
              id={slider.sliderName}
              place="bottom"
              effect="solid"
              content={slider.description}
              style={{
                backgroundColor: "rgb(20, 20, 20)",
                color: "#fff",
                fontFamily: "Montserrat",
              }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="col-mid">
        <img src={trackInfo?.imageURL} className="img-fluid" alt="..."></img>
        <div className="p-song-details">
          <p className="p-song-name">{trackInfo?.name}</p>
          <p className="p-song-artist">{trackInfo?.artist}</p>
          <p className="p-song-release-date">{trackInfo?.releaseDate}</p>
        </div>
        <div className="btn-div">
          <button type="button" className="btn" onClick={handleNewSongClick}>
            New Song
          </button>
          <button type="button" className="btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
      <div className="col-right">
        {sliderData.slice(5, 10).map((slider) => (
          <React.Fragment key={slider.sliderName}>
            <h3 data-tooltip-id={slider.sliderName}>{slider.sliderName}</h3>
            <Slider
              MIN={slider.min}
              MAX={slider.max}
              initialValue={sliderValues[slider.sliderName.toLowerCase()]}
              onChange={(value) => handleSliderChange(slider.sliderName, value)}
            />

            <ReactTooltip
              id={slider.sliderName}
              place="bottom"
              effect="solid"
              content={slider.description}
              style={{
                backgroundColor: "rgb(20, 20, 20)",
                color: "#fff",
                fontFamily: "Montserrat",
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

MainSong.propTypes = {
  onConfirm: PropTypes.func,
  onNewSong: PropTypes.func,
  setTrackFeatures: PropTypes.func,
  setTrackInfo: PropTypes.func,
};

export default MainSong;
