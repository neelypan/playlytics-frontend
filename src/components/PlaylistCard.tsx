import "./PlaylistCard.css";

type Props = {
  name: string;
  songs: number;
  minutes: number;
  image: string; // now required
};

function PlaylistCard({ name, songs, minutes, image }: Props) {
  return (
    <div className="playlist-card">
      <img src={image} className="playlist-card-cover" />

      <p className="playlist-card-name">{name}</p>
      <p className="playlist-card-info">
        {songs} songs | {minutes} min
      </p>
    </div>
  );
}

export default PlaylistCard;
