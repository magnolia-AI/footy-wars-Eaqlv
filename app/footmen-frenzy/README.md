# Footmen Frenzy

A web-based recreation of the classic Warcraft III custom map "Footmen Frenzy" (also known as "Footman's Friends" or "Footies").

## Game Overview

Footmen Frenzy is a fast-paced hero-versus-unit RTS game where players control a powerful hero and command armies of footmen against enemy forces. The objective is to level up your hero by defeating enemy units while managing your army of disposable footmen.

## Features Implemented

### Core Gameplay
- Hero selection with different classes (Tank, Ranged, Utility, DPS)
- Unit management system for footmen
- Resource collection (gold and lumber)
- Real-time combat mechanics
- Level progression system

### Hero Classes
1. **Mountain King (Tank)**
   - High health and durability
   - Area damage abilities
   - Strong in close combat

2. **Fire Lord (Ranged)**
   - High damage output
   - AoE (Area of Effect) abilities
   - Strong against groups

3. **Dark Ranger (Utility)**
   - Support abilities
   - Crowd control powers
   - Versatile gameplay

4. **Shadow Hunter (DPS)**
   - High single-target damage
   - Mobility abilities
   - Specialized combat skills

### Unit System
- **Footmen**: Basic melee units that follow your hero
- **Archers**: Ranged support units (planned)
- **Knights**: Heavy cavalry units (planned)
- **Enemies**: AI-controlled opposing forces

### Resource Management
- Gold generation over time
- Lumber collection (planned)
- Unit spawning costs
- Item purchase system (planned)

## Technical Implementation

### Frontend
- Built with Next.js 15 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn/UI components for UI elements
- Canvas-based rendering for game entities

### Game Engine
- Custom game loop using requestAnimationFrame
- Entity component system for units
- State management with React hooks
- Collision detection (planned)
- Pathfinding algorithms (planned)

## Game Controls

### Unit Selection
- Click on units to select them
- Drag to select multiple units
- Shift-click for additive selection

### Unit Commands
- **Move**: Right-click to move selected units
- **Attack**: Right-click on enemy units to attack
- **Hold Position**: Units will not move but will attack
- **Stop**: Halt all unit actions

### Hero Abilities
- Ability buttons for special powers
- Mana management system
- Cooldown timers (planned)

## Future Enhancements

### Planned Features
1. **Multiplayer Support**
   - LAN and online multiplayer
   - Matchmaking system
   - Spectator mode

2. **Advanced AI**
   - Improved enemy behavior
   - Strategic decision making
   - Difficulty levels

3. **Item System**
   - Equipment and artifacts
   - Shop interface
   - Item combinations

4. **Map Variety**
   - Multiple battlegrounds
   - Environmental hazards
   - Destructible terrain

5. **Game Modes**
   - All Random (AR)
   - Hero Pick with draft
   - Custom game options
   - Tournament mode

### Technical Improvements
1. **Performance Optimization**
   - Web Workers for game logic
   - Efficient rendering techniques
   - Asset compression

2. **Modding Support**
   - Custom hero creation
   - Map editor tools
   - Community content sharing

3. **Mobile Compatibility**
   - Touch controls
   - Responsive design
   - Performance tuning

## Architecture

### Component Structure
```
/components/footmen-frenzy/
├── game-engine.tsx     # Core game logic
├── game-board.tsx      # Visual game board
├── unit-renderer.tsx   # Unit visualization
├── hero-panel.tsx      # Hero information panel
├── army-panel.tsx      # Army management panel
└── command-panel.tsx   # Unit command interface
```

### State Management
- Game state managed with React hooks
- Entity system for units and items
- Event-driven architecture
- Predictive networking for multiplayer

## Contributing

This project is built with modern web technologies and follows best practices for:
- TypeScript type safety
- Component-based architecture
- Responsive design
- Performance optimization

To contribute:
1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Submit a pull request

## License

This is a recreation of a classic custom map for educational and entertainment purposes. Warcraft III is a trademark of Blizzard Entertainment.
