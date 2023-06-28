'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
        <body>
            <h2>Something went wrong!</h2>
            <Link href="/">Back</Link>
        </body>
  )
}