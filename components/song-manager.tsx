"use client"

import { useState, useEffect } from "react"
import { generateId } from "../types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AddSongForm } from "./add-song-form"
import { SongList } from "./song-list"
import { PlaylistModal } from "./playlist-modal"
import { type Song, type Playlist } from "../types"
import { storage } from "../utils/storage"

export function SongManager() {
  const [songs, setSongs] = useState<Song[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)

  useEffect(() => {
    setSongs(storage.getSongs())
    setPlaylists(storage.getPlaylists())
  }, [])

  const handleAddSong = (songData: Omit<Song, "id">) => {
    const newSong = { ...songData, id: generateId() }
    const updatedSongs = [...songs, newSong]
    setSongs(updatedSongs)
    storage.setSongs(updatedSongs)
  }

  const handleEditSong = (songData: Omit<Song, "id">) => {
    if (!editingSong) return
    const updatedSongs = songs.map((song) =>
      song.id === editingSong.id ? { ...songData, id: song.id } : song
    )
    setSongs(updatedSongs)
    storage.setSongs(updatedSongs)
    setEditingSong(null)
  }

  const handleDeleteSong = (id: string) => {
    const updatedSongs = songs.filter((song) => song.id !== id)
    setSongs(updatedSongs)
    storage.setSongs(updatedSongs)
    const updatedPlaylists = playlists.map((playlist) => ({
      ...playlist,
      songs: playlist.songs.filter((song) => song.id !== id),
    }))
    setPlaylists(updatedPlaylists)
    storage.setPlaylists(updatedPlaylists)
  }

  const handleCreatePlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: generateId(),
      name,
      songs: selectedSongs,
    }
    const updatedPlaylists = [...playlists, newPlaylist]
    setPlaylists(updatedPlaylists)
    storage.setPlaylists(updatedPlaylists)
    setSelectedSongs([])
  }

  const handleRemoveFromPlaylist = (playlistId: string, songId: string) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId
        ? {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== songId),
          }
        : playlist
    )
    setPlaylists(updatedPlaylists)
    storage.setPlaylists(updatedPlaylists)
  }

  const handleSongSelect = (song: Song, checked: boolean) => {
    if (checked) {
      setSelectedSongs([...selectedSongs, song])
    } else {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id))
    }
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Add Song</h2>
        <AddSongForm onSubmit={handleAddSong} />
      </div>
      <div className="space-y-4">
        <Tabs defaultValue="songs">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            {selectedSongs.length > 0 && (
              <Button onClick={() => setIsPlaylistModalOpen(true)}>
                Create Playlist ({selectedSongs.length})
              </Button>
            )}
          </div>
          <TabsContent value="songs" className="mt-4">
            <SongList
              songs={songs}
              onEdit={setEditingSong}
              onDelete={handleDeleteSong}
              onSelect={handleSongSelect}
              showCheckbox
            />
          </TabsContent>
          <TabsContent value="playlists" className="mt-4">
            <div className="space-y-8">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="space-y-4">
                  <h3 className="text-lg font-semibold">{playlist.name}</h3>
                  <SongList
                    songs={playlist.songs}
                    onEdit={setEditingSong}
                    onDelete={(songId) =>
                      handleRemoveFromPlaylist(playlist.id, songId)
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!editingSong} onOpenChange={() => setEditingSong(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Song</DialogTitle>
          </DialogHeader>
          {editingSong && (
            <AddSongForm
              onSubmit={handleEditSong}
              initialValues={editingSong}
              buttonText="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>

      <PlaylistModal
        open={isPlaylistModalOpen}
        onOpenChange={setIsPlaylistModalOpen}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  )
}
