import Heading from "../components/Heading";
import MainSong from "../components/MainSong";
import RecSongs from "../components/RecSongs";
import { useEffect, useState } from "react";

function New() {
  const [showRecommended, setShowRecommended] = useState(false);
  const [trackFeatures, setTrackFeatures] = useState({});
  const [trackInfo, setTrackInfo] = useState(null);
  console.log("track features: " + JSON.stringify(trackFeatures));

  const handleConfirmClick = () => {
    setShowRecommended(false);
    setTimeout(() => {
      setShowRecommended(true);
    }, 0);
  };

  const handleNewSongClick = () => {
    setShowRecommended(false);
  };

  return (
    <>
      <Heading />
      <MainSong
        onConfirm={handleConfirmClick}
        onNewSong={handleNewSongClick}
        setTrackFeatures={setTrackFeatures}
        setTrackInfo={setTrackInfo}
      />
      {showRecommended && (
        <RecSongs trackFeatures={trackFeatures} track_id={trackInfo.track_id} />
      )}
    </>
  );
}

export default New;
