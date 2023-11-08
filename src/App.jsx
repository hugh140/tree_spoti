import LoginPage from "./pages/LoginPage";
import SpotifyPage from "./pages/SpotifyPage";
import { PAGE_URL } from "./scripts/constants";
import "./index.css";

const params = new URLSearchParams(window.location.search);

let code;
if (params.get("code")) {
  code = params.get("code");
  localStorage.setItem("code", code);
} else code = localStorage.getItem("code");

const nextURL = PAGE_URL;
window.history.pushState(null, null, nextURL);

function App() {
  return (
    <main className="container text-center mx-auto">
      {code ? <SpotifyPage code={code} /> : <LoginPage />}
    </main>
  );
}

export default App;
