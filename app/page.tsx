"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SongManager } from "@/components/song-manager"
import { GameSettings } from "@/components/game-settings"
import { HowToPlay } from "@/components/how-to-play"
import { PlayGame } from "@/components/play-game"

export default function MusicLibrary() {
  const [activeTab, setActiveTab] = useState("how-to-play")

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (["how-to-play", "game-settings", "song-manager", "play-game"].includes(hash)) {
        setActiveTab(hash)
      }
    }

    handleHashChange() // Set initial tab based on URL hash
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.location.hash = value
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bingo Karaoke</h1>
      <p className="text-center text-muted-foreground mb-8">bingokaraoke.com</p>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="how-to-play">How to Play</TabsTrigger>
          <TabsTrigger value="game-settings">Settings</TabsTrigger>
          <TabsTrigger value="song-manager">Songs</TabsTrigger>
          <TabsTrigger value="play-game">Play Game</TabsTrigger>
        </TabsList>

        <TabsContent value="how-to-play">
          <HowToPlay />
        </TabsContent>

        <TabsContent value="game-settings">
          <GameSettings onStartGame={() => handleTabChange("play-game")} />
        </TabsContent>

        <TabsContent value="song-manager">
          <SongManager />
        </TabsContent>

        <TabsContent value="play-game">
          <PlayGame />
        </TabsContent>
      </Tabs>
    </div>
  )
}
