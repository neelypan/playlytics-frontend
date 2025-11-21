import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Playlists from "./Playlists/Playlists";
import Loading from "./Loading/Loading";

import { useSpotifyTokens } from "../hooks/useSpotifyTokens";

export default function Callback() {
  const apiKey = import.meta.env.VITE_FRONTEND_API_KEY;
  const api = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    scope,
    setScope,
    expireSecs,
    setExpireSecs,
  } = useSpotifyTokens();

  const code = params.get("code");
  const state = params.get("state");

  const exchanged = useRef(false);

  useEffect(() => {
    if (accessToken) {
      return;
    }

    if (!code || !state) return;

    if (exchanged.current) return;
    exchanged.current = true;

    // exchange code for auth token and refresh token and time till expiration and scope
    (async () => {
      try {
        const res = await fetch(`${api}/api/auth/exchange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Api-Key": apiKey,
          },
          body: JSON.stringify({ code, state }),
        });

        if (!res.ok) {
          console.error("Exchange failed");
          return;
        }
        const data = await res.json();
        console.log("Tokens:", data);

        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setScope(data.scope);
        setExpireSecs(data.expires_in);
      } catch {
        console.log("Exchange failed");
      }
    })();
  }, [
    api,
    apiKey,
    code,
    state,
    accessToken,
    setAccessToken,
    setRefreshToken,
    setScope,
    setExpireSecs,
  ]);

  return (
    <div>
      {!accessToken ? (
        <Loading />
      ) : (
        <Playlists onGoHome={() => navigate("/")} />
      )}
    </div>
  );
}
