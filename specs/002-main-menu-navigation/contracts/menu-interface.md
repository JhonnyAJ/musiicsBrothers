# Menu Interface Contract

## Purpose
Describe the expected contract between the main menu UI and the game launch flow for `specs/002-main-menu-navigation`.

## DOM Contract
- `button#play-button`: starts the adventure and triggers the story transition.
- `button#continue-button`: placeholder for the "Continuar" action.
- `button#chapters-button`: placeholder for chapter selection.
- `button#options-button`: placeholder for game options.
- `button#exit-button`: placeholder for exit flow.
- `button#credits-button`: opens the credits section.
- `button#back-menu`: returns from credits to the main menu.
- `div#initial-overlay`: user interaction gate for audio playback and menu readiness.
- `div#story-overlay`: story text overlay shown after starting the adventure.
- `audio#background-music`: background music element for the menu.

## Action Contract
- `play-button` click:
  - hides `#menu-main`
  - starts the story overlay sequence in `#story-overlay`
  - after story completion, redirects to `../musiicBrothers.html`
- `continue-button` click: shows a placeholder notification indicating the feature is coming soon.
- `chapters-button` click: shows a placeholder notification indicating chapter selection is coming soon.
- `options-button` click: shows a placeholder notification indicating options are coming soon.
- `exit-button` click: shows a placeholder notification indicating exit is coming soon.
- `credits-button` click: opens `#credits-overlay` and hides the main menu.
- `back-menu` click: closes `#credits-overlay` and restores the main menu.

## Keyboard Contract
- The menu must support focus traversal across the menu buttons.
- Arrow keys must move focus between the action buttons.
- Enter and Space must activate the focused button.
- Escape must close the credits dialog if it is open.

## Audio Contract
- `audio#background-music` is preloaded and ready to play.
- Playback begins only after a valid user interaction with `#initial-overlay`.
- The audio element remains in sync with the UI state and does not block menu use.

## Navigation Contract
- The menu loads first and prevents gameplay until the player begins.
- After the story overlay completes, the game must navigate to `../musiicBrothers.html`.
- Placeholder buttons must be rendered and focusable to prove the architecture is extensible.

## Extension Points
- New menu options can be added as buttons inside `.menu-options` with a `data-action` value.
- The menu controller in `Menu/menuScript.js` maps actions to handlers via `menuActions`.
- Future actions may be implemented by adding a new handler function and mapping it in `menuActions`.
