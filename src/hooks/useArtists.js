import { useEffect, useState } from "react";
import { PAGE_URL } from "../scripts/constants";
import { clientId } from "../scripts/constants";

function useArtists(code) {
  const [token, setToken] = useState();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('client_id', clientId)
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
      .then((response) => response.json())
      .then((result) => setToken(result.access_token))
      .catch((error) => console.log("error", error));
  }, [code]);

  useEffect(() => {
    console.log(token)
    if (token) {
      fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch(error => console.log(error))
    }
  }, [token]);

  return token;
}
export default useArtists;
