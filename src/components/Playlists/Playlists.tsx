import React, { useEffect, useState } from "react";
import PlaylistCard from "../PlaylistCard";
import Randomize from "../Randomize";

import { refresh } from "../../helpers";
import { useSpotifyTokens } from "../../hooks/useSpotifyTokens";

import type {
  PlaylistItem,
  PlaylistsData,
  PlaylistsProps,
} from "./playlistTypes";

const Playlists: React.FC<PlaylistsProps> = ({ onGoHome }) => {
  const [playlists, setPlaylists] = useState<PlaylistsData[]>([]);
  const [randomPlaylist, setRandomPlaylist] = useState<PlaylistsData | null>(
    null
  );

  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setExpireSecs,
  } = useSpotifyTokens();

  // get user playlists
  useEffect(() => {
    if (!accessToken) return;
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

          if (res.status === 401) {
            // if expired refresh
            const refreshRes = await refresh(refreshToken);
            console.log("refreshRes:", refreshRes);

            setAccessToken(refreshRes.access_token);
            setRefreshToken(refreshRes.refresh_token);
            setExpireSecs(refreshRes.expires_in);
          }

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
          id: playlist.id,
        }));

        setPlaylists(mapped);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    })();
  }, [
    accessToken,
    refreshToken,
    setAccessToken,
    setExpireSecs,
    setRefreshToken,
  ]);

  // show random playlist
  useEffect(() => {
    if (randomPlaylist) console.log(`Random Playlist:\n${randomPlaylist.name}`);
    else console.log("You have no playlists");
  }, [randomPlaylist]);

  // test logs
  useEffect(() => {
    console.log("playlist amount:", Object.keys(playlists).length);
    playlists.forEach((p) => console.log("owners: ", p.author));
    console.log("playlists:", playlists);
  }, [playlists]);

  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        width: "100vw",
        minHeight: "100vh",
      }}
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
          justifyContent: "center",
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
            spotifyUrl={playlist.external_urls ?? ""}
            id={playlist.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
