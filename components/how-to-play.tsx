import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from 'lucide-react'

export function HowToPlay() {
  return (
    <div className="space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How to Play Karaoke Bingo</CardTitle>
          <CardDescription>
            Learn how to play and win at Karaoke Bingo!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Setup Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Setup</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Go to Game Settings and select the number of players (max 10)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Choose how many songs per bingo card (max 15)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Pick a music genre to filter songs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Click "Start Game" to generate bingo cards</span>
              </li>
            </ul>
          </div>

          {/* Gameplay Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gameplay</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Each player receives a unique bingo card with random songs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>The host plays songs from the playlist</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Players mark off songs they hear on their cards</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>First player to complete a row, column, or diagonal wins!</span>
              </li>
            </ul>
          </div>

          {/* Tips Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Listen carefully - songs might be played in any order</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep track of played songs in the history</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Double-check winning patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Have fun and discover new music!</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
