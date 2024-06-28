import { useEffect, useState } from "react";

const useTrackInfo = (query) => {
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const encodedQuery = encodeURIComponent(query);
      const accessToken = localStorage.getItem("access_token");
      const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.tracks && data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          setTrackInfo({
            name: track.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            artist_id: track.artists.map((artist) => artist.id),
            album: track.album.name,
            releaseDate: track.album.release_date,
            imageURL: track.album.images[0]?.url,
            track_id: track.id,
            trackURL: track.external_urls.spotify,
            preview: track.preview_url,
          });
        }
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchData();
  }, [query]);

  return trackInfo;
};

export default useTrackInfo;
