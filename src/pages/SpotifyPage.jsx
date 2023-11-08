import { useEffect, useState } from "react";
import { PAGE_URL } from "../scripts/constants";
import { clientId } from "../scripts/constants";

function SpotifyPage({ code }) {
  const [artistCover, setArtistCover] = useState({});
  const [topThree, setTopThree] = useState({});
  const [otherTop, setOtherTop] = useState({});

  useEffect(() => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", clientId);
    params.append("code", code);
    params.append("redirect_uri", PAGE_URL);
    params.append("code_verifier", verifier);

    const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic MTc1MDMyMTY2Yzc4NDg3ODg0OTUyMTMzY2Y1MGQzZDc6YTNkMzM4YTc0ZGJhNGJmNWFiNjVjMGVhMmRiNGVmYjc="
    );
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    if (!localStorage.getItem("token")) {
      console.log("hola");
      fetch(`https://accounts.spotify.com/api/token?${params.toString()}`, {
        method: "POST",
        headers: headers,
      })
        .then((response) => response.json())
        .then((token) => {
          localStorage.setItem("token", token.access_token);
          getArtists(token.access_token);
        })
        .catch((error) => console.log("error", error));
    } else getArtists(localStorage.getItem("token"));

    function getArtists(token) {
      console.log("hola");
      fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          setArtistCover(result.items[0].images[1].url);
          setTopThree([...result.items].slice(0, 3));
          setOtherTop([...result.items].slice(3, result.items.length));
        })
        .catch((error) => console.log(error));
    }
  }, [code]);

  function changeotherTopCover(index) {
    setArtistCover(otherTop[index].images[1].url);
  }

  function changeTopArtistsCover(index) {
    setArtistCover(topThree[index].images[1].url);
  }

  function logOut() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <main className="mt-5 md:w-1/2 w-9/12  mx-auto">
        <div className="grid place-content-center m-5">
          <img
            className="border-2 border-black p-1 object-cover w-60 h-60"
            src={artistCover}
            alt={topThree[1]?.name}
          />
        </div>

        <button
          className="text-5xl hover:bg-neutral-200 active:bg-black active:text-white"
          onClick={() => changeTopArtistsCover(0)}
        >
          {topThree[0]?.name}
        </button>
        <br />
        <button
          className="text-3xl hover:bg-neutral-200 active:bg-black active:text-white"
          onClick={() => changeTopArtistsCover(1)}
        >
          {topThree[1]?.name}
        </button>
        <br />
        <button
          className="text-2xl hover:bg-neutral-200 active:bg-black active:text-white"
          onClick={() => changeTopArtistsCover(2)}
        >
          {topThree[2]?.name}
        </button>
        <br />

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {Array.isArray(otherTop) &&
            otherTop?.map((artist, index) => (
              <button
                key={index}
                className="border-2 p-2 md:p-5 hover:border-neutral-800 
              active:text-white active:bg-neutral-800"
                onClick={() => changeotherTopCover(index)}
              >
                {artist?.name}
              </button>
            ))}
        </div>

        <button
          className="bg-zinc-900 p-5 my-5 text-white md:w-3/4 lg:w-1/2 w-full
          font-bold border-2 border-zinc-900 hover:bg-white hover:text-black 
          active:bg-black active:text-white"
          onClick={logOut}
        >
          Log Out
        </button>
      </main>
    </>
  );
}
export default SpotifyPage;
