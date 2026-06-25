# Data Model: Mejoras para Musiic Brothers Parte 2

## Entities

### Milly
- `id`: string
- `name`: string
- `position`: { x: number, y: number }
- `velocity`: { x: number, y: number }
- `state`: enum(`idle`, `running`, `jumping`, `attacking`, `charging`)
- `animationFrame`: number
- `animationAction`: string
- `currentLevel`: string
- `health`: number
- `energy`: number

### Level
- `id`: string
- `name`: string
- `background`: string (`assets/backgrounds/FondoGame`)
- `platforms`: Platform[]
- `checkpoints`: Checkpoint[]
- `fragments`: FragmentoTemporal[]
- `npcs`: NPC[]
- `portalPosition`: { x: number, y: number }

### Platform
- `id`: string
- `x`: number
- `y`: number
- `width`: number
- `height`: number
- `type`: enum(`solid`, `moving`, `breakable`, `launch`)
- `isVisible`: boolean

### Checkpoint
- `id`: string
- `x`: number
- `y`: number
- `activated`: boolean
- `visualCue`: string

### FragmentoTemporal
- `id`: string
- `x`: number
- `y`: number
- `collected`: boolean
- `effect`: string

### NPC
- `id`: string
- `name`: string
- `position`: { x: number, y: number }
- `dialogueId`: string
- `interactionTrigger`: string

### Dialogue
- `id`: string
- `npcId`: string
- `lines`: string[]
- `postInteractionAction`: string

## Relationships
- `Level.platforms` contiene al menos 15 `Platform` antes de `portalPosition`.
- `Level.checkpoints` captura el progreso del jugador en el nivel.
- `Level.fragments` representa los coleccionables de progreso exploratorio.
- `Level.npcs` conecta los personajes con su `Dialogue`.
- `Milly.currentLevel` determina el nivel activo y la respuesta de animación.

## Validation rules
- Cada `Level` MUST usar `background = assets/backgrounds/FondoGame`.
- Cada `Level` MUST tener `platforms.length >= 15` para el recorrido al portal.
- Milly MUST cargar animaciones de `assets/milly` con naming `Milly-<Accion><orden>`.
- `Checkpoint.activated = true` debe persistir en la sesión actual hasta muerte o reinicio.
