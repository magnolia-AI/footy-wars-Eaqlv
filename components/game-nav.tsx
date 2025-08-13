'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function GameNav() {
  return (
    <div className="flex justify-center py-4 bg-slate-800/50">
      <div className="flex space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/footmen-frenzy">Footmen Frenzy</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/docs">Documentation</Link>
        </Button>
      </div>
    </div>
  )
}

