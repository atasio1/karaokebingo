import type React from "react"
import { Toaster } from "@/components/ui/use-toast"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bingo Karaoke | bingokaraoke.com",
  description: "Create and play karaoke bingo games with your friends",
  metadataBase: new URL("https://bingokaraoke.com"),
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}


import './globals.css'