import { useEffect, useState } from "react";
import "./recSongs.css";
import AudioSlider from "./AudioSlider";
import React from "react";
import PropTypes from "prop-types";

function RecSongs(props) {
  const [recommendations, setRecommendations] = useState(null);
  console.log(props.trackFeatures);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("spotify_access_token");
      const url =
        `https://api.spotify.com/v1/recommendations?limit=5&target_popularity=15&seed_tracks=` +
        `${props.track_id}&target_acousticness=` +
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
  }, [props.trackFeatures, props.track_id]);

  return (
    <div>
      <h2 className="rec-h2">Recommended Songs</h2>
      <div className="rec-songs">
        {recommendations ? (
          <>
            {recommendations.tracks.map((track, index) => (
              <React.Fragment key={track.id + index}>
                <AudioSlider
                  songName={track.name}
                  songArtist={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  songLink={track.external_urls.spotify}
                  songPreview={track.preview_url}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

RecSongs.propTypes = {
  track_id: PropTypes.string,
  trackFeatures: PropTypes.object,
};

export default RecSongs;
