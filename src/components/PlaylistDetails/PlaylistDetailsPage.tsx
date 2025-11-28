import { useLocation, useNavigate } from "react-router-dom";
import GoToSpotifyButton from "./GoToSpotifyButton";

function PlaylistDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const playlistData = location.state as {
    name: string;
    author: string;
    songs: number;
    minutes: number;
    image: string;
    spotifyUrl: string;
  } | null;

  if (!playlistData) {
    navigate("/callback");
    return null;
  }

  const { name, author, songs, minutes, image, spotifyUrl } = playlistData;

  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5%",
      }}
    >
      <button
        onClick={() => navigate("/callback")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#353535",
          border: "4px solid #1ed760",
          borderRadius: "40px",
          padding: "12px 24px",
          color: "white",
          fontFamily: "League Spartan",
          fontSize: "20px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        ← BACK TO PLAYLISTS
      </button>

      <div
        style={{
          backgroundColor: "#353535",
          padding: "48px",
          borderRadius: "30px",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{ width: "100%", borderRadius: "10px" }}
        />

        <p
          style={{
            marginTop: "24px",
            marginBottom: "12px",
            color: "white",
            fontSize: "42px",
            fontFamily: "Glacial Indifference",
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: "12px 0",
            color: "white",
            fontSize: "20px",
            opacity: 0.8,
            fontFamily: "Glacial Indifference",
          }}
        >
          {author}
        </p>

        <p
          style={{
            margin: "12px 0",
            color: "white",
            fontSize: "26px",
            fontFamily: "Glacial Indifference",
          }}
        >
          {songs} songs | {minutes} min
        </p>
        <GoToSpotifyButton url={spotifyUrl} />
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;