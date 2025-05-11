"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-6 text-muted-foreground">An error occurred while loading this page.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
          Return to Home
        </Link>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">bingokaraoke.com</p>
    </div>
  )
}
