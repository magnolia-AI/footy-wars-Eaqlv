import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Game Collection',
  description: 'A collection of classic games recreated for the modern web',
}

export default function Home() {
  const games = [
    {
      id: 'footmen-frenzy',
      title: 'Footmen Frenzy',
      description: 'Classic Warcraft III custom game',
      status: 'Playable Demo',
      features: [
        '4 Hero Classes',
        'Unit Management',
        'Resource System',
        'Real-time Combat'
      ]
    },
    {
      id: 'coming-soon',
      title: 'More Games Coming Soon',
      description: 'Stay tuned for more classics',
      status: 'In Development',
      features: [
        'Community Voting',
        'Modding Tools',
        'Cross-platform Play'
      ]
    }
  ]

  return (
    <div className="min-h-full">
      <section className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Classic Games Collection</Badge>
          <h1 className="text-5xl font-bold tracking-tight lg:text-6xl mb-6">
            Relive the Classics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of beloved classic games recreated for the modern web with enhanced features and cross-platform play.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{game.title}</CardTitle>
                    <CardDescription className="mt-2">{game.description}</CardDescription>
                  </div>
                  <Badge variant={game.id === 'footmen-frenzy' ? 'default' : 'secondary'}>
                    {game.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {game.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {game.id === 'footmen-frenzy' ? (
                    <Link href="/footmen-frenzy">
                      <Button className="w-full">Play Now</Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Play Classic Games?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Timeless Gameplay</h3>
              <p className="text-sm text-muted-foreground">
                Experience the enduring appeal of classic game mechanics
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Modern Enhancements</h3>
              <p className="text-sm text-muted-foreground">
                Improved graphics, performance, and cross-platform play
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Create mods, share content, and play with friends worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
