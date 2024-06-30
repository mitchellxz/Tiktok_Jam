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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("http://127.0.0.1:8000/api/songs/");
        console.log(response.data);
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchData();
  }, []);

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
