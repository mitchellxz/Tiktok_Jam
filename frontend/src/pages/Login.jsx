import SpotifyAuth from "../components/SpotifyAuth";
import TikTokAuth from "../components/TikTokAuth";
import Heading from "../components/Heading";
function Login() {
  return (
    <div>
      <Heading />
      <TikTokAuth />
      <SpotifyAuth />

      <div className="tiktok-links">
        <a
          href="https://developers.tiktok.com/doc/login-kit-web"
          target="_blank"
          rel="noreferrer"
        >
          TikTok Login Kit Documentation
        </a>
        <a
          href="https://developers.tiktok.com/doc/login-kit-web"
          target="_blank"
          rel="noreferrer"
        >
          TikTok Developer Documentation
        </a>
      </div>
    </div>
  );
}

export default Login;
