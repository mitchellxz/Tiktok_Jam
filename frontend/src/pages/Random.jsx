import { useEffect, useState } from "react";
import api from "../api";
import SearchSong from "../components/SearchSong";

function Random() {
  const [user, setUser] = useState(null);
  const accessToken = localStorage.getItem("spotify_access_token");

  // get https://api.spotify.com/v1/me
  // Authorization: Bearer access_token

  useEffect(() => {
    if (accessToken) {
      api
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, [accessToken]);

  return (
    <>
      <h1>Welcome!</h1>
      {user ? (
        <div>
          <p>{user.display_name}</p>
          <SearchSong />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
}

export default Random;
