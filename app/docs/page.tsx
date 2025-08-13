import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Documentation | Game Collection',
  description: 'Technical documentation for the classic games collection project',
}

export default function DocsPage() {
  return (
    <div className="min-h-full">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Technical Documentation</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Implementation details and architecture of the classic games collection
          </p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  Architecture and technology stack
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This project is built with modern web technologies to recreate classic games for the browser:
                </p>
                <ul className="space-y-2">
                  <li>• Next.js 15 with App Router for SSR and client-side interactivity</li>
                  <li>• TypeScript for type safety and maintainability</li>
                  <li>• Tailwind CSS for responsive styling</li>
                  <li>• Shadcn/UI components for consistent UI elements</li>
                  <li>• Custom game engine implementation for real-time gameplay</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Footmen Frenzy Implementation</CardTitle>
                <CardDescription>
                  Core game mechanics and components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Game Engine</h3>
                <p className="mb-4">
                  The game engine is implemented as a React hook that manages game state and logic:
                </p>
                <ul className="space-y-2 mb-4">
                  <li>• Entity Component System for units (heroes, footmen, enemies)</li>
                  <li>• Real-time game loop using requestAnimationFrame</li>
                  <li>• Resource management (gold, lumber)</li>
                  <li>• Unit selection and command system</li>
                  <li>• Hero progression and ability system</li>
                </ul>

                <h3 className="font-semibold mb-2">Components</h3>
                <ul className="space-y-2">
                  <li>• <code>GameEngine</code> - Core game logic hook</li>
                  <li>• <code>GameBoard</code> - Visual rendering of game entities</li>
                  <li>• <code>HeroPanel</code> - Hero information and abilities</li>
                  <li>• <code>ArmyPanel</code> - Unit management interface</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Future Enhancements</CardTitle>
                <CardDescription>
                  Planned features and improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Gameplay Features</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Multiplayer support with WebSockets</li>
                  <li>• Advanced AI for enemy units</li>
                  <li>• Item and equipment system</li>
                  <li>• Multiple game modes (All Random, Hero Pick)</li>
                  <li>• Map variety and environmental effects</li>
                </ul>

                <h3 className="font-semibold mb-2">Technical Improvements</h3>
                <ul className="space-y-2">
                  <li>• Web Workers for offloading game logic</li>
                  <li>• Asset optimization and lazy loading</li>
                  <li>• Mobile touch controls</li>
                  <li>• Modding API and content creation tools</li>
                  <li>• Performance profiling and optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Guide</CardTitle>
                <CardDescription>
                  How to contribute and extend the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <pre className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                  {`# Clone the repository
git clone <repository-url>

# Install dependencies
bun install

# Start development server
bun run dev`}
                </pre>

                <h3 className="font-semibold mb-2">Project Structure</h3>
                <ul className="space-y-2">
                  <li>• <code>app/</code> - Next.js app router pages</li>
                  <li>• <code>components/</code> - Reusable UI components</li>
                  <li>• <code>components/footmen-frenzy/</code> - Game-specific components</li>
                  <li>• <code>lib/</code> - Utility functions and shared logic</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
