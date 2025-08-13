'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useGameEngine } from '@/components/footmen-frenzy/game-engine'
import { GameBoard } from '@/components/footmen-frenzy/game-board'
import { UnitInfoPanel } from '@/components/footmen-frenzy/unit-info-panel'

export default function FootmenFrenzyGame() {
  const { 
    gameState, 
    startGame, 
    selectUnit, 
    moveSelectedUnits,
    attackTarget,
    spawnFootman, 
    togglePause, 
    resetGame 
  } = useGameEngine()
  
  // Heroes data
  const heroes = [
    { id: 'tank', name: 'Mountain King', class: 'Tank', description: 'High durability with area damage abilities' },
    { id: 'ranged', name: 'Fire Lord', class: 'Ranged', description: 'Powerful AoE damage dealer' },
    { id: 'utility', name: 'Dark Ranger', class: 'Utility', description: 'Support with crowd control abilities' },
    { id: 'dps', name: 'Shadow Hunter', class: 'DPS', description: 'High damage melee specialist' },
  ]
  
  // Render menu screen
  if (gameState.gameStatus === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Footmen Frenzy</CardTitle>
            <p className="text-muted-foreground mt-2">
              Control your hero and command armies of footmen in this fast-paced RTS!
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Select Your Hero</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heroes.map((hero) => (
                    <Card 
                      key={hero.id} 
                      className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      onClick={() => startGame(hero.id as any)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold text-primary-foreground">
                              {hero.name.charAt(0)}
                            </span>
                          </div>
                          <h4 className="font-bold text-lg">{hero.name}</h4>
                          <Badge variant="secondary" className="mt-1">{hero.class}</Badge>
                          <p className="text-sm text-muted-foreground mt-2 text-center">
                            {hero.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="text-center pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">Game Modes</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline">All Random</Button>
                  <Button variant="outline">Hero Pick</Button>
                  <Button variant="outline">Custom Game</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground max-w-2xl">
          <h4 className="font-semibold mb-2">How to Play</h4>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <li>• Control your hero with mouse/keyboard</li>
            <li>• Command footmen to attack enemies</li>
            <li>• Level up by defeating enemy units</li>
            <li>• Collect gold and items</li>
            <li>• Survive as long as possible</li>
            <li>• Work with your team to dominate!</li>
          </ul>
        </div>
      </div>
    )
  }
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds)
    const secs = Math.floor((seconds - mins) * 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  // Get selected units
  const selectedUnits = gameState.playerHero ? 
    [...gameState.units, gameState.playerHero].filter(unit => unit.selected) : 
    gameState.units.filter(unit => unit.selected)
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Game Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Footmen Frenzy</h1>
            <Badge variant="secondary">
              {gameState.gameStatus === 'playing' ? 'Playing' : 'Paused'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Time:</span>
              <span className="font-mono">{formatTime(gameState.gameTime)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-medium">Gold:</span>
              <span className="font-mono">{gameState.resources.gold}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-medium">Lumber:</span>
              <span className="font-mono">{gameState.resources.lumber}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={togglePause}
              >
                {gameState.gameStatus === 'playing' ? 'Pause' : 'Resume'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetGame}
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Game Area */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        {/* Game Board */}
        <GameBoard 
          units={gameState.units}
          playerHero={gameState.playerHero}
          selectedUnits={gameState.selectedUnits}
          onSelectUnit={selectUnit}
          onMoveUnits={moveSelectedUnits}
          onAttackUnit={attackTarget}
        />
        
        {/* Game Controls & Info */}
        <div className="w-full md:w-80 space-y-4">
          {/* Unit Info Panel */}
          <UnitInfoPanel 
            units={gameState.units}
            playerHero={gameState.playerHero}
            selectedUnits={gameState.selectedUnits}
          />
          
          {/* Unit Commands */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Move</Button>
                <Button variant="outline" size="sm">Attack</Button>
                <Button variant="outline" size="sm">Hold</Button>
                <Button variant="outline" size="sm">Stop</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Footmen Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Army</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Footmen</span>
                  <span className="font-mono">
                    {gameState.units.filter(u => u.type === 'footman' && u.team === 'player').length}/20
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Archers</span>
                  <span className="font-mono">0/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Knights</span>
                  <span className="font-mono">0/3</span>
                </div>
                <Button 
                  className="w-full mt-3" 
                  size="sm"
                  onClick={spawnFootman}
                  disabled={gameState.resources.gold < 50}
                >
                  Spawn Footman (50g)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Game Log */}
      <div className="border-t border-slate-700 bg-slate-800/50 p-4">
        <div className="container mx-auto">
          <h3 className="font-semibold mb-2">Game Log</h3>
          <div className="h-20 overflow-y-auto text-sm space-y-1">
            <p>Game started with {heroes.find(h => h.id === gameState.playerHero?.heroClass)?.name}</p>
            <p>Footmen have been deployed</p>
            <p>Enemy units spotted to the north</p>
            <p>Resources generated: +2 gold, +1 lumber</p>
          </div>
        </div>
      </div>
    </div>
  )
}





