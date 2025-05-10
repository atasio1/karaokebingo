import { Song, Playlist } from "../types"

const SONGS_KEY = 'karaoke_bingo_songs'
const PLAYLISTS_KEY = 'karaoke_bingo_playlists'

export const storage = {
  getSongs: (): Song[] => {
    const songs = localStorage.getItem(SONGS_KEY)
    return songs ? JSON.parse(songs) : []
  },
  setSongs: (songs: Song[]) => {
    localStorage.setItem(SONGS_KEY, JSON.stringify(songs))
  },
  getPlaylists: (): Playlist[] => {
    const playlists = localStorage.getItem(PLAYLISTS_KEY)
    return playlists ? JSON.parse(playlists) : []
  },
  setPlaylists: (playlists: Playlist[]) => {
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists))
  }
}
