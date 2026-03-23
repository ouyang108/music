export interface Music {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover: string;
  url: string;
  duration?: number;
}

export interface Playlist {
  id: string;
  name: string;
  cover?: string;
  tracks: Music[];
}
