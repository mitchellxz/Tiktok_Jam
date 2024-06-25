import "./mainSong.css";
import Slider from "./Slider";
import sliderData from "./SliderCreate";
import songData from "./SongData";
import { Tooltip as ReactTooltip } from "react-tooltip";
import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";

function MainSong({ onConfirm }) {
  const currentSong = songData[0];

  const [sliderValues, setSliderValues] = useState(
    sliderData.reduce((acc, slider) => {
      acc[slider.sliderName.toLowerCase()] =
        currentSong[slider.sliderName.toLowerCase()];
      return acc;
    }, {})
  );

  const handleSliderChange = (sliderName, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [sliderName.toLowerCase()]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(sliderValues);
    console.log(sliderValues);
  };

  return (
    <div className="border">
      <div className="col-left">
        {sliderData.slice(0, 5).map((slider) => (
          <React.Fragment key={slider.sliderName}>
            <h3 data-tooltip-id={slider.sliderName}>{slider.sliderName}</h3>
            <Slider
              MIN={slider.min}
              MAX={slider.max}
              initialValue={currentSong[slider.sliderName.toLowerCase()]}
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
        <img src={currentSong.image} className="img-fluid" alt="..."></img>
        <div className="p-song-details">
          <p className="p-song-name">{currentSong.songName}</p>

          <p className="p-song-artist">{currentSong.artist}</p>
          <p className="p-song-release-date">{currentSong.releaseDate}</p>
        </div>
        <div className="btn-div">
          <button type="button" className="btn">
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
              initialValue={currentSong[slider.sliderName.toLowerCase()]}
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
};

export default MainSong;
