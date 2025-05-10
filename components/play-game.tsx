"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Play, SkipForward } from 'lucide-react'
import { BingoCards } from "./bingo-cards"
import { Song } from "../types"
import { useToast } from "@/components/ui/use-toast"

interface GameState {
  players: number
  playerNames: string[]
  songsPerCard: number
  playlist: Song[]
}

export function PlayGame() {
  const { toast } = useToast()
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [playedSongs, setPlayedSongs] = useState<Song[]>([])
  const [winners, setWinners] = useState<number[]>([])

  useEffect(() => {
    const savedGameState = localStorage.getItem('karaoke_bingo_game_state')
    if (savedGameState) {
      setGameState(JSON.parse(savedGameState))
    }
  }, [])

  if (!gameState) {
    return <div>Loading game...</div>
  }

  const { players, playerNames, songsPerCard, playlist } = gameState
  const currentSong = playlist[currentSongIndex]
  const nextSong = playlist[currentSongIndex + 1]

  const handlePlayNext = () => {
    if (currentSongIndex < playlist.length - 1) {
      setPlayedSongs([...playedSongs, currentSong])
      setCurrentSongIndex(currentSongIndex + 1)
    }
  }

  const handleBingo = (playerIndex: number) => {
    if (!winners.includes(playerIndex)) {
      setWinners([...winners, playerIndex])
      toast({
        title: "Bingo!",
        description: `${playerNames[playerIndex] || `Player ${playerIndex + 1}`} has won!`,
      })
    }
  }

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-6 p-4">
      {/* Main Game Area */}
      <div className="space-y-6">
        <BingoCards
          players={players}
          playerNames={playerNames}
          songsPerCard={songsPerCard}
          songs={playlist}
          currentSong={currentSong}
          onBingo={handleBingo}
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Mini Player */}
        <Card>
          <CardHeader>
            <CardTitle>Now Playing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSong ? (
              <div className="space-y-2">
                <h3 className="font-medium">{currentSong.title}</h3>
                <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a href={currentSong.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" onClick={handlePlayNext}>
                    <SkipForward className="h-4 w-4 mr-2" />
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <p>No song currently playing</p>
            )}
            {nextSong && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Up Next</h4>
                <div className="text-sm text-muted-foreground">
                  {nextSong.title} - {nextSong.artist}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Song History */}
        <Card>
          <CardHeader>
            <CardTitle>Song History</CardTitle>
          </CardHeader>
          <CardContent>
            {playedSongs.length > 0 ? (
              <ul className="space-y-2">
                {playedSongs.map((song, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {index + 1}. {song.title} - {song.artist}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No songs played yet</p>
            )}
          </CardContent>
        </Card>

        {/* Winners */}
        {winners.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Winners</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {winners.map((playerIndex, index) => (
                  <li key={index} className="text-sm font-medium">
                    {playerNames[playerIndex] || `Player ${playerIndex + 1}`}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
