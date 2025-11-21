import { useNavigate } from "react-router-dom";

const ReturnToPlaylist = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/callback")}
      style={{ cursor: "pointer", color: "white" }}
    >
      ReturnToPlaylist
    </div>
  );
};

export default ReturnToPlaylist;
