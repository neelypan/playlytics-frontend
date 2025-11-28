import spotifyLogo from "../../assets/spotifylogo.png";

type Props = {
  url: string;
};

function GoToSpotifyButton({ url }: Props) {
  return (
    <div style={{ paddingTop: "5%" }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
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
        }}
      >
        <img
          src={spotifyLogo}
          alt="spotify"
          style={{ width: "28px", height: "28px" }}
        />
        GO TO SPOTIFY
      </a>
    </div>
  );
}

export default GoToSpotifyButton;
