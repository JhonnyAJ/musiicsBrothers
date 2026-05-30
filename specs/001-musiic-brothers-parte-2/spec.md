# Feature Specification: Musiic Brothers - Parte 2

**Feature Branch**: `001-musiic-brothers-parte-2`

**Created**: 2026-05-26

**Status**: Draft

**Input**: User description: "Segunda parte de Musiic Brothers centrada en Milly, con ambientación medieval, combate mágico, NPC, diálogos y tres capítulos conectados por una narrativa de viajes temporales."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dominar a Milly y su ataque mágico (Priority: P1)

Milly es la protagonista principal y el jugador debe aprender a controlar su habilidad mágica de energía para avanzar.

**Why this priority**: la experiencia central de esta aventura depende de que Milly sea jugable, que su ataque funcione y que el combate se sienta natural.

**Independent Test**: abrir el nivel inicial, usar los controles de Milly para moverse, cargar energía y disparar un proyectil mágico que impacte a un enemigo o active un objeto del escenario.

**Acceptance Scenarios**:

1. **Given** que el jugador inicia el Capítulo 1, **When** controla a Milly, **Then** Milly puede caminar, saltar y moverse con fluidez.
2. **Given** que el jugador carga energía, **When** ejecuta el ataque, **Then** aparece un proyectil mágico que puede derrotar enemigos básicos.
3. **Given** que el proyectil se lanza, **When** impacta un objeto especial del escenario, **Then** ese objeto reacciona (por ejemplo, se activa una palanca o desbloquea un pasaje).

---

### User Story 2 - Explorar el mundo medieval con NPC y diálogos (Priority: P1)

El jugador debe explorar entornos medievales, encontrar NPCs y leer diálogos que añadan contexto a la historia.

**Why this priority**: la inmersión narrativa y la ambientación medieval dependen de interacciones con personajes y textos.

**Independent Test**: el jugador entra en una aldea o bosque, habla con un NPC y observa los diálogos con estilo de fantasía medieval comprensible.

**Acceptance Scenarios**:

1. **Given** que Milly llega a la Aldea Perdida, **When** interactúa con un aldeano, **Then** aparece un diálogo en castellano medieval comprensible.
2. **Given** que un NPC entrega una pista, **When** el jugador finaliza el diálogo, **Then** se actualiza el objetivo o se revela una ubicación importante.

---

### User Story 3 - Completar los tres capítulos de la narrativa de viaje temporal (Priority: P2)

El jugador debe avanzar por los tres capítulos conectados y comprender que las Monsters manipulan el tiempo.

**Why this priority**: la historia de la Parte 2 se apoya en la progresión de capítulos, no solo en el combate o la exploración aislada.

**Independent Test**: jugar cada capítulo hasta su conclusión y confirmar que se muestran los resultados esperados y el cierre narrativo de la fase.

**Acceptance Scenarios**:

1. **Given** que el jugador completa el Capítulo 1, **When** alcanza el final, **Then** se revela la existencia de la Torre del Tiempo.
2. **Given** que el jugador completa el Capítulo 2, **When** llega al final del bosque, **Then** obtiene acceso a la Torre del Tiempo.
3. **Given** que el jugador comienza el Capítulo 3, **When** alcanza una ubicación clave en la Torre del Tiempo, **Then** descubre que está en otro período de tiempo.
4. **Given** que el jugador completa el Capítulo 3, **When** derrota el jefe final, **Then** descubre que Millyo sigue con vida y se abre un nuevo portal.

---

### User Story 4 - Recolectar fragmentos temporales ocultos (Priority: P3)

El jugador debe encontrar fragmentos temporales escondidos en el mundo para reforzar la exploración.

**Why this priority**: los coleccionables añaden valor a la exploración sin alterar la mecánica central de juego.

**Independent Test**: encontrar un fragmento oculto y verificar que se registra como recolectado en la UI o en el avance.

**Acceptance Scenarios**:

1. **Given** un fragmento temporal oculto en el nivel, **When** Milly lo toca, **Then** el fragmento desaparece y se actualiza la colección.

---

### Edge Cases

- Qué ocurre cuando Milly dispara sin haber cargado energía.
- Cómo responde el juego si el jugador interactúa rápidamente con múltiples NPCs.
- Qué pasa si un proyectil mágico no encuentra objetivo y atraviesa el escenario.
- Cómo manejar la transición si el jugador reinicia un capítulo tras perder.

## Narrative Structure

### Chapter 1 - The Lost Village
- Milly llega a una aldea medieval perdida y aprende las mecánicas básicas de movimiento, salto, carga de energía y ataque mágico.
- El capítulo introduce al primer NPC y ofrece la primera pista sobre la manipulación temporal.
- El capítulo finaliza con la revelación de que existe una Torre del Tiempo en el horizonte.

### Chapter 2 - Forest of Echoes
- Milly explora el Bosque de los Ecos, un lugar donde se perciben fragmentos de otro tiempo y la percepción se distorsiona.
- Los NPCs y el entorno amplían la atmósfera medieval fantástica y las pistas sobre el viaje temporal.
- El ataque mágico de Milly progresa con un nuevo efecto o interacción que demuestra su evolución.
- El capítulo concluye con el acceso a la Torre del Tiempo.

### Chapter 3 - Time Tower
- Milly asciende la Torre del Tiempo y se enfrenta a un jefe final que sirve a Rey Monster.
- Ella descubre que está en otro período de tiempo y que la amenaza de Rey Monster opera desde la distancia.
- El capítulo termina con la activación de un portal y la revelación de que Millyo sigue vivo.

> Nota: Rey Monster se menciona como la fuerza detrás de los eventos, pero no se le combate directamente en la Parte 2.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir controlar a Milly como protagonista principal con movimiento básico y salto.
- **FR-002**: El sistema MUST permitir cargar la habilidad "Golpe de Energía" con un gesto o botón específico.
- **FR-003**: El sistema MUST lanzar un proyectil mágico desde el pecho de Milly tras cargar energía.
- **FR-004**: El ataque mágico MUST derrotar enemigos básicos y activar elementos especiales del escenario.
- **FR-005**: El sistema MUST incluir diálogos interactivos con NPC utilizando un castellano de fantasía medieval comprensible.
- **FR-006**: El juego MUST incluir al menos tres capítulos jugables con objetivos claros y resultados narrativos definidos.
- **FR-007**: El sistema MUST introducir NPC interactivos en el Capítulo 1 y permitir al menos una conversación significativa en cada capítulo.
- **FR-008**: El juego MUST incluir coleccionables de "Fragmentos Temporales" que recompensen la exploración.
- **FR-009**: El sistema MUST implementar un sistema de puntos de control en los capítulos para que el jugador pueda reiniciar desde puntos anteriores tras perder.
- **FR-010**: El sistema MUST presentar una progresión del ataque mágico de Milly a lo largo de los tres capítulos, con mejoras observables en efecto, alcance o interacción.
- **FR-011**: El sistema MUST mostrar claramente que Milly descubre estar en otro período de tiempo durante la progresión de la historia.
- **FR-012**: El juego MUST incluir un jefe final en el Capítulo 3 que sirva a Rey Monster, mientras que Rey Monster no se combate directamente en la Parte 2.
- **FR-013**: El juego MUST mantener el estilo visual pixel art y la arquitectura actual, reutilizando sistemas existentes cuando sea posible.
- **FR-014**: El juego MUST evitar introducir tecnologías modernas dentro de la ambientación medieval.
- **FR-015**: El juego MUST mantener el tono y la identidad de Musiic Brothers, incluyendo continuidad narrativa con la primera entrega.

### Key Entities

- **Milly**: protagonista jugable que utiliza una habilidad mágica de carga y disparo.
- **Monsters**: antagonistas que manipulan el tiempo y mantienen la amenaza principal.
- **Rey Monster**: líder de las Monsters, responsable de la captura de Milly y de la trama temporal.
- **NPC**: personajes no jugables de la aldea, bosque y torre que ofrecen diálogos y pistas.
- **Capítulo**: unidad de progresión narrativa y jugable (Aldea Perdida, Bosque de los Ecos, Torre del Tiempo).
- **Fragmento Temporal**: coleccionable que recompensa la exploración y expande la narrativa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El juego must ofrecer tres capítulos jugables completos en la Parte 2.
- **SC-002**: El jugador must controlar a Milly sin perder la capacidad de moverla, saltar o usar su ataque mágico.
- **SC-003**: El ataque mágico must derrotar enemigos básicos y activar al menos un elemento especial por capítulo.
- **SC-004**: El juego must mostrar diálogos medievales con NPCs en al menos dos ubicaciones diferentes.
- **SC-005**: El juego must incluir al menos un NPC interactivo en la Aldea Perdida y otro en el Bosque de los Ecos.
- **SC-006**: La narrativa principal de la Parte 2 must completarse con el descubrimiento de la manipulación temporal y la revelación de que Millyo sigue vivo.
- **SC-007**: Al finalizar el Capítulo 3, must activarse un portal que deje claro que la historia continúa.

## Assumptions

- El proyecto seguirá usando HTML, CSS y JavaScript puro, igual que la primera entrega.
- La arquitectura actual del juego (pantallas HTML, assets locales, lógica embedida en páginas) es reutilizable para la nueva historia.
- La ambientación medieval se implementará dentro del estilo pixel art existente y no requerirá gráficos de alta resolución.
- No se implementarán mecánicas de progreso online o de tecnología moderna dentro de la narrativa medieval.
- Las consecuencias de la historia de la Parte 1 se pueden presentar mediante texto y diálogos sin requerir escenas cinemáticas complejas.
