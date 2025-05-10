"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { storage } from "../utils/storage"
import { Song, Playlist } from "../types"

interface GameSettingsProps {
  onStartGame: () => void
}

export function GameSettings({ onStartGame }: GameSettingsProps) {
  const [players, setPlayers] = useState("4")
  const [playerNames, setPlayerNames] = useState<string[]>([])
  const [songsPerCard, setSongsPerCard] = useState("9")
  const [filterType, setFilterType] = useState("genre")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [playlists, setPlaylists] = useState<Playlist[]>(storage.getPlaylists())
  const [songs, setSongs] = useState<Song[]>(storage.getSongs())

  useEffect(() => {
    setPlaylists(storage.getPlaylists())
    setSongs(storage.getSongs())
  }, [])

  useEffect(() => {
    setPlayerNames(Array(parseInt(players)).fill(""))
  }, [players])

  const genres = Array.from(new Set(songs.map(song => song.genre)))
  const artists = Array.from(new Set(songs.map(song => song.artist)))


  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayerNames = [...playerNames]
    newPlayerNames[index] = name
    setPlayerNames(newPlayerNames)
  }

  const handleStartGame = () => {
    let selectedSongs: Song[] = []

    if (filterType === "genre") {
      selectedSongs = songs.filter(song => song.genre === selectedFilter)
    } else if (filterType === "artist") {
      selectedSongs = songs.filter(song => song.artist === selectedFilter)
    } else if (filterType === "playlist") {
      const selectedPlaylist = playlists.find(playlist => playlist.id === selectedFilter)
      selectedSongs = selectedPlaylist ? selectedPlaylist.songs : []
    }

    // Shuffle the selected songs
    const shuffledSongs = selectedSongs.sort(() => Math.random() - 0.5)

    // Create game state
    const gameState = {
      players: parseInt(players),
      playerNames: playerNames,
      songsPerCard: parseInt(songsPerCard),
      playlist: shuffledSongs,
    }

    // Save game state to local storage
    localStorage.setItem('karaoke_bingo_game_state', JSON.stringify(gameState))

    // Navigate to the play game tab
    onStartGame()
  }

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>
            Configure your Karaoke Bingo game settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Player Settings */}
          <div className="space-y-2">
            <Label htmlFor="players">Number of Players</Label>
            <Select value={players} onValueChange={setPlayers}>
              <SelectTrigger id="players">
                <SelectValue placeholder="Select number of players" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1} {i === 0 ? "Player" : "Players"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Player Names */}
          <div className="space-y-2">
            <Label>Player Names</Label>
            {playerNames.map((name, index) => (
              <Input
                key={index}
                placeholder={`Player ${index + 1} Name`}
                value={name}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              />
            ))}
          </div>

          {/* Songs per Card Settings */}
          <div className="space-y-2">
            <Label htmlFor="songsPerCard">Songs per Card</Label>
            <Select value={songsPerCard} onValueChange={setSongsPerCard}>
              <SelectTrigger id="songsPerCard">
                <SelectValue placeholder="Select number of songs" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(11)].map((_, i) => (
                  <SelectItem key={i + 5} value={(i + 5).toString()}>
                    {i + 5} Songs
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Song Selection Method */}
          <div className="space-y-4">
            <Label>Song Selection Method</Label>
            <Tabs value={filterType} onValueChange={setFilterType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="genre">By Genre</TabsTrigger>
                <TabsTrigger value="artist">By Artist</TabsTrigger>
                <TabsTrigger value="playlist">By Playlist</TabsTrigger>
              </TabsList>
              <TabsContent value="genre">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="artist">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist} value={artist}>
                        {artist}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="playlist">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a playlist" />
                  </SelectTrigger>
                  <SelectContent>
                    {playlists.map((playlist) => (
                      <SelectItem key={playlist.id} value={playlist.id}>
                        {playlist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStartGame}>Start Game</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
