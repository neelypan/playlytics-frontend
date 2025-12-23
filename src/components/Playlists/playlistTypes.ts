export interface PlaylistsData {
  name: string;
  songAmnt: number;
  length: number;
  image: string;
  author: string;
  external_urls?: string;
  id: string;
}
export interface PlaylistItem {
  name: string;
  id: string;
  tracks: {
    total: number;
  };
  images: Array<{
    url: string;
  }>;
  owner: {
    display_name: string;
  };
  external_urls: { spotify: string };
}
export interface PlaylistsProps {
  onGoHome?: () => void;
}
