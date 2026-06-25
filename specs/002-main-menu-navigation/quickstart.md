# Quickstart: Main Menu and Chapter Navigation

## Preview the feature
1. Open the repository in your browser or editor.
2. Open `Menu/menu.html` in a web browser.
3. Click the initial overlay message "Haz clic para continuar".
4. Use the `Jugar` button to start the story sequence.
5. After the story overlay completes, verify that the page transitions to `../musiicBrothers.html` (Chapter 1).
6. Open the `Créditos` button and verify that `Volver` returns to the main menu.
7. Verify that the additional placeholder options (`Continuar`, `Selección de capítulos`, `Opciones`, `Salir`) are visible and focusable.
8. Verify keyboard navigation with Arrow keys and Enter works for menu options.

## Manual validation checklist
- [ ] The menu appears on load and gameplay does not start immediately.
- [ ] The game title is visible and the `Jugar` button is present.
- [ ] Clicking `Jugar` hides the menu and shows the story overlay.
- [ ] The story overlay advances when clicked and eventually loads Chapter 1.
- [ ] Keyboard navigation moves focus between buttons and Enter activates the selected option.
- [ ] Placeholder buttons are visible and respond with a placeholder message when activated.
- [ ] The credits panel is accessible and returns cleanly to the main menu.

## Implementation notes
- The menu logic is implemented in `Menu/menuScript.js` and should keep gameplay paused until the player starts.
- Menu styling is defined in `Menu/menuStyles.css` and supports responsive display.
- Local assets are used for audio and visuals, with no external frameworks required.
- Verify the menu page under `file://` or on a static local server if audio autoplay restrictions apply.
