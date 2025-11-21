import { useState, useEffect } from "react";

interface Props {
  text: string;
  speed?: number;
  pause?: number;
}

export default function TypingTitle({
  text,
  speed = 120,
  pause = 1000,
}: Props) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let interval: number;

    if (!deleting) {
      // typing
      interval = window.setInterval(() => {
        setDisplay((prev) => text.slice(0, prev.length + 1));
      }, speed);

      if (display === text) {
        clearInterval(interval);
        setTimeout(() => setDeleting(true), pause);
      }
    } else {
      // deleting
      interval = window.setInterval(() => {
        setDisplay((prev) => prev.slice(0, prev.length - 1));
      }, speed);

      if (display === "") {
        clearInterval(interval);
        setDeleting(false);
        setIndex((prev) => prev + 1);
      }
    }

    return () => clearInterval(interval);
  }, [display, deleting, text, speed, pause]);

  return (
    <h1
      style={{
        color: "white",
        fontFamily: "League Spartan",
        fontWeight: 800,
        fontSize: "150px",
        textAlign: "center",
        textShadow: "5px 5px 0px #1ed760",
      }}
    >
      {display}
    </h1>
  );
}
