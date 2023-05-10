import { useEffect } from "react";
import { PAGE_URL } from "../scripts/constants";

function SpotifyPage({ code }) {
  useEffect(() => {
    console.log(code)
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", PAGE_URL);

    const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic MTc1MDMyMTY2Yzc4NDg3ODg0OTUyMTMzY2Y1MGQzZDc6ZjBhMDAwMmU5ZjU3NDQzODhlZGI4MzRhMTcwOTA4ZGI="
    );
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    fetch(`https://accounts.spotify.com/api/token?${params.toString()}`, {
      method: "POST",
      headers: headers,
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, [code]);

  return <h1>Hola</h1>;
}
export default SpotifyPage;
