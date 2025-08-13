# Footmen Frenzy Web Implementation

## Project Overview

This project is a web-based recreation of the classic Warcraft III custom map "Footmen Frenzy" (also known as "Footman's Friends" or "Footies"). It captures the core gameplay mechanics of the original game while leveraging modern web technologies for cross-platform play.

## Features Implemented

### Core Gameplay
- Hero selection with 4 distinct classes (Tank, Ranged, Utility, DPS)
- Unit management system for footmen armies
- Resource collection (gold and lumber)
- Real-time combat mechanics
- Level progression system
- Pause/resume functionality

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

### Technical Implementation
- Built with Next.js 15 App Router
- TypeScript for type safety
- Tailwind CSS for responsive styling
- Shadcn/UI components for UI elements
- Custom game engine using React hooks
- Component-based architecture

## Project Structure

```
/components/footmen-frenzy/
├── game-engine.tsx        # Core game logic and state management
├── game-board.tsx         # Visual game board rendering
├── unit-info-panel.tsx    # Unit information display
└── game.module.css        # Additional game-specific styles

/app/
├── page.tsx               # Main landing page
├── layout.tsx             # Root layout with navigation
├── footmen-frenzy/
│   ├── page.tsx           # Main game page
│   └── README.md          # Game documentation
└── docs/
    └── page.tsx           # Technical documentation
```

## Game Mechanics

### Unit System
- **Heroes**: Player-controlled powerful units with unique abilities
- **Footmen**: Basic melee units that follow heroes
- **Enemies**: AI-controlled opposing forces
- **Selection**: Click to select units, shift-click for multiple selection

### Resource Management
- Gold generation over time
- Lumber collection (planned)
- Unit spawning costs
- Item purchase system (planned)

### Combat System
- Real-time unit movement
- Health and damage mechanics
- Experience and leveling
- Ability cooldowns (planned)

## Technical Architecture

### Game Engine
The game engine is implemented as a custom React hook (`useGameEngine`) that manages:
- Game state (units, resources, time)
- Game loop using `requestAnimationFrame`
- Unit behaviors and AI
- Player interactions and commands

### State Management
- React hooks for local state management
- Immutable state updates for predictable behavior
- Efficient re-rendering with proper component structure

### Rendering
- CSS-based rendering for game entities
- Responsive design for different screen sizes
- Visual feedback for selections and interactions

## Future Enhancements

### Gameplay Features
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

## How to Run

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Open your browser to `http://localhost:3000`

## Contributing

This project welcomes contributions! Areas for improvement include:
- Expanding the hero roster
- Implementing additional unit types
- Adding more game modes
- Improving the AI behavior
- Enhancing the visual design

## License

This is a recreation of a classic custom map for educational and entertainment purposes. Warcraft III is a trademark of Blizzard Entertainment.
