import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function SpotifyAuth() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_KEY;
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const url = `https://accounts.spotify.com/api/token`;
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        },
        body: body.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("spotify_access_token", data.access_token);
        setRedirect(true);
      } else {
        console.error("Failed to fetch access token", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching access token", error);
    }
  };

  if (redirect) {
    return <Navigate to="/New" />;
  }
}

export default SpotifyAuth;
