import "./index.css";

const params = new URLSearchParams(window.location.search);

const nextURL = 'http://localhost:4000';
window.history.pushState(null, null, nextURL);

function App() {

  function redirectLoginPage() {
    const clientId = '175032166c78487884952133cf50d3d7'
    const redirectUri = 'http://localhost:4000'

    const urlParams = new URLSearchParams()
    urlParams.append('client_id', clientId)
    urlParams.append('redirect_uri', redirectUri)
    urlParams.append('response_type', 'code')

    document.location = `https://accounts.spotify.com/authorize?${urlParams.toString()}`
  }

  return (
    <main className="container mx-auto">
      <article className="grid place-content-center h-screen">
        <h1 className="text-4xl text-center pt-5">
          {params.get("code")} Juan
        </h1>
        <div className="grid place-content-center my-5">
          <button
            className="bg-green-400 rounded-xl text-white font-bold hover:text-black 
          hover:bg-white border-green-400 border-2 p-3 active:bg-green-400"
          onClick={redirectLoginPage}
          >
            Login with your Spotify account
          </button>
        </div>
      </article>
    </main>
  );
}

export default App;
