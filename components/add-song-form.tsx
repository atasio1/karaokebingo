"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Song } from "../types"

const genres = [
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "hiphop", label: "Hip Hop" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "electronic", label: "Electronic" },
  { value: "rb", label: "R&B" },
  { value: "country", label: "Country" },
]

interface AddSongFormProps {
  onSubmit: (song: Omit<Song, "id">) => void
  initialValues?: Song
  buttonText?: string
}

export function AddSongForm({ onSubmit, initialValues, buttonText = "Añadir Canción" }: AddSongFormProps) {
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    artist: initialValues?.artist || "",
    youtubeUrl: initialValues?.youtubeUrl || "",
    genre: initialValues?.genre || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    if (!initialValues) {
      setFormData({
        title: "",
        artist: "",
        youtubeUrl: "",
        genre: "",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="artist">Artista</Label>
        <Input
          id="artist"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="youtubeUrl">URL de YouTube</Label>
        <Input
          id="youtubeUrl"
          value={formData.youtubeUrl}
          onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="genre">Género</Label>
        <Select
          value={formData.genre}
          onValueChange={(value) => setFormData({ ...formData, genre: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un género" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.value} value={genre.value}>
                {genre.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        {buttonText}
      </Button>
    </form>
  )
}
