# Tasks: Musiic Brothers - Parte 2

**Input**: Design documents from `/specs/001-musiic-brothers-parte-2/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Crear la estructura de archivos y los módulos base para la Parte 2.

- [ ] T001 Create `musiic-brothers-parte-2.html` as the new feature entry page
- [ ] T002 Create `css/game.css` for shared Parte 2 gameplay styles
- [ ] T003 Create `css/dialogue.css` for NPC dialogue and narrative UI
- [ ] T004 Create `css/responsive.css` for responsive layout and mobile support
- [ ] T005 Create `js/main.js` to initialize the game and load core modules
- [ ] T006 [P] Create `js/input.js` for keyboard and touch controls
- [ ] T007 [P] Create `js/ui.js` for HUD, checkpoint indicators, portals and narrative messages
- [ ] T008 [P] Create `js/assets-loader.js` for local asset loading from `assets/`
- [ ] T009 [P] Organize local game assets under `assets/sprites/`, `assets/audio/` and `assets/backgrounds/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Sentar las bases de la lógica de juego, checkpoints y capítulos compartidos.

- [ ] T010 [P] Create `js/player.js` skeleton with Milly state, movement and physics hooks
- [ ] T011 [P] Create `js/attack.js` skeleton with charge, projectile creation and attack progression API
- [ ] T012 [P] Create `js/enemy.js` skeleton with basic enemy entity and boss placeholders
- [ ] T013 [P] Create `js/npc.js` skeleton with NPC entity, proximity trigger and interaction API
- [ ] T014 [P] Create `js/dialogue.js` skeleton with dialogue panel API and line progression
- [ ] T015 [P] Create `js/chapter.js` skeleton with chapter definitions, objectives and checkpoint APIs
- [ ] T016 [P] Create `js/collectibles.js` skeleton with fragment entity registration and pickup callbacks
- [ ] T017 [P] Wire `js/main.js` to initialize `js/input.js`, `js/player.js`, `js/attack.js`, `js/enemy.js`, `js/npc.js`, `js/dialogue.js`, `js/chapter.js`, `js/collectibles.js` and `js/ui.js`
- [ ] T018 [P] Add checkpoint system support in `js/chapter.js` and exposed status in `js/ui.js`

---

## Phase 3: User Story 1 - Dominar a Milly y su ataque mágico (Priority: P1) 🎯 MVP

**Goal**: Hacer jugable a Milly con movimientos fluidos y un ataque mágico cargado funcional.

**Independent Test**: Abrir Capítulo 1, mover a Milly, cargar energía y disparar un proyectil que golpee un enemigo o active un objeto.

- [ ] T019 [US1] Implement Milly movement, jump and gravity response in `js/player.js`
- [ ] T020 [P] [US1] Implement control mapping for movement, jump, charge and attack in `js/input.js`
- [ ] T021 [P] [US1] Implement energy charge, projectile spawn and basic hit detection in `js/attack.js`
- [ ] T022 [US1] Implement basic enemy damage and defeat behavior in `js/enemy.js`
- [ ] T023 [US1] Implement projectile-triggered object activation in `js/chapter.js`
- [ ] T024 [US1] Add Capítulo 1 layout and initial game wiring in `musiic-brothers-parte-2.html`
- [ ] T025 [P] [US1] Add charge meter and basic HUD display in `js/ui.js`
- [ ] T026 [P] [US1] Style Milly, projectile, enemy and HUD elements in `css/game.css`

---

## Phase 4: User Story 2 - Explorar el mundo medieval con NPC y diálogos (Priority: P1)

**Goal**: Incorporar NPCs interactivos y diálogos en castellano medieval comprensible.

**Independent Test**: Entrar en la Aldea Perdida, hablar con un NPC y ver un diálogo funcional que actualice objetivos.

- [ ] T027 [US2] Implement NPC interaction detection and talk trigger in `js/npc.js`
- [ ] T028 [US2] Implement dialogue panel rendering and line progression in `js/dialogue.js`
- [ ] T029 [US2] Add dialogue container and interaction prompt to `musiic-brothers-parte-2.html`
- [ ] T030 [US2] Define NPC dialogue scripts for Aldea Perdida and Bosque de los Ecos in `js/chapter.js`
- [ ] T031 [US2] Update `js/chapter.js` to advance objectives and reveal story clues after dialogue
- [ ] T032 [P] [US2] Style dialogue windows and medieval text presentation in `css/dialogue.css`
- [ ] T033 [P] [US2] Ensure NPC dialogue uses understandable medieval fantasy Spanish in narrative copy files

---

## Phase 5: User Story 3 - Completar los tres capítulos de la narrativa de viaje temporal (Priority: P2)

**Goal**: Construir la progresión de Capítulo 1, Capítulo 2 y Capítulo 3 con narrativa clara y un jefe final.

**Independent Test**: Jugar los tres capítulos hasta su cierre y verificar la progresión de historia, checkpoints y el jefe final.

- [ ] T034 [US3] Implement chapter definitions for Aldea Perdida, Bosque de los Ecos and Torre del Tiempo in `js/chapter.js`
- [ ] T035 [US3] Implement chapter completion conditions, checkpoints and transition handling in `js/chapter.js`
- [ ] T036 [US3] Implement narrative reveal events for Torre del Tiempo and time-period discovery in `js/chapter.js`
- [ ] T037 [US3] Implement Capítulo 3 final boss that serves Rey Monster in `js/enemy.js`
- [ ] T038 [US3] Implement attack progression through chapters in `js/attack.js` with chapter-based enhancements
- [ ] T039 [US3] Implement chapter-end portal activation, final sequence cues and milestone messages in `js/ui.js`
- [ ] T040 [US3] Add chapter transition overlay and narrative messages in `musiic-brothers-parte-2.html`
- [ ] T041 [P] [US3] Ensure Rey Monster is presented as the distant threat and not a direct Part 2 fight in narrative text

---

## Phase 6: User Story 4 - Recolectar fragmentos temporales ocultos (Priority: P3)

**Goal**: Añadir fragmentos temporales como coleccionables explorables con seguimiento en la UI.

**Independent Test**: Encontrar un fragmento oculto y verificar que se registra en el contador de colección.

- [ ] T042 [US4] Implement temporal fragment entities and pickup detection in `js/collectibles.js`
- [ ] T043 [P] [US4] Add fragment count display and collection feedback in `js/ui.js`
- [ ] T044 [US4] Place hidden fragments in chapter definitions in `js/chapter.js`
- [ ] T045 [US4] Add collection effect styling for fragments in `css/game.css`
- [ ] T046 [US4] Persist fragment collection state during the current session in `js/collectibles.js`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Pulir la experiencia completa, asegurar responsividad y cerrar el feature con validación.

- [ ] T047 [P] Refactor shared game wiring and remove duplication in `js/main.js`
- [ ] T048 [P] Ensure responsive layout and mobile-friendly behavior in `css/responsive.css`
- [ ] T049 [ ] Playtest Capítulo 1, Capítulo 2 and Capítulo 3 in browser and verify story progression
- [ ] T050 [ ] Validate NPC dialogues, checkpoint behavior, attack progression and boss combat across all chapters
- [ ] T051 [ ] Validate collectible fragment behavior and session progress display
- [ ] T052 [ ] Update `specs/001-musiic-brothers-parte-2/plan.md` with implementation notes, actual file paths and any architectural changes

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: can begin immediately and prepares file structure
- **Foundational (Phase 2)**: depends on Setup completion
- **User Stories (Phase 3-6)**: depend on Foundational completion
- **Polish (Phase 7)**: depends on all story phases being implemented

### Story Dependencies
- **User Story 1 (P1)**: independent once foundational modules exist
- **User Story 2 (P1)**: independent after foundational work and can run in parallel with US1
- **User Story 3 (P2)**: independent after foundational work and can run in parallel with US1/US2
- **User Story 4 (P3)**: independent after foundational work and can run in parallel with earlier stories

### Parallel Opportunities
- `js/input.js`, `js/ui.js`, `js/assets-loader.js` and asset organization can be built in parallel during Phase 1
- Foundation module scaffolding can occur in parallel for `js/player.js`, `js/attack.js`, `js/enemy.js`, `js/npc.js`, `js/dialogue.js`, `js/chapter.js`, `js/collectibles.js`
- User stories can proceed in parallel after foundation completion
- UI styling and responsive polish can be done in parallel with final validation

### Implementation Strategy
- MVP first: finish Phase 1, Phase 2, and Phase 3 to validate the core Milly gameplay
- Incremental delivery: add NPC/dialogue, chapter progression, boss fight and collectibles in distinct increments
- Validate each story independently before moving to the next priority
