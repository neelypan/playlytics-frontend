import React, { useEffect, useRef, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import Randomize from "./Randomize";

import type { Tokens } from "./Callback";

interface PlaylistsProps {
  expireSecs: number;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  scope: string;
  onGoHome?: () => void;
}

export interface PlaylistsData {
  name: string;
  songAmnt: number;
  length: number;
  image: string;
  author: string;
  external_urls?: string;
}

interface PlaylistItem {
  name: string;
  tracks: {
    total: number;
  };
  images: Array<{
    url: string;
  }>;
  owner: {
    display_name: string;
  };
  external_urls: { spotify: string };
}

const Playlists: React.FC<PlaylistsProps> = ({
  expireSecs,
  accessToken,
  refreshToken,
  scope,
  onGoHome,
  setAccessToken,
}) => {
  const [playlists, setPlaylists] = useState<PlaylistsData[]>([]);
  const [randomPlaylist, setRandomPlaylist] = useState<PlaylistsData | null>(
    null
  );

  // fix accessToken
  useEffect(() => {
    if (accessToken) return;

    const saved = localStorage.getItem("spotifyTokens");
    if (!saved) return;

    const tokens: Tokens = JSON.parse(saved);
    if (tokens?.accessToken) setAccessToken(tokens.accessToken); // if the access token is defined update accessToken state to equal the localstorage value
  }, [accessToken, setAccessToken]);

  // get user playlists
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          console.error(
            "Failed to fetch playlists",
            res.status,
            await res.text()
          );
          return;
        }

        const data = await res.json();
        const items = data.items as PlaylistItem[] | undefined;

        console.log("items", items);
        console.log(items?.length);

        const mapped: PlaylistsData[] = (items ?? []).map((playlist) => ({
          name: playlist.name,
          songAmnt: playlist.tracks.total,
          length: 120, // placeholder
          image: playlist.images[0]?.url || "",
          author: playlist.owner["display_name"] || "Unknown",
          external_urls: playlist.external_urls.spotify,
        }));

        setPlaylists(mapped);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    })();
  }, [accessToken]);

  // show random playlist
  useEffect(() => {
    randomPlaylist
      ? console.log(`Random Playlist:\n${randomPlaylist.name}`)
      : console.log("You have no playlists");
  }, [randomPlaylist]);

  // test logs
  useEffect(() => {
    console.log("playlist amount:", Object.keys(playlists).length);
    playlists.forEach((p) => console.log("owners: ", p.author));
    console.log("playlists:", playlists);
  }, [playlists]);

  return (
    <div
      style={{ backgroundColor: "#1f1f1f", width: "100vw", height: "100vh" }}
    >
      <h1
        style={{
          position: "absolute",
          top: "-20px",
          left: "3.5%",
          color: "white",
          fontFamily: "League Spartan",
          fontWeight: "800",
          fontSize: "80px",
          textShadow: "5px 5px 0px #1ed760",
          cursor: "pointer",
        }}
        onClick={() => {
          onGoHome?.();
        }}
      >
        PLAYLISTS
      </h1>

      <Randomize playlists={playlists} setRandomPlaylist={setRandomPlaylist} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          paddingTop: "10%",
          paddingLeft: "2%",
        }}
      >
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.name}
            name={playlist.name}
            songs={playlist.songAmnt}
            minutes={playlist.length}
            image={playlist.image}
            author={playlist.author}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
