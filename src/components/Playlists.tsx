// TODO: detect reloads and get new codes for everything so it doesnt break after expireSecs

import React, { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";

interface PlaylistsProps {
  expireSecs: number;
  accessToken: string;
  refreshToken: string;
  scope: string;
}

interface PlaylistsData {
  name: string;
  songAmnt: number;
  length: number;
  image: string;
  author: string;
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
}

const Playlists: React.FC<PlaylistsProps> = ({
  expireSecs,
  accessToken,
  refreshToken,
  scope,
}) => {
  const [playlists, setPlaylists] = useState<PlaylistsData[]>([]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ items }) => {
        console.log("items", items);
        console.log(items.length);
        const mapped: PlaylistsData[] = ((items as PlaylistItem[]) ?? []).map(
          (i) => ({
            name: i.name,
            songAmnt: i.tracks.total,
            length: 120, // placeholder
            image: i.images[0]?.url || "",
            author: i.owner["display_name"] || "Unknown",
          })
        );

        setPlaylists(mapped);
      });
  }, []);

  useEffect(() => {
    console.log(Object.keys(playlists).length);
    playlists.forEach((p) => console.log(p.author));
    console.log(playlists);
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
          window.location.href = "/";
        }}
      >
        PLAYLISTS
      </h1>

      <button
        onClick={() => {
          alert(import.meta.env.VITE_FUN_LITTLE_MESSAGE);
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#353535",
          border: "4px solid #1ed760",
          borderRadius: "80px",
          padding: "5px 20px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: "800",
            fontSize: "26px",
            fontFamily: "League Spartan",
          }}
        >
          RANDOMIZE PLAYLIST
        </span>
      </button>
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
