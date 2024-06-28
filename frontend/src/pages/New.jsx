import SearchSong from "../components/SearchSong";
import Heading from "../components/Heading";
import MainSong from "../components/MainSong";
import RecSongs from "../components/RecSongs";
import { useEffect, useState } from "react";
import api from "../api";

function New() {
  const [showRecommended, setShowRecommended] = useState(false);
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
    setShowRecommended(true);
  };
  return (
    <>
      <Heading />
      <MainSong onConfirm={handleConfirmClick} />
      {showRecommended && <RecSongs />}
      <SearchSong />
    </>
  );
}

export default New;
