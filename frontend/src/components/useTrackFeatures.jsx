import { useEffect, useState } from "react";

const useTrackFeatures = (track_id) => {
  const [trackFeatures, setTrackFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("spotify_access_token");
      const url = `https://api.spotify.com/v1/audio-features/${track_id}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
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
  }, [track_id]);

  return trackFeatures;
};

export default useTrackFeatures;
