'use client'

import { useState, useEffect, useRef } from 'react'

// Game entity types
export type Position = { x: number; y: number }

export type UnitType = 'hero' | 'footman' | 'archer' | 'knight' | 'enemy'

export type Unit = {
  id: string
  type: UnitType
  position: Position
  health: number
  maxHealth: number
  damage: number
  speed: number
  team: 'player' | 'enemy' | 'neutral'
  level: number
  target?: string // ID of target unit
  selected: boolean
  moveTo?: Position // Target position for movement
}

export type HeroClass = 'tank' | 'ranged' | 'utility' | 'dps'

export type Hero = Unit & {
  type: 'hero'
  heroClass: HeroClass
  mana: number
  maxMana: number
  experience: number
  experienceToNextLevel: number
  abilities: string[]
}

export type GameState = {
  units: Unit[]
  playerHero: Hero | null
  gameTime: number
  resources: {
    gold: number
    lumber: number
  }
  selectedUnits: string[]
  gameStatus: 'menu' | 'playing' | 'paused' | 'ended'
}

// Initial game state
const createInitialGameState = (): GameState => ({
  units: [],
  playerHero: null,
  gameTime: 0,
  resources: {
    gold: 100,
    lumber: 0
  },
  selectedUnits: [],
  gameStatus: 'menu'
})

// Hero templates
const heroTemplates: Record<HeroClass, Omit<Hero, 'id' | 'position' | 'selected'>> = {
  tank: {
    type: 'hero',
    heroClass: 'tank',
    health: 500,
    maxHealth: 500,
    damage: 30,
    speed: 2,
    team: 'player',
    level: 1,
    mana: 200,
    maxMana: 200,
    experience: 0,
    experienceToNextLevel: 100,
    abilities: ['Shield Wall', 'Taunt', 'Charge']
  },
  ranged: {
    type: 'hero',
    heroClass: 'ranged',
    health: 300,
    maxHealth: 300,
    damage: 50,
    speed: 3,
    team: 'player',
    level: 1,
    mana: 300,
    maxMana: 300,
    experience: 0,
    experienceToNextLevel: 100,
    abilities: ['Fireball', 'Multishot', 'Blink']
  },
  utility: {
    type: 'hero',
    heroClass: 'utility',
    health: 350,
    maxHealth: 350,
    damage: 25,
    speed: 3,
    team: 'player',
    level: 1,
    mana: 400,
    maxMana: 400,
    experience: 0,
    experienceToNextLevel: 100,
    abilities: ['Heal', 'Polymorph', 'Teleport']
  },
  dps: {
    type: 'hero',
    heroClass: 'dps',
    health: 400,
    maxHealth: 400,
    damage: 45,
    speed: 4,
    team: 'player',
    level: 1,
    mana: 250,
    maxMana: 250,
    experience: 0,
    experienceToNextLevel: 100,
    abilities: ['Whirlwind', 'Berserk', 'Cleave']
  }
}

// Game engine hook
export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState())
  const gameLoopRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)
  
  // Initialize game with selected hero
  const startGame = (heroClass: HeroClass) => {
    const hero: Hero = {
      id: 'hero-1',
      position: { x: 400, y: 300 },
      selected: true,
      ...heroTemplates[heroClass]
    }
    
    // Create initial footmen
    const initialFootmen: Unit[] = []
    for (let i = 0; i < 5; i++) {
      initialFootmen.push({
        id: `footman-${i}`,
        type: 'footman',
        position: { 
          x: 400 + (i % 2 === 0 ? -30 : 30), 
          y: 320 + Math.floor(i / 2) * 30 
        },
        health: 100,
        maxHealth: 100,
        damage: 15,
        speed: 2,
        team: 'player',
        level: 1,
        selected: false
      })
    }
    
    // Create initial enemies
    const initialEnemies: Unit[] = []
    for (let i = 0; i < 3; i++) {
      initialEnemies.push({
        id: `enemy-${i}`,
        type: 'enemy',
        position: { 
          x: 200 + (i % 2 === 0 ? -20 : 20), 
          y: 150 + Math.floor(i / 2) * 40 
        },
        health: 80,
        maxHealth: 80,
        damage: 10,
        speed: 1.5,
        team: 'enemy',
        level: 1,
        selected: false
      })
    }
    
    setGameState({
      units: [...initialFootmen, ...initialEnemies],
      playerHero: hero,
      gameTime: 0,
      resources: {
        gold: 100,
        lumber: 0
      },
      selectedUnits: [hero.id],
      gameStatus: 'playing'
    })
  }
  
  // Game loop
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return
    
    const updateGame = (timestamp: number) => {
      if (!lastUpdateRef.current) lastUpdateRef.current = timestamp
      const deltaTime = timestamp - lastUpdateRef.current
      lastUpdateRef.current = timestamp
      
      setGameState(prev => {
        // Update game time
        const newGameTime = prev.gameTime + deltaTime / 1000
        
        // Generate resources over time
        const resourceInterval = 5 // seconds
        const newResources = {
          gold: prev.resources.gold + Math.floor(newGameTime / resourceInterval) * 2 - Math.floor(prev.gameTime / resourceInterval) * 2,
          lumber: prev.resources.lumber + Math.floor(newGameTime / resourceInterval) * 1 - Math.floor(prev.gameTime / resourceInterval) * 1
        }
        
        // Update unit positions and behaviors
        const updatedUnits = prev.units.map(unit => {
          // Handle unit movement
          if (unit.moveTo) {
            const dx = unit.moveTo.x - unit.position.x
            const dy = unit.moveTo.y - unit.position.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            // If we're close enough to the target, stop moving
            if (distance < 5) {
              return {
                ...unit,
                moveTo: undefined
              }
            }
            
            // Move toward target position
            const moveX = (dx / distance) * unit.speed * (deltaTime / 1000) * 100
            const moveY = (dy / distance) * unit.speed * (deltaTime / 1000) * 100
            
            return {
              ...unit,
              position: {
                x: unit.position.x + moveX,
                y: unit.position.y + moveY
              }
            }
          }
          
          // Simple AI for enemies - move toward player units
          if (unit.team === 'enemy' && prev.playerHero) {
            const dx = prev.playerHero.position.x - unit.position.x
            const dy = prev.playerHero.position.y - unit.position.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance > 5) {
              const moveX = (dx / distance) * unit.speed * (deltaTime / 1000)
              const moveY = (dy / distance) * unit.speed * (deltaTime / 1000)
              
              return {
                ...unit,
                position: {
                  x: unit.position.x + moveX,
                  y: unit.position.y + moveY
                }
              }
            }
          }
          
          return unit
        })
        
        // Update hero position if moving
        let updatedHero = prev.playerHero
        if (updatedHero && updatedHero.moveTo) {
          const dx = updatedHero.moveTo.x - updatedHero.position.x
          const dy = updatedHero.moveTo.y - updatedHero.position.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // If we're close enough to the target, stop moving
          if (distance < 5) {
            updatedHero = {
              ...updatedHero,
              moveTo: undefined
            }
          } else {
            // Move toward target position
            const moveX = (dx / distance) * updatedHero.speed * (deltaTime / 1000) * 100
            const moveY = (dy / distance) * updatedHero.speed * (deltaTime / 1000) * 100
            
            updatedHero = {
              ...updatedHero,
              position: {
                x: updatedHero.position.x + moveX,
                y: updatedHero.position.y + moveY
              }
            }
          }
        }
        
        return {
          ...prev,
          units: updatedUnits,
          playerHero: updatedHero,
          gameTime: newGameTime,
          resources: newResources
        }
      })
      
      gameLoopRef.current = requestAnimationFrame(updateGame)
    }
    
    gameLoopRef.current = requestAnimationFrame(updateGame)
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.gameStatus])
  
  // Select unit
  const selectUnit = (unitId: string, additive: boolean = false) => {
    setGameState(prev => {
      // Update unit selection
      const updatedUnits = prev.units.map(unit => ({
        ...unit,
        selected: additive ? 
          (unit.selected || unit.id === unitId) : 
          (unit.id === unitId)
      }))
      
      // Update hero selection
      let updatedHero = prev.playerHero
      if (updatedHero) {
        updatedHero = {
          ...updatedHero,
          selected: additive ? 
            (updatedHero.selected || updatedHero.id === unitId) : 
            (updatedHero.id === unitId)
        }
      }
      
      // Update selected units list
      const newSelectedUnits = additive ? 
        [...prev.selectedUnits, unitId] : 
        [unitId]
      
      return {
        ...prev,
        units: updatedUnits,
        playerHero: updatedHero,
        selectedUnits: newSelectedUnits
      }
    })
  }
  
  // Move selected units to position
  const moveSelectedUnits = (position: Position) => {
    setGameState(prev => {
      // Update units
      const updatedUnits = prev.units.map(unit => {
        if (prev.selectedUnits.includes(unit.id)) {
          return {
            ...unit,
            moveTo: position
          }
        }
        return unit
      })
      
      // Update hero if selected
      let updatedHero = prev.playerHero
      if (updatedHero && prev.selectedUnits.includes(updatedHero.id)) {
        updatedHero = {
          ...updatedHero,
          moveTo: position
        }
      }
      
      return {
        ...prev,
        units: updatedUnits,
        playerHero: updatedHero
      }
    })
  }
  
  // Attack target unit
  const attackTarget = (targetId: string) => {
    setGameState(prev => {
      // Find the target unit
      const targetUnit = prev.units.find(u => u.id === targetId) || 
                        (prev.playerHero?.id === targetId ? prev.playerHero : null)
      
      if (!targetUnit) return prev
      
      // Update selected units to attack the target
      const updatedUnits = prev.units.map(unit => {
        if (prev.selectedUnits.includes(unit.id)) {
          return {
            ...unit,
            target: targetId,
            moveTo: targetUnit.position // Move toward the target
          }
        }
        return unit
      })
      
      // Update hero if selected
      let updatedHero = prev.playerHero
      if (updatedHero && prev.selectedUnits.includes(updatedHero.id)) {
        updatedHero = {
          ...updatedHero,
          target: targetId,
          moveTo: targetUnit.position // Move toward the target
        }
      }
      
      return {
        ...prev,
        units: updatedUnits,
        playerHero: updatedHero
      }
    })
  }
  
  // Spawn footman
  const spawnFootman = () => {
    if (gameState.resources.gold < 50) return
    
    setGameState(prev => {
      const newFootmanId = `footman-${Date.now()}`
      const heroPosition = prev.playerHero?.position
      
      if (!heroPosition) return prev
      
      const newFootman: Unit = {
        id: newFootmanId,
        type: 'footman',
        position: { 
          x: heroPosition.x + (Math.random() * 40 - 20), 
          y: heroPosition.y + (Math.random() * 40 - 20) 
        },
        health: 100,
        maxHealth: 100,
        damage: 15,
        speed: 2,
        team: 'player',
        level: 1,
        selected: false
      }
      
      return {
        ...prev,
        units: [...prev.units, newFootman],
        resources: {
          ...prev.resources,
          gold: prev.resources.gold - 50
        }
      }
    })
  }
  
  // Pause/resume game
  const togglePause = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing'
    }))
  }
  
  // Reset game
  const resetGame = () => {
    setGameState(createInitialGameState())
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
      gameLoopRef.current = null
    }
    lastUpdateRef.current = 0
  }
  
  return {
    gameState,
    startGame,
    selectUnit,
    moveSelectedUnits,
    attackTarget,
    spawnFootman,
    togglePause,
    resetGame
  }
}





