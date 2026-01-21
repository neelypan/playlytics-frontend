import DetailsButton from "./Playlists/DetailsButton";
import "./PlaylistCard.css";

export type PlaylistCardProps = {
  name: string;
  author: string;
  songs: number;
  minutes: number;
  image: string;
  spotifyUrl: string;
  id: string;
};

function PlaylistCard({
  name,
  author,
  songs,
  minutes,
  image,
  id,
  spotifyUrl,
}: PlaylistCardProps) {
  console.log("playlist card image", image);
  return (
    <div className='playlist-card'>
      <img src={image} className='playlist-card-cover' />

      <p className='playlist-card-name'>{name}</p>
      <p className='playlist-card-author'>{author}</p>

      <p className='playlist-card-info'>{songs} songs</p>

      <div className='playlist-card-button'>
        <DetailsButton
          id={id}
          name={name}
          songs={songs}
          author={author}
          image={image}
          minutes={minutes}
          spotifyUrl={spotifyUrl}
        />
      </div>
    </div>
  );
}

export default PlaylistCard;
