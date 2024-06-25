import { useEffect, useState } from "react";
import "./recSongs.css";
import AudioSlider from "./AudioSlider";
import songData from "./songData.json";
import React from "react";

function RecSongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(songData);
  }, []);

  return (
    <div>
      <h2>Recommended Songs</h2>
      <div className="rec-songs">
        {songs.map((song) => (
          <React.Fragment key={song.songName}>
            <AudioSlider
              songName={song.songName}
              songArtist={song.songArtist}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default RecSongs;
