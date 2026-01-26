import { useLocation, Navigate, Link } from "react-router-dom";
import GoToSpotifyButton from "./GoToSpotifyButton";
import "./PlaylistDetailsPage.css";
import Songs from "./Songs";
import { useSpotifyTokens } from "../../hooks/useSpotifyTokens";
import { useEffect, useState } from "react";
import { refresh } from "../../helpers";
import type { PlaylistCardProps } from "../PlaylistCard";

type SpotifyPlaylistResponse = {
  next: string | null;
  items: {
    is_local: boolean;
    track: {
      name: string;
      duration_ms: number;
      external_urls: { spotify: string };
      album: {
        name: string;
        external_urls: { spotify: string };
        images: { url: string }[];
      };
      artists: { name: string; external_urls: { spotify: string } }[];
    } | null;
  }[];
};

interface SongInfo {
  trackName: string;
  trackUrl: string;

  albumName: string;
  albumUrl: string;
  albumImageUrl: string;

  durationMs: number;

  artists: {
    name: string;
    url: string;
  }[];
  is_local?: boolean;
}

const PlaylistDetailsPage: React.FC = () => {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setExpireSecs,
  } = useSpotifyTokens();

  const [songList, setSongList] = useState<SongInfo[] | null>(null);
  const [playlistLength, setPlaylistLength] = useState<number>(0);

  const location = useLocation();
  const state = location.state as PlaylistCardProps | undefined;

  useEffect(() => {
    if (!state || !accessToken) return;
    console.log("playlist id", state.id);

    const fetchTracks = async () => {
      try {
        const makeRequest = async (url: string, token: string) => {
          return fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        };

        let currentToken = accessToken;
        let allSongs: SongInfo[] = [];
        let nextUrl: string | null =
          `https://api.spotify.com/v1/playlists/${state.id}/tracks`;

        // Fetch all pages of tracks
        while (nextUrl) {
          let res = await makeRequest(nextUrl, currentToken);

          // handle expired token
          if (res.status === 401) {
            const refreshRes = await refresh(refreshToken);
            console.log("refreshRes:", refreshRes);

            setAccessToken(refreshRes.access_token);
            setRefreshToken(refreshRes.refresh_token);
            setExpireSecs(refreshRes.expires_in);

            currentToken = refreshRes.access_token;
            // retry with new token
            res = await makeRequest(nextUrl, currentToken);
          }

          if (!res.ok) {
            console.error("get playlist failed:", res.status, res.statusText);
            console.error(await res.text());
            return;
          }

          const data: SpotifyPlaylistResponse = await res.json();

          const songInfo: SongInfo[] = data.items.map((song) => {
            const track = song.track;
            if (!track) {
              return {
                trackName: song.is_local ? "Local Track" : "Unknown Track",
                trackUrl: "",
                albumName: "",
                albumUrl: "",
                albumImageUrl: "",
                durationMs: 0,
                artists: [],
                is_local: song.is_local,
              };
            } else {
              return {
                trackName: track.name,
                trackUrl: track.external_urls.spotify,
                albumName: track.album.name,
                albumUrl: track.album.external_urls.spotify,
                albumImageUrl: track.album.images[0]?.url ?? "",
                durationMs: track.duration_ms,
                artists: track.artists.map((a) => ({
                  name: a.name,
                  url: a.external_urls.spotify,
                })),
              };
            }
          });

          allSongs = [...allSongs, ...songInfo];
          nextUrl = data.next;
        }

        setSongList(allSongs);
        // Calculate total playlist length in minutes
        const totalDurationMs = allSongs.reduce(
          (sum, song) => sum + song.durationMs,
          0,
        );
        const lengthInMinutes = Math.round(totalDurationMs / 60000);
        setPlaylistLength(lengthInMinutes);
        console.log("songInfo", allSongs);
      } catch (err) {
        console.error("Error fetching playlist tracks", err);
      }
    };

    fetchTracks();
  }, [
    accessToken,
    refreshToken,
    setAccessToken,
    setExpireSecs,
    setRefreshToken,
    state,
  ]);

  if (!state) {
    return <Navigate to='/callback' replace />;
  }
  const { name, author, songs, image, spotifyUrl } = state;
  console.log(image);
  console.log("playlist image", image);
  return (
    <div className='details-page'>
      <div className='right-bubble'>
        <div className='songs-scroll'>
          {songList?.map((track, i) => (
            <Songs
              key={i}
              image={track.albumImageUrl}
              name={track.trackName}
              artist={track.artists.map((a) => a.name).join(", ")}
              minutes={`${Math.round(track.durationMs / 60000)} min`}
              url={track.trackUrl}
            />
          ))}
        </div>
      </div>

      <Link
        to={"/callback"}
        className='back-button'
        style={{ textDecoration: "none" }}
      >
        ← BACK TO PLAYLISTS
      </Link>

      <div className='details-card'>
        <img src={image} alt={name} className='details-cover' />

        <p className='details-name'>{name}</p>
        <p className='details-author'>{author}</p>

        <p className='details-info'>
          {songs} songs | {playlistLength} min
        </p>

        <GoToSpotifyButton url={spotifyUrl} />
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
