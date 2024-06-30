import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Features(props) {
  const [trackFeatures, setTrackFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("spotify_access_token");
      const url = `https://api.spotify.com/v1/audio-features/${props.track_id}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setTrackFeatures({
          acousticness: data.acousticness,
          danceability: data.danceability,
          energy: data.energy,
          instrumentalness: data.instrumentalness,
          key: data.key,
          liveness: data.liveness,
          loudness: data.loudness,
          speechiness: data.speechiness,
          tempo: data.tempo,
          valence: data.valence,
        });
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };
    fetchData();
  }, [props.track_id]);

  return (
    <>
      <h3>Loading track features..</h3>
      {trackFeatures ? (
        <div>
          <p>acousticness: {trackFeatures.acousticness}</p>
          <p>danceability: {trackFeatures.danceability}</p>
          <p>energy: {trackFeatures.energy}</p>
          <p>instrumentalness: {trackFeatures.instrumentalness}</p>
          <p>key: {trackFeatures.key}</p>
          <p>liveness: {trackFeatures.liveness}</p>
          <p>loudness: {trackFeatures.loudness}</p>
          <p>speechiness: {trackFeatures.speechiness}</p>
          <p>tempo: {trackFeatures.tempo}</p>
          <p>valence: {trackFeatures.valence}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
Features.propTypes = {
  track_id: PropTypes.string,
  artist_id: PropTypes.array,
};
export default Features;
