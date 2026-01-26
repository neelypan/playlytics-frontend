const api = import.meta.env.VITE_BACKEND_URL;
const apiKey = import.meta.env.VITE_FRONTEND_API_KEY;

export interface Refresh {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

/**
 * Refreshes the authentication token using the provided refresh token.
 *
 * Makes a POST request to the backend refresh endpoint to obtain a new access token
 * and other token-related information.
 *
 * @param {string} refreshToken - The refresh token used to obtain a new access token
 * @returns {Promise<Refresh>} A promise that resolves to a Refresh object containing:
 *   - access_token: The new access token
 *   - token_type: The type of token (e.g., "Bearer")
 *   - expires_in: Time in seconds until the token expires
 *   - scope: The scopes associated with the token
 *   - refresh_token: The refresh token (may be new or the same)
 * @async
 */
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
