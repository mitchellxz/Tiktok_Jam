import { useState, useEffect } from "react";

function SpotifyAuth() {
  const [token, setToken] = useState(null);
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_KEY;
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  console.log(CLIENT_ID);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));
  }, []);
  return (
    <>
      <h1>{token ? "Authorized" : "Authorizing"}</h1>
    </>
  );
}

export default SpotifyAuth;
