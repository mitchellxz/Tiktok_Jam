import { useState, useEffect } from "react";

function TiktokAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const requestData = {
      grant_type: "client_credentials",
    };

    fetch("http://localhost:8000/api/get-tiktok-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
        } else {
          console.error("Failed to get token:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <h1>{token ? "Authorized" : "Authorizing"}</h1>
      <h1> {token}</h1>
    </>
  );
}

export default TiktokAuth;
