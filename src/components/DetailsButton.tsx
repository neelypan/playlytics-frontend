import { useNavigate } from "react-router-dom";

type Props = {
  playlistData: {
    name: string;
    author: string;
    songs: number;
    minutes: number;
    image: string;
    spotifyUrl: string;
  };
};

function DetailsButton({ playlistData }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/playlist-details", { state: playlistData });
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
        PLAYLIST DETAILS
      </button>
    </div>
  );
}

export default DetailsButton;
