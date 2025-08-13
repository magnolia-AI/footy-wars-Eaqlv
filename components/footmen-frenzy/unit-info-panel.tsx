'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Unit, Hero } from '@/components/footmen-frenzy/game-engine'

interface UnitInfoPanelProps {
  units: Unit[]
  playerHero: Hero | null
  selectedUnits: string[]
}

export function UnitInfoPanel({ units, playerHero, selectedUnits }: UnitInfoPanelProps) {
  // Get all units including hero
  const allUnits = playerHero ? [...units, playerHero] : units
  
  // Get selected units
  const selectedUnitObjects = allUnits.filter(unit => selectedUnits.includes(unit.id))
  
  if (selectedUnitObjects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unit Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Select a unit to view details
          </p>
        </CardContent>
      </Card>
    )
  }
  
  if (selectedUnitObjects.length === 1) {
    const unit = selectedUnitObjects[0]
    const isHero = unit.type === 'hero'
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {isHero ? `${(unit as Hero).heroClass} Hero` : `${unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Health</span>
                <span>{unit.health}/{unit.maxHealth}</span>
              </div>
              <Progress 
                value={(unit.health / unit.maxHealth) * 100} 
                className="h-2" 
              />
            </div>
            
            {isHero && (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mana</span>
                    <span>{(unit as Hero).mana}/{(unit as Hero).maxMana}</span>
                  </div>
                  <Progress 
                    value={((unit as Hero).mana / (unit as Hero).maxMana) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level</span>
                    <span>{unit.level}</span>
                  </div>
                  <Progress 
                    value={((unit as Hero).experience / (unit as Hero).experienceToNextLevel) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Abilities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {(unit as Hero).abilities.map((ability, index) => (
                      <div 
                        key={index} 
                        className="bg-muted p-2 rounded text-center text-sm"
                      >
                        {ability}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-muted-foreground">Damage</p>
                <p className="font-medium">{unit.damage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Speed</p>
                <p className="font-medium">{unit.speed}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // Multiple units selected
  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedUnitObjects.length} Units Selected</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {selectedUnitObjects.slice(0, 5).map((unit) => (
            <div key={unit.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  unit.type === 'hero' ? 'bg-blue-500' : 
                  unit.team === 'enemy' ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
                <span className="text-sm">
                  {unit.type === 'hero' ? 
                    `${(unit as Hero).heroClass} Hero` : 
                    `${unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}`
                  }
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">{unit.health}/{unit.maxHealth}</span>
                <div className="w-16 h-1.5 bg-muted rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(unit.health / unit.maxHealth) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          {selectedUnitObjects.length > 5 && (
            <p className="text-sm text-muted-foreground text-center">
              +{selectedUnitObjects.length - 5} more units
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
