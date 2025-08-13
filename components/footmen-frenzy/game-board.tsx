'use client'

import { useState, useRef } from 'react'
import { Unit, Hero } from '@/components/footmen-frenzy/game-engine'

interface GameBoardProps {
  units: Unit[]
  playerHero: Hero | null
  selectedUnits: string[]
  onSelectUnit: (unitId: string, additive: boolean) => void
  onMoveUnits: (position: { x: number; y: number }) => void
  onAttackUnit: (targetId: string) => void
}

export function GameBoard({ 
  units, 
  playerHero, 
  selectedUnits,
  onSelectUnit,
  onMoveUnits,
  onAttackUnit
}: GameBoardProps) {
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  
  // Get all units including hero
  const allUnits = playerHero ? [...units, playerHero] : units
  
  // Handle right-click on the board
  const handleBoardRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!boardRef.current) return
    
    // Calculate position relative to the board
    const rect = boardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 800
    const y = ((e.clientY - rect.top) / rect.height) * 600
    
    // Move selected units to this position
    onMoveUnits({ x, y })
  }
  
  // Handle right-click on a unit
  const handleUnitRightClick = (e: React.MouseEvent, unitId: string) => {
    e.preventDefault()
    
    // Check if the unit is an enemy
    const unit = allUnits.find(u => u.id === unitId)
    if (unit && unit.team === 'enemy') {
      // Attack the enemy unit
      onAttackUnit(unitId)
    } else {
      // Move to the unit's position
      onMoveUnits(unit.position)
    }
  }
  
  return (
    <div 
      ref={boardRef}
      className="flex-1 bg-slate-800/30 rounded-lg border border-slate-700 relative overflow-hidden"
      onContextMenu={handleBoardRightClick}
    >
      <div className="absolute inset-0 bg-grid-slate-700/20 bg-[length:40px_40px]"></div>
      
      {/* Render all units */}
      {allUnits.map((unit) => {
        const isHero = unit.type === 'hero'
        const isEnemy = unit.team === 'enemy'
        const isSelected = selectedUnits.includes(unit.id)
        const isHovered = hoveredUnit === unit.id
        
        return (
          <div
            key={unit.id}
            className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 ${
              isSelected ? 'ring-4 ring-yellow-400' : ''
            } ${isHovered ? 'scale-110' : ''}`}
            style={{
              width: isHero ? '48px' : '32px',
              height: isHero ? '48px' : '32px',
              left: `${(unit.position.x / 800) * 100}%`,
              top: `${(unit.position.y / 600) * 100}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: isSelected ? 
                (isHero ? '#3b82f6' : isEnemy ? '#ef4444' : '#10b981') : 
                (isHero ? '#3b82f6' : isEnemy ? '#ef4444' : '#10b981'),
              boxShadow: isHovered ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
            }}
            onClick={(e) => onSelectUnit(unit.id, e.shiftKey)}
            onContextMenu={(e) => handleUnitRightClick(e, unit.id)}
            onMouseEnter={() => setHoveredUnit(unit.id)}
            onMouseLeave={() => setHoveredUnit(null)}
          >
            <span className="text-xs font-bold text-white">
              {isHero ? 
                ((unit as Hero).heroClass === 'tank' ? 'MK' : 
                 (unit as Hero).heroClass === 'ranged' ? 'FL' : 
                 (unit as Hero).heroClass === 'utility' ? 'DR' : 'SH') : 
                unit.type.charAt(0).toUpperCase()}
            </span>
            {isHero && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-xs font-semibold bg-slate-900/80 px-2 py-1 rounded">
                  Lvl {unit.level}
                </div>
              </div>
            )}
          </div>
        )
      })}
      
      {/* Health bars for selected units */}
      {allUnits
        .filter(unit => selectedUnits.includes(unit.id))
        .map((unit) => (
          <div
            key={`health-${unit.id}`}
            className="absolute bg-slate-900/80 rounded px-2 py-1"
            style={{
              left: `${(unit.position.x / 800) * 100}%`,
              top: `${(unit.position.y / 600) * 100 - 8}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-20 h-2 bg-slate-700 rounded-full">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(unit.health / unit.maxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
        ))
      }
    </div>
  )
}




