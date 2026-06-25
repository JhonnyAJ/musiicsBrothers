# Tasks: Main Menu and Chapter Navigation

**Feature**: Main Menu and Chapter Navigation
**Spec**: specs/002-main-menu-navigation/spec.md
**Plan**: specs/002-main-menu-navigation/plan.md

## Phase 1: Setup

**Purpose**: Confirm feature scope and establish the existing menu implementation baseline.

- [X] T001 [P] Review `specs/002-main-menu-navigation/spec.md`, `plan.md`, `data-model.md`, `contracts/menu-interface.md`, and `quickstart.md` to confirm requirements and acceptance criteria.
- [X] T002 [P] Inspect the existing menu implementation in `Menu/menu.html`, `Menu/menuScript.js`, and `Menu/menuStyles.css` and record the current chapter launch flow.
- [X] T003 Create semantic menu markup in `Menu/menu.html` for the current buttons and future menu options, including the initial overlay, main menu container, and credits section.

---

## Phase 2: Foundational

**Purpose**: Establish shared menu behavior and accessibility infrastructure before story-specific work.

- [X] T004 [P] Refactor `Menu/menuScript.js` to centralize menu state and prevent gameplay from starting until the player chooses "Comenzar Aventura".
- [X] T005 [P] Implement story overlay transition logic in `Menu/menuScript.js` so the menu hides, the overlay displays, and Chapter 1 loads only after the story sequence completes.
- [X] T006 [P] Add keyboard focus and activation support for menu controls in `Menu/menuScript.js`, including Tab/Arrow navigation and Enter activation.
- [X] T007 [P] Update `Menu/menuStyles.css` to keep the menu centered, readable, and visually consistent across desktop and mobile screen sizes.
- [X] T008 [P] Finalize the interface contract in `specs/002-main-menu-navigation/contracts/menu-interface.md` and document the quickstart validation flow in `quickstart.md`.

---

## Phase 3: User Story 1 - Access Main Menu and Start Adventure (Priority: P1)

**Goal**: Display the main menu on load and start Chapter 1 only after the player selects "Comenzar Aventura".

**Independent Test**: Open `Menu/menu.html`, verify the menu appears, gameplay does not start automatically, and clicking `Jugar` begins the story sequence and eventually loads `../musiicBrothers.html`.

- [X] T009 [US1] Add the game title and the visible "Comenzar Aventura" button to `Menu/menu.html`.
- [X] T010 [US1] Implement the click handler in `Menu/menuScript.js` that hides the menu, shows `#story-overlay`, and starts the story text sequence.
- [X] T011 [US1] Ensure `Menu/menuScript.js` redirects to `../musiicBrothers.html` only after the story overlay completes.
- [X] T012 [US1] Verify `Menu/menuScript.js` does not activate any gameplay or chapter logic while the menu is visible and before user interaction.

---

## Phase 4: User Story 2 - Navigation and Accessibility (Priority: P2)

**Goal**: Make the menu navigable with keyboard and mouse while keeping the menu options visible and responsive.

**Independent Test**: Use keyboard Tab/Arrow and Enter to focus and activate the `Comenzar Aventura` button and verify mouse clicks also work correctly.

- [X] T013 [P] [US2] Implement keyboard navigation in `Menu/menuScript.js` for the main menu buttons, including Tab/Arrow focus movement.
- [X] T014 [P] [US2] Add focus styles and ARIA-friendly markup in `Menu/menu.html` and `Menu/menuStyles.css` so focused buttons are clearly visible.
- [X] T015 [US2] Confirm click and keyboard activation both work for the visible menu options and for the credits/back navigation flow.

---

## Phase 5: User Story 3 - Future Expansion Hooks (Priority: P3)

**Goal**: Make the menu architecture extensible so new options can be added without redesign.

**Independent Test**: Add a placeholder button in `Menu/menu.html` and verify it renders, receives focus, and can be activated using the existing menu controller.

- [X] T016 [P] [US3] Add placeholder markup for future menu items (Continuar, SelecciÃ³n de capÃ­tulos, Opciones, Salir) in `Menu/menu.html`.
- [X] T017 [P] [US3] Implement generic menu item registration and activation handling in `Menu/menuScript.js` to support additional buttons without redesign.
- [X] T018 [P] [US3] Document the extension points for new menu options in `specs/002-main-menu-navigation/contracts/menu-interface.md`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Refine the menu visual style, responsive layout, and documentation after the main functionality is complete.

- [X] T019 [P] Polish the medieval fantasy menu styling in `Menu/menuStyles.css`, including layout, typography, and background appearance.
- [X] T020 [P] Update `specs/002-main-menu-navigation/quickstart.md` with final validation steps after implementation.
- [X] T021 [P] Test and fix responsive layout issues in `Menu/menu.html` and `Menu/menuStyles.css` for non-primary screen sizes.
- [X] T022 [P] Clean up `Menu/menuScript.js`, remove unused code, and ensure audio playback begins only after the `initial-overlay` user interaction.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 Setup**: Can start immediately.
- **Phase 2 Foundational**: Depends on Phase 1 completion.
- **User Stories**: Depend on Phase 2 completion.
- **Polish**: Depends on all user stories being finished.

### User Story Dependencies
- **US1**: No other story dependency once foundational menu state support exists.
- **US2**: Can proceed after foundational keyboard and focus infrastructure is ready.
- **US3**: Can proceed after the generic menu architecture is in place.

### Parallel Opportunities
- Setup tasks `T001` and `T002` can run in parallel.
- Foundational tasks `T004` through `T008` can progress in parallel after Phase 1.
- Story-specific implementation tasks within the same story can be parallelized when they update separate files.
- Polish tasks `T019` through `T022` are all parallelizable once feature functionality is complete.

## MVP Suggestion
- Deliver MVP by completing Phase 1, Phase 2, and Phase 3 (User Story 1) first.
- Validate that the main menu appears, the game does not start automatically, and `Jugar` leads to Chapter 1.
- Then add accessibility and extensibility in Phase 4 and Phase 5.
