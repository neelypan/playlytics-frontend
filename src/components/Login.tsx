import logo from "../assets/spotifylogo.png";

const Login = () => {
  const apiKey = import.meta.env.VITE_FRONTEND_API_KEY;
  const api = import.meta.env.VITE_BACKEND_URL;

  console.log("API KEY:", apiKey);
  console.log("API URL:", api);

  const getAuthUrl = async () => {
    const res = await fetch(`${api}/api/auth/url`, {
      method: "GET",
      headers: {
        "X-Frontend-Api-Key": apiKey,
      },
    });

    const data = await res.json();
    const { url } = data;

    window.location.href = url;

    return;
  };

  return (
    <button
      onClick={getAuthUrl}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#353535",
        border: "4px solid #1ed760",
        borderRadius: "80px",
        padding: "5px 5px",
        width: "450px",
        height: "95px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        cursor: "pointer",
        marginTop: "150px",
      }}
    >
      <img src={logo} alt="spotify" style={{ width: "55px", height: "55px" }} />
      <span
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: "34px",
          fontFamily: "League Spartan",
        }}
      >
        LOGIN WITH SPOTIFY
      </span>
    </button>
  );
};

export default Login;
