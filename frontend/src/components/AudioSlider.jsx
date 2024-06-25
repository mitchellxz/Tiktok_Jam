import "./audioSlider.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PropTypes from "prop-types";

function AudioSlider({ songName, songArtist }) {
  const Player = () => (
    <AudioPlayer
      src="https://p.scdn.co/mp3-preview/4a438f582e58571635ebb3ecbf88ae6407b8486d?cid=cfe923b2d660439caf2b557b21f31221"
      onPlay={() => console.log("onPlay")}
      showJumpControls={false}
      customAdditionalControls={[
        <div key={songName}>{songName}</div>,
        <div key={songArtist}>{songArtist}</div>,
        <div key={songArtist + songName}>
          {songArtist}+{songName}
        </div>,
      ]}
    />
  );

  return (
    <>
      <Player />
    </>
  );
}

AudioSlider.propTypes = {
  songName: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
};

export default AudioSlider;
