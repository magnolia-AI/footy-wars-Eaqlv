import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Footmen Frenzy | Game Collection',
  description: 'Play the classic Warcraft III custom game Footmen Frenzy in your browser',
}

export default function FootmenFrenzyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
