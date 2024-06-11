import { useState, useEffect } from "react";

function TiktokAuth() {
  const [token, setToken] = useState(null);
  const CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
  const CLIENT_SECRET = import.meta.env.VITE_TIKTOK_CLIENT_SECRET;

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "client_key=" +
        CLIENT_KEY +
        "&client_secret=" +
        CLIENT_SECRET +
        "&grant_type=client_credentials",
    };
    fetch("https://open.tiktokapis.com/v2/oauth/token/", authParameters)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));
  }, []);
  return (
    <>
      <h1>{token ? "Authorized" : "Authorizing"}</h1>
    </>
  );
}

export default TiktokAuth;
