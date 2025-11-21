export interface PlaylistsData {
  name: string;
  songAmnt: number;
  length: number;
  image: string;
  author: string;
  external_urls?: string;
}
export interface PlaylistItem {
  name: string;
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
