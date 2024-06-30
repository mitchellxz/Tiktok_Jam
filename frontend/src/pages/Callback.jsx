import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

function Callback() {
  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState(false);
  const attempt = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    const stateParam = urlParams.get("state");

    if (stateParam !== localStorage.getItem("tiktok_auth_state")) {
      console.error("State does not match");
      return;
    }

    if (codeParam && !attempt.current) {
      setCode(codeParam);
      sendCodeToBackend(codeParam);
      attempt.current = true;
    }
  }, []);

  const sendCodeToBackend = (code) => {
    console.log("sending code to backend:", code);
    api
      .post("http://127.0.0.1:8000/api/tiktok/callback/", { code })
      .then((response) => {
        const { token_data } = response.data;
        console.log("Backend response:", response.data); // Debugging
        if (token_data) {
          localStorage.setItem("access_token", token_data.access_token);
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log("Error sending to backend:", error);
      });
  };

  if (redirect) {
    return <Navigate to="/Success" />;
  }

  return (
    <>
      <h1>
        <p>{code}</p>
      </h1>
    </>
  );
}

export default Callback;
