import GoToSpotifyButton from "./GoToSpotifyButton";
import "./PlaylistCard.css";

type Props = {
  name: string;
  author: string;
  songs: number;
  minutes: number;
  image: string;
  spotifyUrl: string;
};

function PlaylistCard({
  name,
  author,
  songs,
  minutes,
  image,
  spotifyUrl,
}: Props) {
  return (
    <div className="playlist-card">
      <img src={image} className="playlist-card-cover" />

      <p className="playlist-card-name">{name}</p>
      <p className="playlist-card-author">{author}</p>

      <p className="playlist-card-info">
        {songs} songs | {minutes} min
      </p>
      <GoToSpotifyButton url={spotifyUrl} />
    </div>
  );
}

export default PlaylistCard;
