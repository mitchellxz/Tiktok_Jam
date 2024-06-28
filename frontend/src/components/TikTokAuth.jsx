import { useEffect } from "react";

function TikTokAuth() {
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const sha256 = async (plainText) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return hash;
  };

  const base64UrlEncode = (arrayBuffer) => {
    let base64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
    );
    base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return base64;
  };

  const generateCodeChallenge = async (codeVerifier) => {
    const hash = await sha256(codeVerifier);
    return base64UrlEncode(hash);
  };

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_TIKTOK_SANDBOX_CLIENT_KEY;
    const REDIRECT_URI = import.meta.env.VITE_TIKTOK_SANDBOX_REDIRECT_URI;
    const STATE = generateRandomString(16);
    const CODE_VERIFIER = generateRandomString(128);
    const CODE_CHALLENGE = await generateCodeChallenge(CODE_VERIFIER);

    localStorage.setItem("tiktok_auth_state", STATE);
    localStorage.setItem("tiktok_code_verifier", CODE_VERIFIER);
    window.location.href =
      `https://www.tiktok.com/v2/auth/authorize/` +
      `?client_key=${CLIENT_ID}&response_type=code&scope=user.info.basic,video.list&redirect_uri=${REDIRECT_URI}&state=${STATE}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=S256`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with tiktok</button>
    </div>
  );
}

export default TikTokAuth;
