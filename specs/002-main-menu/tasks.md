# Tasks: Menú Principal - Musiic Brothers

**Input**: Design documents from `/specs/002-main-menu/`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create `menu-principal.html` with a medieval-tender welcome layout
- [ ] T002 Create `css/menu-principal.css` with styles for the main menu and credit screen
- [ ] T003 Create `js/menu-principal.js` to handle navigation and button interactions

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 [P] Confirm the correct game entry page URL for the `Jugar` button
- [ ] T005 [P] Define the credit screen structure and content in `menu-principal.html` or via script
- [ ] T006 [P] Add decorative background legend elements in `menu-principal.html` for humor and tone

---

## Phase 3: User Story 1 - Acceder al juego desde un menú encantador (Priority: P1)

**Goal**: Crear un menú funcional que permita iniciar el juego y acceder a los créditos desde una pantalla independiente.

**Independent Test**: Abrir `menu-principal.html`, hacer clic en `Jugar`, y verificar la redirección al inicio del juego.

- [ ] T007 [US1] Implement the `Jugar` button to redirect to `musiic-brothers-parte-2.html`
- [ ] T008 [US1] Implement the `Créditos` button to open the credits view
- [ ] T009 [US1] Add a prominent title `MusiiC Brothers` to `menu-principal.html`
- [ ] T010 [US1] Ensure the menu screen loads without server support and works locally in browser

---

## Phase 4: User Story 2 - Sentir el tono del juego desde el menú (Priority: P2)

**Goal**: Entregar un diseño con estética medieval y tierna, incluyendo leyendas humorísticas de fondo.

**Independent Test**: Verificar que el menú muestra título, botones, estilos suaves y las frases decorativas.

- [ ] T011 [US2] Style the menu with soft medieval visuals and readable buttons in `css/menu-principal.css`
- [ ] T012 [US2] Add background phrases such as *No pidió la misión. Le tocó.* in the menu layout
- [ ] T013 [US2] Add background phrases such as **Millynda Temporada Medieval** in the menu layout
- [ ] T014 [US2] Add background phrases such as **Milly, Caballera por Accidente** in the menu layout

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improve visual polish, accessibility, and ensure the menu is complete.

- [X] T015 Refine spacing and responsive layout for mobile and desktop in `css/menu-principal.css`
- [X] T016 [P] Validate the menu on multiple screen sizes and adjust if needed
- [X] T017 [P] Add hover/focus states for `Jugar` and `Créditos` buttons
- [X] T018 [P] Document the menu usage and navigation in `specs/002-main-menu/plan.md` or `quickstart.md`
