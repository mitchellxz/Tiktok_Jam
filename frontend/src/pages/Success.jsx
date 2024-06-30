import { useEffect, useState } from "react";

function Success() {
  const [videoIDs, setVideoIDs] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const url = `https://open.tiktokapis.com/v2/video/list/?fields=id`;

  useEffect(() => {
    getVideoIDs();
  }, []);

  const getVideoIDs = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const ids = data.data.videos.map((video) => video.id);
      setVideoIDs(ids);
      console.log(ids);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  return (
    <>
      <h1>Success! {access_token}</h1>
      <h2>Welcome, Video IDs:</h2>
      <ul>
        {videoIDs.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </>
  );
}

export default Success;
