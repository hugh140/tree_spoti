import { useState } from "react";
import useArtists from "../hooks/useArtists";
import artists from "../jsontest/artists";

const items = artists.items;
const topThreeArtists = [...items].slice(0, 3);
const otherArtists = [...items].slice(3, items.length);

function SpotifyPage({ code }) {
  // const artists = useArtists(code);
  console.log(artists);

  const [artistCover, setArtistCover] = useState(items[0].images[1].url);

  function changeOtherArtistsCover(index) {
    setArtistCover(otherArtists[index].images[1].url);
  }

  function changeTopArtistsCover(index) {
    setArtistCover(topThreeArtists[index].images[1].url);
  }

  return (
    <>
      <main className="mt-5 w-9/12 mx-auto">
        <div className="grid place-content-center m-5">
          <img
            className="border-2 border-black p-1 object-cover w-60 h-60"
            src={artistCover}
            alt={topThreeArtists[1].name}
          />
        </div>

        <button
          className="text-5xl hover:bg-neutral-200 active:bg-black active:text-white"
          onClick={() => changeTopArtistsCover(0)}
        >
          {topThreeArtists[0].name}
        </button>
        <br />
        <button
          className="text-3xl hover:bg-neutral-200 active:bg-black active:text-white"
          onClick={() => changeTopArtistsCover(1)}
        >
          {topThreeArtists[1].name}
        </button>
        <br />
        <button
          className="text-2xl hover:bg-neutral-200 active:bg-black active:text-white"
          onClick={() => changeTopArtistsCover(2)}
        >
          {topThreeArtists[2].name}
        </button>
        <br />

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {otherArtists.map((artist, index) => (
            <button
              key={artist}
              className="border-2 p-2 hover:border-neutral-800 
              active:text-white active:bg-neutral-800"
              onClick={() => changeOtherArtistsCover(index)}
            >
              {artist.name}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
export default SpotifyPage;
