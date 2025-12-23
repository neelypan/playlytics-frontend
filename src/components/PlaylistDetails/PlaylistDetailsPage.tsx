import { useLocation, Navigate, Link } from "react-router-dom";
import GoToSpotifyButton from "./GoToSpotifyButton";
import "./PlaylistDetailsPage.css";
import Songs from "./Songs";
import { useSpotifyTokens } from "../../hooks/useSpotifyTokens";
import { useEffect, useState } from "react";
import { refresh } from "../../helpers";
import type { PlaylistCardProps } from "../PlaylistCard";

interface PlaylistDetailsProps {
  playlistId: string;
  songs: number;
}

type SpotifyPlaylistResponse = {
  tracks: {
    next: string | null;
    items: {
      track: {
        is_local: boolean;
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
};

interface SongInfo {
  next: string | null;
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

const PlaylistDetailsPage: React.FC<PlaylistDetailsProps> = () => {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setExpireSecs,
  } = useSpotifyTokens();

  const [songList, setSongList] = useState<SongInfo[] | null>(null);

  const location = useLocation();
  const state = location.state as PlaylistCardProps | undefined;

  useEffect(() => {
    if (!state || !accessToken) return;
    console.log("playlist id", state.id);

    const fetchTracks = async () => {
      try {
        const makeRequest = async (token: string) => {
          return fetch(`https://api.spotify.com/v1/playlists/${state.id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        };

        // first attempt
        let res = await makeRequest(accessToken);

        // handle expired token
        if (res.status === 401) {
          const refreshRes = await refresh(refreshToken);
          console.log("refreshRes:", refreshRes);

          setAccessToken(refreshRes.access_token);
          setRefreshToken(refreshRes.refresh_token);
          setExpireSecs(refreshRes.expires_in);

          // try again with new token
          res = await makeRequest(refreshRes.access_token);
        }

        if (!res.ok) {
          console.error("get playlist failed:", res.status, res.statusText);
          console.error(await res.text());
          return;
        }

        const data: SpotifyPlaylistResponse = await res.json();

        const songInfo: SongInfo[] = data.tracks.items.map((song) => {
          const track = song.track;
          if (!track) {
            return {
              next: data.tracks.next,
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
              next: data.tracks.next,
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

        setSongList(songInfo);
        console.log("songInfo", songInfo);
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
  const { name, author, songs, minutes, image, spotifyUrl } = state;
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
          {songs} songs | {minutes} min
        </p>

        <GoToSpotifyButton url={spotifyUrl} />
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
