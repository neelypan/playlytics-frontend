const api = import.meta.env.VITE_BACKEND_URL;
const apiKey = import.meta.env.VITE_FRONTEND_API_KEY;

export interface Refresh {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

export const refresh = async (refreshToken: string): Promise<Refresh> => {
  const res = await fetch(`${api}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Frontend-Api-Key": apiKey,
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    console.error("Refresh failed");
  }

  const data = await res.json();

  console.log("data:", data);

  return data;
};
