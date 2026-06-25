# Tasks: Mejoras para Musiic Brothers Parte 2

**Feature**: Mejoras para Musiic Brothers Parte 2
**Spec**: specs/003-musiic-brothers-parte-2-mejoras/spec.md
**Plan**: specs/003-musiic-brothers-parte-2-mejoras/plan.md

## Phase 1: Setup

**Purpose**: Confirm the feature scope, asset conventions, and existing game systems before implementation.

- [ ] T001 [P] Review `specs/003-musiic-brothers-parte-2-mejoras/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/level-enhancements-contract.md`, and `quickstart.md` to confirm requirements and acceptance criteria.
- [ ] T002 [P] Inspect existing assets and systems in `assets/milly`, `assets/backgrounds/FondoGame`, `js/player.js`, `js/level.js`, `js/collectibles.js`, `js/npc.js`, and `js/dialogue.js`.
- [ ] T003 [P] Update `specs/003-musiic-brothers-parte-2-mejoras/contracts/level-enhancements-contract.md` and `specs/003-musiic-brothers-parte-2-mejoras/quickstart.md` to document the `Milly-<Accion><orden>` sprite naming, `FondoGame` background requirement, and minimum 15 platforms per level.

---

## Phase 2: Foundational

**Purpose**: Implement shared gameplay infrastructure required by all user stories.

- [ ] T004 [P] Implement sprite loading in `js/player.js` for Milly frames stored under `assets/milly` with the naming convention `Milly-<Accion><orden>`.
- [ ] T005 [P] Implement level rendering support in `js/level.js` to use `assets/backgrounds/FondoGame` as the base background and draw platforms on top.
- [ ] T006 [P] Add platform layout validation in `js/level.js` so each of the three Parte 2 levels contains at least 15 platforms before the portal.
- [ ] T007 [P] Add checkpoint state tracking and fragment collection support in `js/collectibles.js` and `js/level.js`, including visual feedback for activation and collection.
- [ ] T008 [P] Update `specs/003-musiic-brothers-parte-2-mejoras/data-model.md` to capture `Checkpoint`, `FragmentoTemporal`, and level background/platform requirements explicitly.

---

## Phase 3: User Story 1 - Controles y animaciones refinadas (Priority: P1)

**Goal**: Deliver responsive Milly controls and clear movement/attack animations.

**Independent Test**: Move Milly, jump, charge and fire the attack in Capítulo 1, verifying animation coherence and responsive controls.

- [ ] T009 [US1] Refine Milly ground and air movement control logic in `js/player.js` for smoother left/right movement and jump handling.
- [ ] T010 [US1] Implement or improve Milly attack charge and projectile animation in `js/player.js` using `assets/milly` frame sequences.
- [ ] T011 [US1] Implement Milly jump and landing animations in `js/player.js` so the character transitions cleanly between idle, run, jump, and attack states.
- [ ] T012 [US1] Validate Milly animation switching and input responsiveness in `js/player.js`, ensuring no gameplay begins before the player acts.

---

## Phase 4: User Story 2 - Mejora de la experiencia del Capítulo 2 (Priority: P1)

**Goal**: Make Capítulo 2 more immersive with clearer progression and temporal atmosphere.

**Independent Test**: Play Capítulo 2 and verify the environment uses `FondoGame`, platform progression is clear, and level goals are visually signposted.

- [ ] T013 [US2] Enhance Capítulo 2 level layout in `js/level.js` to render `assets/backgrounds/FondoGame` and place visible platforms that lead toward the portal.
- [ ] T014 [US2] Add objective guidance or signposting elements in `js/level.js` or `js/ui.js` to indicate the next milestone in Capítulo 2.
- [ ] T015 [US2] Validate the Capítulo 2 experience by confirming temporal visual cues, platform visibility, and a clean transition at the level exit.

---

## Phase 5: User Story 3 - Feedback visual y de progreso (Priority: P2)

**Goal**: Add collectible and checkpoint feedback so progression feels tangible and recoverable.

**Independent Test**: Collect a temporal fragment, activate a checkpoint, die, and confirm respawn at the last checkpoint.

- [ ] T016 [P] [US3] Implement visual and/or audio feedback for collecting a `FragmentoTemporal` in `js/collectibles.js` and the level HUD.
- [ ] T017 [US3] Implement checkpoint activation and restart behavior in `js/level.js` so the player respawns at the last reached checkpoint after death.
- [ ] T018 [US3] Add an on-screen indicator of collected fragments and active checkpoint state in `css/game.css` or `js/ui.js`.

---

## Phase 6: User Story 4 - Refinar NPC y diálogos (Priority: P3)

**Goal**: Make NPC interactions more immersive with medieval fantasy dialogues.

**Independent Test**: Interact with an NPC in Capítulo 1 or 2 and read dialogue that advances the narrative or provides a hint.

- [ ] T019 [US4] Implement NPC dialogue interaction logic in `js/npc.js` and `js/dialogue.js` for at least one NPC.
- [ ] T020 [US4] Create or update dialogue content in `specs/003-musiic-brothers-parte-2-mejoras/research.md` or dialogue data to use castellano de fantasía medieval.
- [ ] T021 [US4] Ensure dialogue closes cleanly and returns control to the player in `js/dialogue.js`, updating objectives when appropriate.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Refine visuals, gameplay feel, and documentation after the main improvements are implemented.

- [ ] T022 [P] Polish animations, platform art, and visual feedback across the three levels in `js/player.js`, `js/level.js`, and `css/game.css`.
- [ ] T023 [P] Update `specs/003-musiic-brothers-parte-2-mejoras/quickstart.md` with final validation steps for the improved levels, animations, checkpoints, and NPC dialogues.
- [ ] T024 [P] Test and fix responsive, visual, and interaction issues for the new backgrounds and `assets/milly` animations on desktop and mobile.
- [ ] T025 [P] Review and clean up `js/player.js`, `js/level.js`, `js/collectibles.js`, and `js/dialogue.js` to remove temporary debug behavior and ensure stable gameplay.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 Setup**: Can start immediately.
- **Phase 2 Foundational**: Depends on Phase 1 completion.
- **User Stories**: Depend on Phase 2 completion.
- **Polish**: Depends on all user stories being finished.

### User Story Dependencies
- **US1**: Can proceed after foundational Milly animation and control support exists.
- **US2**: Can proceed after foundational level background and platform rendering support exists.
- **US3**: Can proceed after foundational checkpoint and collectible state support exists.
- **US4**: Can proceed after foundational NPC/dialogue support is available.

### Parallel Opportunities
- Setup tasks `T001` and `T002` can run in parallel.
- Foundational tasks `T004` through `T008` can progress in parallel after Phase 1.
- Story-specific tasks within each user story can run in parallel when they update separate files.
- Polish tasks `T022` through `T025` can run in parallel after implementation.

## MVP Suggestion
- Deliver MVP by completing Phase 1, Phase 2, and Phase 3 first.
- Validate that Milly controls and animations are improved, the game uses `assets/backgrounds/FondoGame`, and each level has enough platforms.
- Then add progression feedback (US3) and NPC dialogue polish (US4).