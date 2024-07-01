import { useEffect, useState } from "react";
import api from "../api";
import SpotifyAuth from "../components/SpotifyAuth";

function Callback() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    const stateParam = urlParams.get("state");

    if (stateParam !== localStorage.getItem("tiktok_auth_state")) {
      console.error("State does not match");
      return;
    }

    if (codeParam) {
      setCode(codeParam);
      sendCodeToBackend(codeParam);
    }
  }, []);

  const sendCodeToBackend = async (code) => {
    console.log("sending code to backend:", code);
    await api
      .post("http://127.0.0.1:8000/api/tiktok/callback/", { code })
      .then((response) => {
        const { token_data } = response.data;
        console.log("Backend response:", response.data); // Debugging
        if (token_data) {
          localStorage.setItem("access_token", token_data.access_token);
        }
      })
      .catch((error) => {
        console.log("Error sending to backend:", error);
      });
  };

  return <>{code && <SpotifyAuth />}</>;
}

export default Callback;
