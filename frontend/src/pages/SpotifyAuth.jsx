import { useState, useEffect } from "react";

function SpotifyAuth() {
  const [token, setToken] = useState(null);
  const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_KEY;
  const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;

  useEffect(() => {
    const getAuthToken = async () => {
      const authOptions = {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      };

      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authOptions
        );
        if (response.ok) {
          const data = await response.json();
          setToken(data.access_token);
        } else {
          console.error("Error fetching the token:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching the token:", error);
      }
    };

    getAuthToken();
  }, [CLIENT_ID, CLIENT_SECRET]);

  return (
    <>
      <h1>{token ? "Authorized" : "Authorizing"}</h1>
    </>
  );
}

export default SpotifyAuth;
