import { useLocation, useNavigate } from "react-router-dom";
import GoToSpotifyButton from "./GoToSpotifyButton";
import "./PlaylistDetailsPage.css";
import Songs from "./Songs";


function PlaylistDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const playlistData =
    (location.state as {
      name: string;
      author: string;
      songs: number;
      minutes: number;
      image: string;
      spotifyUrl: string;
    }) || null;

  if (!playlistData) {
    navigate("/callback");
    return null;
  }

  const { name, author, songs, minutes, image, spotifyUrl } = playlistData;

  return (
    <div className="details-page">

      <div className="right-bubble">
  <div className="songs-scroll">
    {[...Array(songs)].map((_, i) => (
      <Songs
        key={i}
        image={image}
        name={name}
        artist={author}
        minutes={`${minutes} min`}
        url={spotifyUrl}
      />
    ))}
  </div>
</div>


      <button className="back-button" onClick={() => navigate("/callback")}>
        ← BACK TO PLAYLISTS
      </button>

      <div className="details-card">
        <img src={image} alt={name} className="details-cover" />

        <p className="details-name">{name}</p>
        <p className="details-author">{author}</p>

        <p className="details-info">
          {songs} songs | {minutes} min
        </p>

        <GoToSpotifyButton url={spotifyUrl} />
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;