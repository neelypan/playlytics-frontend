import "./loading.css";
import TypingTitle from "../TypingTitle";

function Loading() {
  return (
    <div>
      <TypingTitle text="GENERATING PLAYLISTS..." speed={120} pause={1000} />
    </div>
  );
}

export default Loading;
