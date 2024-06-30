import "./audioSlider.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PropTypes from "prop-types";

function AudioSlider({ songName, songArtist, songLink, songPreview }) {
  const Player = () => (
    <AudioPlayer
      src={songPreview}
      onPlay={() => console.log("onPlay")}
      showJumpControls={false}
      customAdditionalControls={[
        <div key={songName + " song"}>{songName}</div>,
        <div key={songArtist + " artist"}>{songArtist}</div>,
        <div key={songLink + " link"}>{songLink}</div>,
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
  songLink: PropTypes.string.isRequired,
  songPreview: PropTypes.string.isRequired,
};

export default AudioSlider;
