# Level Enhancements Contract

## Purpose
Document the contract for level presentation, Milly animation assets, and progression rules in `specs/003-musiic-brothers-parte-2-mejoras`.

## Level Asset Contract
- `assets/backgrounds/FondoGame` MUST be used as the base visual background for each Parte 2 level.
- Platforms MUST be rendered on top of the background image, not replace it.
- Each level MUST include at least 15 platforms that form a playable path to the level portal.
- The portal MUST be reachable by platforms placed within the level geometry.

## Milly Animation Contract
- Player sprite frames MUST be stored in `assets/milly`.
- Files MUST follow the naming convention `Milly-<Accion><orden>.png`.
- Supported animation actions include at least: `idle`, `run`, `jump`, `charge`, `attack`.
- The runtime MUST be able to load and switch frames by action and sequence order.

## Checkpoint & Progression Contract
- Each level MUST provide at least one checkpoint object.
- Checkpoints MUST restore Milly to the last reached position after death or restart.
- Fragmentos temporales MUST provide visible feedback when collected.

## NPC Dialogue Contract
- NPC interactions MUST display dialogue in castellano de fantasía medieval.
- Each NPC dialogue MUST advance the narrative or provide a playable hint.
- Dialogue UI MUST remain unobtrusive and return control cleanly after completion.

## Extension Points
- New level variants may reuse `assets/backgrounds/FondoGame` with different platform layouts.
- New Milly actions may be added by introducing files in `assets/milly` using the same naming pattern.
- Additional narrative content may be added by extending the `NPC Dialogue Contract` and dialogue data structures.
