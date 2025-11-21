import PlaylistCard from "../PlaylistCard";
import GoToSpotifyButton from "../GoToSpotifyButton";
import ReturnToPlaylist from "./ReturnToPlaylist";

type Props = {
  name: string;
  songs: number;
  minutes: number;
  image: string;
  author: string;
  spotifyUrl: string;
};

function PlaylistDetailsPage({
  name,
  songs,
  minutes,
  image,
  spotifyUrl,
  author,
}: Props) {
  return (
    <div>
      <ReturnToPlaylist />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#1b1b1b",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <PlaylistCard
            key={name}
            name={name}
            songs={songs}
            minutes={minutes}
            image={image}
            author={author}
            spotifyUrl={spotifyUrl}
          />

          <div style={{ marginTop: "20px" }}>
            <GoToSpotifyButton url={spotifyUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;
