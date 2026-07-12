# Tasks: Musiic Brothers - Parte 2

**Input**: Design documents from `/specs/001-musiic-brothers-parte-2/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Crear la estructura de archivos y los módulos base para la Parte 2.

- [X] T001 Create `musiic-brothers-parte-2.html` as the new feature entry page
- [X] T002 Create `css/game.css` for shared Parte 2 gameplay styles
- [X] T003 Create `css/dialogue.css` for NPC dialogue and narrative UI
- [X] T004 Create `css/responsive.css` for responsive layout and mobile support
- [X] T005 Create `js/main.js` to initialize the game and load core modules
- [X] T006 [P] Create `js/input.js` for keyboard and touch controls
- [X] T007 [P] Create `js/ui.js` for HUD, checkpoint indicators, portals and narrative messages
- [X] T008 [P] Create `js/assets-loader.js` for local asset loading from `assets/`
- [X] T009 [P] Organize local game assets under `assets/sprites/`, `assets/audio/` and `assets/backgrounds/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Sentar las bases de la lógica de juego, checkpoints y capítulos compartidos.

- [X] T010 [P] Create `js/player.js` skeleton with Milly state, movement and physics hooks
- [X] T011 [P] Create `js/attack.js` skeleton with charge, projectile creation and attack progression API
- [X] T012 [P] Create `js/enemy.js` skeleton with basic enemy entity and boss placeholders
- [X] T013 [P] Create `js/npc.js` skeleton with NPC entity, proximity trigger and interaction API
- [X] T014 [P] Create `js/dialogue.js` skeleton with dialogue panel API and line progression
- [X] T015 [P] Create `js/chapter.js` skeleton with chapter definitions, objectives and checkpoint APIs
- [X] T016 [P] Create `js/collectibles.js` skeleton with fragment entity registration and pickup callbacks
- [X] T017 [P] Wire `js/main.js` to initialize `js/input.js`, `js/player.js`, `js/attack.js`, `js/enemy.js`, `js/npc.js`, `js/dialogue.js`, `js/chapter.js`, `js/collectibles.js` and `js/ui.js`
- [X] T018 [P] Add checkpoint system support in `js/chapter.js` and exposed status in `js/ui.js`

---

## Phase 3: User Story 1 - Dominar a Milly y su ataque mágico (Priority: P1) 🎯 MVP

**Goal**: Hacer jugable a Milly con movimientos fluidos y un ataque mágico cargado funcional.

**Independent Test**: Abrir Capítulo 1, mover a Milly, cargar energía y disparar un proyectil que golpee un enemigo o active un objeto.

- [X] T019 [US1] Implement Milly movement, jump and gravity response in `js/player.js`
- [X] T020 [P] [US1] Implement control mapping for movement, jump, charge and attack in `js/input.js`
- [X] T021 [P] [US1] Implement energy charge, projectile spawn and basic hit detection in `js/attack.js`
- [X] T022 [US1] Implement basic enemy damage and defeat behavior in `js/enemy.js`
- [X] T023 [US1] Implement projectile-triggered object activation in `js/chapter.js`
- [X] T024 [US1] Add Capítulo 1 layout and initial game wiring in `musiic-brothers-parte-2.html`
- [x] T024a [US1] Definir la geometría de los tres niveles de la Parte 2 usando `assets/backgrounds/FondoGame` como fondo base y colocar al menos 15 plataformas por capítulo hasta el portal de pase de nivel.
- [x] T024b [US1] Dibujar las plataformas sobre el fondo de cada capítulo de la Parte 2 y asegurar que Milly pueda saltar sobre ellas para completar la ruta de avance.
- [x] T024c [US1] Implementar la lógica de colisión con plataformas y la activación del portal cuando el jugador alcanza el final del nivel de la Parte 2.
- [x] T024d [US1] Ajustar la distribución del escenario para que ocupe toda la pantalla desde abajo y las plataformas queden más separadas y repartidas por todo el mapa.
- [x] T024e [US1] Rediseñar visualmente las plataformas con una estética medieval de tierra y césped, con parte inferior marrón y parte superior verde.
 - [x] T024f [US1] Usar `assets/backgrounds/plataforma.png` como imagen única para todas las plataformas y ajustar CSS para renderizado.
 - [x] T024g [US1] Reacomodar enemigos, portal y NPCs para coincidir con la nueva distribución de plataformas.
- [X] T025 [P] [US1] Add charge meter and basic HUD display in `js/ui.js`
- [X] T026 [P] [US1] Style Milly, projectile, enemy and HUD elements in `css/game.css`
- [X] T026a [US1] Add Milly sprite asset loading for `assets/sprites/milly/Milly-Run1.png`, `Milly-Run2.png`, `Milly-Run3.png`, `Milly-Stop.png`, `Milly-Jump1.png`, `Milly-Jump2.png`, `Milly-Inactiva.png`, `Milly-posePoderosa.png` and `Milly-fuya.png` in `js/assets-loader.js` or the player bootstrap path
- [X] T026b [US1] Implement Milly animation state logic in `js/player.js` for run, idle, jump, inactive, charge and attack states using the sprite set above
- [X] T026c [US1] Render Milly with the active sprite frame in `js/ui.js` or the player render path while preserving the current 32x48 px hitbox and world positioning
- [X] T026d [US1] Synchronize Milly sprite changes with movement, jump, inactivity timeout, charging and projectile launch so the animation feels responsive
---

## Phase 4: User Story 2 - Explorar el mundo medieval con NPC y diálogos (Priority: P1)

**Goal**: Incorporar NPCs interactivos y diálogos en castellano medieval comprensible.

**Independent Test**: Entrar en la Aldea Perdida, hablar con un NPC y ver un diálogo funcional que actualice objetivos.

- [X] T027 [US2] Implement NPC interaction detection and talk trigger in `js/npc.js`
- [X] T028 [US2] Implement dialogue panel rendering and line progression in `js/dialogue.js`
- [X] T029 [US2] Add dialogue container and interaction prompt to `musiic-brothers-parte-2.html`
- [X] T030 [US2] Define NPC dialogue scripts for Aldea Perdida and Bosque de los Ecos in `js/chapter.js`
- [X] T031 [US2] Update `js/chapter.js` to advance objectives and reveal story clues after dialogue
- [X] T032 [P] [US2] Style dialogue windows and medieval text presentation in `css/dialogue.css`
- [X] T033 [P] [US2] Ensure NPC dialogue uses understandable medieval fantasy Spanish in narrative copy files

---

## Phase 5: User Story 3 - Completar los tres capítulos de la narrativa de viaje temporal (Priority: P2)

**Goal**: Construir la progresión de Capítulo 1, Capítulo 2 y Capítulo 3 con narrativa clara y un jefe final.

**Independent Test**: Jugar los tres capítulos hasta su cierre y verificar la progresión de historia, checkpoints y el jefe final.

- [X] T034 [US3] Implement chapter definitions for Aldea Perdida, Bosque de los Ecos and Torre del Tiempo in `js/chapter.js`
- [X] T035 [US3] Implement chapter completion conditions, checkpoints and transition handling in `js/chapter.js`
- [X] T036 [US3] Implement narrative reveal events for Torre del Tiempo and time-period discovery in `js/chapter.js`
- [X] T037 [US3] Implement Capítulo 3 final boss that serves Rey Monster in `js/enemy.js`
- [X] T038 [US3] Implement attack progression through chapters in `js/attack.js` with chapter-based enhancements
- [X] T039 [US3] Implement chapter-end portal activation, final sequence cues and milestone messages in `js/ui.js`
- [X] T040 [US3] Add chapter transition overlay and narrative messages in `musiic-brothers-parte-2.html`
- [X] T041 [P] [US3] Ensure Rey Monster is presented as the distant threat and not a direct Part 2 fight in narrative text

---

## Phase 6: User Story 4 - Recolectar fragmentos temporales ocultos (Priority: P3)

**Goal**: Añadir fragmentos temporales como coleccionables explorables con seguimiento en la UI.

**Independent Test**: Encontrar un fragmento oculto y verificar que se registra en el contador de colección.

 - [X] T042 [US4] Implement temporal fragment entities and pickup detection in `js/collectibles.js`
 - [X] T043 [P] [US4] Add fragment count display and collection feedback in `js/ui.js`
 - [X] T044 [US4] Place hidden fragments in chapter definitions in `js/chapter.js`
 - [X] T045 [US4] Add collection effect styling for fragments in `css/game.css`
 - [X] T046 [US4] Persist fragment collection state during the current session in `js/collectibles.js`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Pulir la experiencia completa, asegurar responsividad y cerrar el feature con validación.

 - [X] T047 [P] Refactor shared game wiring and remove duplication in `js/main.js`
 - [X] T048 [P] Ensure responsive layout and mobile-friendly behavior in `css/responsive.css`
 - [X] T049 [X] Playtest Capítulo 1, Capítulo 2 and Capítulo 3 in browser and verify story progression
 - [X] T050 [X] Validate NPC dialogues, checkpoint behavior, attack progression and boss combat across all chapters
 - [X] T051 [X] Validate collectible fragment behavior and session progress display
- [x] T052 [P] Validar que cada capítulo de la Parte 2 use el fondo `assets/backgrounds/FondoGame`, contenga al menos 15 plataformas, ocupe toda la pantalla desde abajo y permita llegar al portal de pase de nivel.
- [X] T053 [X] Update `specs/001-musiic-brothers-parte-2/plan.md` with implementation notes, actual file paths and any architectural changes

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
