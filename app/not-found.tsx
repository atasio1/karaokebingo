import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-6 text-muted-foreground">The page you are looking for does not exist.</p>
      <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Return to Home
      </Link>
      <p className="mt-8 text-sm text-muted-foreground">bingokaraoke.com</p>
    </div>
  )
}
