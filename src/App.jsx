import LoginPage from "./pages/LoginPage";
import SpotifyPage from "./pages/SpotifyPage";
import "./index.css";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

function App() {
  return (
    <main className="container text-center mx-auto">
      {code ? <SpotifyPage code={code} /> : <LoginPage />}
    </main>
  );
}

export default App;
