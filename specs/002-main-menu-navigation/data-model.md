# Data Model: Main Menu and Chapter Navigation

## Entities

### Menu
- `title`: string
- `options`: MenuItem[]
- `visible`: boolean
- `focusIndex`: integer
- `activeSection`: enum(`main`, `credits`, `story`)
- `audioState`: enum(`stopped`, `playing`, `paused`)
- `transitionTarget`: string

### MenuItem
- `id`: string
- `label`: string
- `action`: string
- `enabled`: boolean
- `visible`: boolean
- `focusable`: boolean

### StoryOverlay
- `visible`: boolean
- `currentTextIndex`: integer
- `storyTexts`: string[]
- `isTyping`: boolean
- `nextAction`: string

### GameEntryPoint
- `targetPage`: string
- `chapter`: string
- `requiresConfirmation`: boolean

## Relationships
- Menu contains multiple MenuItem objects.
- Menu controls StoryOverlay visibility during the transition from the menu to the first chapter.
- GameEntryPoint is derived from the selected MenuItem action and determines the target content page.

## State Transitions
- `menuVisible=true` → user clicks `play-button` → `menuVisible=false`, `StoryOverlay.visible=true`
- `storyOverlay.complete` → redirect to `../musiicBrothers.html`
- `menuVisible=true` + `creditsButton` click → `activeSection=credits`
- `backMenu` click → `activeSection=main`, `menuVisible=true`
- `focusIndex` changes with keyboard navigation events (Tab/Arrow keys)

## Validation Rules
- The main menu must be visible on page load and gameplay must not start until the player chooses to play.
- `play-button` must be enabled and trigger the story sequence.
- `credits-button` must open the credits overlay and `back-menu` must return to the main menu.
- Keyboard navigation must cycle through focusable menu options and activate the selected item with Enter.
- The menu must maintain the medieval fantasy visual style and use local assets for audio and graphics.
