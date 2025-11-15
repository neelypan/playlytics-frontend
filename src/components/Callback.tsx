import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) return;

    fetch("http://localhost:8000/api/auth/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, state })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Tokens:", data);
      })
      .catch(() => console.log("Exchange failed"));
  }, []);

  return <div>Processing login…</div>;
}

