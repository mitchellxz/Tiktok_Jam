const REDIRECT_URI = "https://mitchellxz.github.io/Tiktok_Jam/callback/";
const SCOPE = "user.info.basic";
const CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY;

const csrfState = Math.random().toString(36).substring(2);

// Function to generate a code verifier
function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

// Function to generate a code challenge
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Modified login function
async function loginWithTiktok() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  window.location.assign(
    "https://www.tiktok.com/v2/auth/authorize/?client_key=" +
      CLIENT_KEY +
      "&response_type=code&scope=" +
      SCOPE +
      "&redirect_uri=" +
      encodeURIComponent(REDIRECT_URI) +
      "&state=" +
      csrfState +
      "&code_challenge=" +
      codeChallenge +
      "&code_challenge_method=S256"
  );
}

function Login() {
  return (
    <>
      <button onClick={loginWithTiktok}>Login with TikTok here!</button>
    </>
  );
  //return <Form route="/api/token/" method="login" />;
}

export default Login;
