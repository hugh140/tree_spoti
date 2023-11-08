import LoginPage from "./pages/LoginPage";
import SpotifyPage from "./pages/SpotifyPage";
import { PAGE_URL } from "./scripts/constants";
import "./index.css";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

const nextURL = PAGE_URL;
// window.history.pushState(null, null, nextURL);

function App() {
  return (
    <main className="container text-center mx-auto">
      {code ? <SpotifyPage code={code} /> : <LoginPage />}
    </main>
  );
}

export default App;
