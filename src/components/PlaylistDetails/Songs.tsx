import React from "react";
import "./Songs.css";

interface SongsProps {
  image: string;
  name: string;
  minutes: string;
  artist: string;
  url: string;
}


export default function Songs({ image, name, artist, minutes, url }: SongsProps) {
  return (
    <button
      className="track-bubble"
      onClick={() => window.open(url, "_blank")}
    >
      <img src={image} alt={name} className="track-image" />

      <div className="track-text">
        <span className="track-name">{name}</span>
        <span className="track-artist">{artist}</span>
        <span className="track-min">{minutes}</span>
      </div>
    </button>
  );
}