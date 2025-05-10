export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export interface Song {
  id: string
  title: string
  artist: string
  youtubeUrl: string
  genre: string
}

export interface Playlist {
  id: string
  name: string
  songs: Song[]
}
