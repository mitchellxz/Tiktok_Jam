import Heading from "../components/Heading";
import MainSong from "../components/MainSong";
import RecSongs from "../components/RecSongs";
import { useEffect, useState } from "react";
import api from "../api";

function New() {
  const [showRecommended, setShowRecommended] = useState(false);
  const [trackFeatures, setTrackFeatures] = useState({});
  const [trackInfo, setTrackInfo] = useState(null);
  console.log("track features: " + JSON.stringify(trackFeatures));
  const [songs, setSongs] = useState([]);

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
        <RecSongs
          trackFeatures={trackFeatures}
          seed_artists={trackInfo.artist_id}
        />
      )}
    </>
  );
}

export default New;
