import { PAGE_URL } from "../scripts/constants";
import { clientId } from "../scripts/constants";

function LoginPage() {
  function redirectLoginPage() {
    const redirectUri = PAGE_URL;

    const uriParams = new URLSearchParams();
    uriParams.append("client_id", clientId);
    uriParams.append("redirect_uri", redirectUri);
    uriParams.append("response_type", "code");

    document.location = `https://accounts.spotify.com/authorize?${uriParams.toString()}`;
  }

  return (
    <article className="grid place-content-center h-screen">
      <h1 className="text-4xl pt-5">Spotify blabla</h1>

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
    </article>
  );
}
export default LoginPage;
