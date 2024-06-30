import { useEffect, useState } from "react";
import Features from "./Features";

function SearchSong() {
  const [trackInfo, setTrackInfo] = useState(null);
  const query = "track:How Sweet artist:NewJeans"; //track:songName artist:artistName
  const encodedQuery = encodeURIComponent(query);

  useEffect(() => {
    const fetchData = async () => {
      // changing to authentication token instead of access token
      // so only this page and features will have spotify authentication
      const accessToken = localStorage.getItem("spotify_access_token");
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
  }, [encodedQuery]);

  return (
    <>
      <h2>Displaying track info..</h2>
      {trackInfo ? (
        <div>
          <p>
            <strong>Track Name:</strong> {trackInfo.name}
          </p>
          <p>
            <strong>Artist:</strong> {trackInfo.artist}
          </p>
          <p>
            <strong>Artist ID :</strong> {trackInfo.artist_id}
          </p>
          <p>
            <strong>Album:</strong> {trackInfo.album}
          </p>
          <p>
            <strong>Release Date:</strong> {trackInfo.releaseDate}
          </p>
          <p>
            <img src={trackInfo.imageURL} alt={`${trackInfo.album} cover`} />
          </p>
          <p>
            <strong>Song ID:</strong> {trackInfo.id}
          </p>
          <p>
            <strong>track url:</strong> {trackInfo.trackURL}
          </p>
          <p>
            <strong>preview:</strong> {trackInfo.preview}
          </p>
          <div>
            <Features
              track_id={trackInfo.track_id}
              artist_id={trackInfo.artist_id}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default SearchSong;
