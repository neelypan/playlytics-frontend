import React from "react";
import { useNavigate } from "react-router-dom";
import type { PlaylistsData } from "./Playlists/playlistTypes";
import "./Randomize.css";

interface RandomizeProps {
  playlists: PlaylistsData[];
  setRandomPlaylist: React.Dispatch<React.SetStateAction<PlaylistsData | null>>;
}

const Randomize: React.FC<RandomizeProps> = ({
  playlists,
  setRandomPlaylist,
}) => {
  const navigate = useNavigate();

  const getRandomPlaylist = () => {
    if (Object.keys(playlists).length === 0) {
      return null;
    }

    const randPlaylist =
      playlists[Math.floor(Math.random() * Object.keys(playlists).length)];

    return randPlaylist;
  };

  const handleRandom = () => {
    const rand = getRandomPlaylist();
    if (!rand) return;

    setRandomPlaylist(rand);

    navigate("/playlist-details", {
      state: {
        id: rand.id,
        name: rand.name,
        author: rand.author,
        songs: rand.songAmnt,
        minutes: rand.length,
        image: rand.image,
        spotifyUrl: rand.external_urls,
      },
    });
  };

  return (
    <button className='randomize-button' onClick={handleRandom}>
      <span className='randomize-text'>RANDOMIZE PLAYLIST</span>
    </button>
  );
};

export default Randomize;
