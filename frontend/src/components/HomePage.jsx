import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

const HomePage = () => {
  const [authCode, setAuthCode] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const location = window.location.href;
  console.log(window.location.href);

  useEffect(() => {
    let code = location.split("code=")[1];
    if (code && code.includes("#/login")) {
      code = code.split("#/login")[0];
    }

    if (code && authCode !== code) {
      setAuthCode(code);
      sendCodeToBackend(code);
    }
  }, [location, authCode]);

  const handleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_KEY;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    window.location.href =
      `https://accounts.spotify.com/authorize?` +
      `response_type=code&client_id=${CLIENT_ID}&scope=user-read-email&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}`;
  };

  const sendCodeToBackend = (code) => {
    console.log("Sending code to backend:", code); // Debugging
    api
      .post("/api/spotify/callback/", { code })
      .then((response) => {
        const { token_data } = response.data;
        console.log("Backend response:", response.data); // Debugging
        console.log(token_data);
        if (token_data) {
          localStorage.setItem("access_token", token_data.access_token);
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.error("Error sending code to backend:", error); // Debugging
      });
  };

  if (redirect) {
    return <Navigate to="/Random" />;
  }

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default HomePage;
