import SpotifyAuth from "../components/SpotifyAuth";
import TikTokAuth from "../components/TikTokAuth";

function Login() {
  return (
    <div>
      <TikTokAuth />
      <SpotifyAuth />
    </div>
  );
}

export default Login;
