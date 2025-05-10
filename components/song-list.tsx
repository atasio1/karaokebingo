"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Play, Trash } from 'lucide-react'
import { type Song } from "../types"

interface SongListProps {
  songs: Song[]
  onEdit: (song: Song) => void
  onDelete: (id: string) => void
  onSelect?: (song: Song, checked: boolean) => void
  showCheckbox?: boolean
}

export function SongList({ songs, onEdit, onDelete, onSelect, showCheckbox = false }: SongListProps) {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<"title" | "artist" | "genre">("title")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")

  const filteredSongs = songs
    .filter((song) => {
      const matchesSearch = song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase()) ||
        song.genre.toLowerCase().includes(search.toLowerCase())
      const matchesGenre = selectedGenre === "all" || !selectedGenre ? true : song.genre.toLowerCase() === selectedGenre.toLowerCase()
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))

  const genres = Array.from(new Set(songs.map((song) => song.genre)))

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Buscar canciones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={sortBy} onValueChange={(value: "title" | "artist" | "genre") => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Título</SelectItem>
            <SelectItem value="artist">Artista</SelectItem>
            <SelectItem value="genre">Género</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-4 rounded-lg border"
          >
            {showCheckbox && (
              <Checkbox
                onCheckedChange={(checked) => onSelect?.(song, checked === true)}
              />
            )}
            <div className="flex-1">
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-sm text-muted-foreground">
                {song.artist} • {song.genre}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(song.youtubeUrl, "_blank")}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(song)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(song.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
