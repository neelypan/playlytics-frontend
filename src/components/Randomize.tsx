import React from "react";
import type { PlaylistsData } from "./Playlists/playlistTypes";

interface RandomizeProps {
  playlists: PlaylistsData[];
  setRandomPlaylist: React.Dispatch<React.SetStateAction<PlaylistsData | null>>;
}

const Randomize: React.FC<RandomizeProps> = ({
  playlists,
  setRandomPlaylist,
}) => {
  const getRandomPlaylist = () => {
    if (Object.keys(playlists).length === 0) {
      return null;
    }

    const randPlaylist =
      playlists[Math.floor(Math.random() * Object.keys(playlists).length)];
    console.log("Random Playlist:", randPlaylist);

    return randPlaylist;
  };

  return (
    <button
      onClick={() => {
        setRandomPlaylist(getRandomPlaylist());
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
  );
};

export default Randomize;
