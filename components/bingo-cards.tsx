"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Song } from "../types"
import dynamic from "next/dynamic"

const jsPDF = dynamic(() => import("jspdf"), {
  ssr: false,
})

interface BingoCardsProps {
  players: number
  playerNames: string[]
  songsPerCard: number
  songs: Song[]
  currentSong: Song | null
  onBingo: (playerIndex: number) => void
}

export function BingoCards({ players, playerNames, songsPerCard, songs, currentSong, onBingo }: BingoCardsProps) {
  const [markedSongs, setMarkedSongs] = useState<boolean[][]>(
    Array(players)
      .fill(null)
      .map(() => Array(songsPerCard).fill(false)),
  )

  const checkBingo = (playerIndex: number) => {
    const playerMarks = markedSongs[playerIndex]
    const size = Math.sqrt(songsPerCard)

    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (playerMarks.slice(i * size, (i + 1) * size).every(Boolean)) return true
      if (playerMarks.filter((_, index) => index % size === i).every(Boolean)) return true
    }

    // Check diagonals
    if (playerMarks.filter((_, index) => index % (size + 1) === 0).every(Boolean)) return true
    if (
      playerMarks.filter((_, index) => index % (size - 1) === 0 && index > 0 && index < songsPerCard - 1).every(Boolean)
    )
      return true

    return false
  }

  const markSong = (playerIndex: number, songIndex: number) => {
    const newMarkedSongs = [...markedSongs]
    newMarkedSongs[playerIndex][songIndex] = true
    setMarkedSongs(newMarkedSongs)

    if (checkBingo(playerIndex)) {
      onBingo(playerIndex)
    }
  }

  const generateBingoCard = (playerIndex: number) => {
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5)
    const cardSongs = shuffledSongs.slice(0, songsPerCard)

    return (
      <Card key={playerIndex} className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{playerNames[playerIndex] || `Player ${playerIndex + 1}`} Bingo Card</CardTitle>
          <Button variant="outline" size="sm" onClick={() => downloadPDF(playerIndex, cardSongs)}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {cardSongs.map((song, index) => (
              <div
                key={index}
                className={`aspect-square p-2 border rounded-md flex items-center justify-center text-center text-xs cursor-pointer transition-colors ${
                  markedSongs[playerIndex][index] ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                } ${currentSong && currentSong.id === song.id ? "" : "opacity-50"}`}
                onClick={() => currentSong && currentSong.id === song.id && markSong(playerIndex, index)}
              >
                <div>
                  <div className="font-semibold">{song.title}</div>
                  <div className="text-xs opacity-75">{song.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const downloadPDF = async (playerIndex: number, cardSongs: Song[]) => {
    const { default: jsPDF } = await import("jspdf")
    const pdf = new jsPDF()

    pdf.setFontSize(20)
    pdf.text(`${playerNames[playerIndex] || `Player ${playerIndex + 1}`} Bingo Card`, 105, 15, { align: "center" })

    // Add domain name
    pdf.setFontSize(10)
    pdf.text("bingokaraoke.com", 105, 22, { align: "center" })

    const startX = 20
    const startY = 30
    const cellWidth = 50
    const cellHeight = 30
    const cols = 3
    const rows = Math.ceil(cardSongs.length / cols)

    pdf.setFontSize(10)
    cardSongs.forEach((song, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = startX + col * cellWidth
      const y = startY + row * cellHeight

      pdf.rect(x, y, cellWidth, cellHeight)
      pdf.text(`${song.title}\n${song.artist}`, x + cellWidth / 2, y + cellHeight / 2, {
        align: "center",
        baseline: "middle",
        maxWidth: cellWidth - 4,
      })
    })

    pdf.save(`bingokaraoke_${playerNames[playerIndex] || `player_${playerIndex + 1}`}.pdf`)
  }

  return <div className="space-y-6">{Array.from({ length: players }, (_, i) => generateBingoCard(i))}</div>
}
