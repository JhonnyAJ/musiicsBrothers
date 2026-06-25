# Research Notes: Main Menu and Chapter Navigation

## Decision
- Active feature: `specs/002-main-menu-navigation`
- Implement the main menu using the existing `Menu/` user interface module and page flow.
- Preserve the static HTML/CSS/JS architecture and local asset usage.

## Rationale
- The repository already contains a dedicated menu entrypoint in `Menu/menu.html` with supporting logic in `Menu/menuScript.js` and styles in `Menu/menuStyles.css`.
- The feature requirements map directly to this existing component and can be realized without introducing new frameworks or backend services.
- Keyboard navigation support should be explicitly added to meet the feature specification.

## Alternatives considered
- Creating a separate menu page outside the existing `Menu/` folder: rejected because it duplicates working UI code and increases maintenance overhead.
- Routing menu navigation through `index.html`: rejected because the current menu flow is already defined in `Menu/menu.html` and includes the story transition to Chapter 1.

## Findings
- The current menu flow is implemented in `Menu/menuScript.js` and currently transitions to Chapter 1 using `window.location.href = '../musiicBrothers.html'` after the story overlay.
- The menu is already visually styled and includes background music, credits, and a story overlay.
- No unresolved technical clarifications remain for this feature; the specification and repository structure provide sufficient guidance.
