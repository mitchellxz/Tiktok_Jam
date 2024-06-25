import SearchSong from "../components/SearchSong";
import Heading from "../components/Heading";
import MainSong from "../components/MainSong";
import RecSongs from "../components/RecSongs";
import { useState } from "react";

function New() {
  const [showRecommended, setShowRecommended] = useState(false);

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
