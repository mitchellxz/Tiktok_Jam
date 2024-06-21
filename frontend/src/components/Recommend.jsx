import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Recommend(props) {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const url =
        `https://api.spotify.com/v1/recommendations?limit=5&seed_artists=` +
        `${props.seed_artists}&target_acousticness=` +
        `${props.trackFeatures.acousticness}&target_danceability=` +
        `${props.trackFeatures.danceability}&target_energy=` +
        `${props.trackFeatures.energy}&target_instrumentalness=` +
        `${props.trackFeatures.instrumentalness}&target_key=` +
        `${props.trackFeatures.key}&target_liveness=` +
        `${props.trackFeatures.liveness}&target_loudness=` +
        `${props.trackFeatures.loudness}&target_speechiness=` +
        `${props.trackFeatures.speechiness}&target_tempo=` +
        `${props.trackFeatures.tempo}&target_valence=` +
        `${props.trackFeatures.valence}`;

      try {
        console.log(url);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchData();
  }, [props.seed_artists, props.trackFeatures]);

  return (
    <>
      <h3>Recommended Tracks</h3>
      {recommendations ? (
        <ul>
          {recommendations.tracks.map((track) => (
            <li key={track.id}>
              <p>Name: {track.name}</p>
              <p>
                Artist: {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p>Album: {track.album.name}</p>
              <img
                src={track.album.images[0]?.url}
                alt={`${track.album.name} cover`}
                width={100}
              />
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Spotify
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations yet</p>
      )}
    </>
  );
}

Recommend.propTypes = {
  seed_artists: PropTypes.array,
  trackFeatures: PropTypes.object,
};

export default Recommend;
