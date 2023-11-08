import { clientId, PAGE_URL } from "../scripts/constants";

function LoginPage() {
  async function redirectLoginPage() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const uriParams = new URLSearchParams();
    uriParams.append("client_id", clientId);
    uriParams.append("redirect_uri", PAGE_URL);
    uriParams.append("response_type", "code");
    uriParams.append("scope", "user-top-read");
    uriParams.append("code_challenge_method", "S256");
    uriParams.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${uriParams.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  return (
    <article className="grid place-content-center h-screen container text-center mx-auto">
      <h1 className="text-8xl pb-5">50fy</h1>

      <div>
        Created by:{" "}
        <a
          href="https://github.com/hugh140"
          className="text-lime-700 hover:underline"
        >
          Hugo Reyes
        </a>
      </div>

      <div className="grid place-content-center my-7">
        <button
          className="bg-green-400 rounded-xl text-white font-bold hover:text-black 
          hover:bg-white border-green-400 border-2 p-3 active:bg-green-400"
          onClick={redirectLoginPage}
        >
          Login with your Spotify account
        </button>
      </div>

      <div>This page won&apos;t use or save your information. &lt;3</div>
      <span className="font-bold">
        Made using{" "}
        <a
          className="text-center text-lime-500 hover:underline cursor-pointer"
          href="https://developer.spotify.com/documentation/web-api"
        >
          Spotify Web API <i className="fa-brands fa-spotify"></i>
        </a>
      </span>
    </article>
  );
}
export default LoginPage;
