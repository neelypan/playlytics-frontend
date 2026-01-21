import { useNavigate } from "react-router-dom";

type PlaylistData = {
  name: string;
  author: string;
  songs: number;
  minutes: number;
  image: string;
  spotifyUrl: string;
  id: string;
};

function DetailsButton({
  id,
  name,
  author,
  songs,
  minutes,
  spotifyUrl,
  image,
}: PlaylistData) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/playlist-details", {
      state: { id, name, author, songs, minutes, spotifyUrl, image },
    });
  };

  return (
    <div style={{ paddingTop: "5%" }}>
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          background: "rgb(53,53,53)",
          borderColor: "#1ed760",
          borderRadius: "40px",
          borderStyle: "solid",
          padding: "12px 30px",
          color: "#ffffff",
          fontFamily: "League Spartan, sans-serif",
          fontSize: "20px",
          fontWeight: "600",
          textDecoration: "none",
          cursor: "pointer",
          border: "4px solid #1ed760",
        }}
      >
        <span>PLAYLIST DETAILS</span>
      </button>
    </div>
  );
}

export default DetailsButton;
