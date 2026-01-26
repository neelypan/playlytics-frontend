import { useState, useEffect } from "react";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  scope: string;
  expireSecs: number | string;
}

const loadSavedTokens = (): Tokens | null => {
  try {
    const saved = localStorage.getItem("spotifyTokens");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

/**
 * Manages Spotify tokens in local storage.
 *
 * @returns {object} An object containing the Spotify tokens and their setters.
 */
export const useSpotifyTokens = () => {
  const saved = loadSavedTokens(); // load tokens from local storage if its null that means localstorage is empty

  const [accessToken, setAccessToken] = useState(
    () => saved?.accessToken ?? "",
  );
  const [refreshToken, setRefreshToken] = useState(
    () => saved?.refreshToken ?? "",
  );
  const [scope, setScope] = useState(() => saved?.scope ?? "");
  const [expireSecs, setExpireSecs] = useState(() => saved?.expireSecs ?? "");

  useEffect(() => {
    if (!accessToken) return;

    const tokens: Tokens = {
      accessToken,
      refreshToken,
      scope,
      expireSecs,
    };
    localStorage.setItem("spotifyTokens", JSON.stringify(tokens));
  }, [accessToken, refreshToken, scope, expireSecs]);

  return {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    scope,
    setScope,
    expireSecs,
    setExpireSecs,
  };
};
