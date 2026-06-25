# Feature Specification: Mejoras para Musiic Brothers Parte 2

**Feature Branch**: `003-musiic-brothers-parte-2-mejoras`

**Created**: 2026-06-24

**Status**: Draft

**Input**: Usuario solicita un nuevo spec para mejoras en Musiic Brothers Parte 2, centrado en pulir la experiencia de juego, fortalecer la narrativa del capítulo 2 y mejorar las interacciones de Milly.

## Clarificaciones

### Session 2026-06-24
- Q: ¿Dónde se almacenan los sprites del jugador principal y cómo se nombran? → A: Los sprites de Milly están en `assets/milly` y usan la convención `Milly-<Accion><orden>` para cada fotograma de animación.
- Q: ¿Qué fondo y plataformas deben usarse en los niveles? → A: El fondo del juego debe ser `assets/backgrounds/FondoGame`, con las plataformas dibujadas encima. Cada uno de los 3 niveles existentes debe tener al menos 15 plataformas para que Milly llegue al portal de pase de nivel.

## Objetivo
Mejorar la calidad jugable y la cohesión narrativa de Musiic Brothers Parte 2 sin cambiar la arquitectura base del juego. La característica debe agregar refinamientos en controles, animaciones, niveles, retroalimentación visual y coherencia de los capítulos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Controles y animaciones refinadas (Priority: P1)
Como jugador, quiero que Milly responda de forma fluida y que sus animaciones de movimiento y ataque sean claras, para sentir que controlo un personaje bien pulido.

**Independent Test**: Mover a Milly, saltar, cargar y disparar energía en el Capítulo 1 y observar que las animaciones y la respuesta de control son coherentes.

**Acceptance Scenarios**:
1. **Given** que el jugador mueve a Milly, **When** pulsa izquierda/derecha, **Then** Milly responde sin retraso y muestra la animación de corrida correspondiente.
2. **Given** que el jugador salta, **When** activa el salto, **Then** se reproduce la animación de salto y la física refleja un salto consistente.
3. **Given** que el jugador carga energía, **When** ejecuta el ataque mágico, **Then** aparece un proyectil animado y el audio/efecto visual indican la acción.

---

### User Story 2 - Mejora de la experiencia del Capítulo 2 (Priority: P1)
Como jugador, quiero que el Capítulo 2 sea más inmersivo y tenga una guía clara de progreso para que la narrativa temporal se perciba mejor.

**Independent Test**: Jugar en el Capítulo 2 y verificar que la ambientación, la señalización de objetivos y los diálogos reflejan el tema del viaje en el tiempo.

**Acceptance Scenarios**:
1. **Given** que el jugador entra al Bosque de los Ecos, **When** observa el entorno, **Then** percibe una ambientación medieval con elementos temporales claros.
2. **Given** que el jugador encuentra un objetivo, **When** interactúa con el entorno, **Then** recibe retroalimentación clara sobre el siguiente paso.
3. **Given** que el jugador completa el Capítulo 2, **When** alcanza el final, **Then** se revela el acceso a la Torre del Tiempo con una transición narrativa definida.

---

### User Story 3 - Feedback visual y de progreso (Priority: P2)
Como jugador, quiero ver indicadores claros de progreso, coleccionables y checkpoints, para sentir que avanzo y puedo retomar el juego tras perder.

**Independent Test**: Recoger un fragmento temporal, activar un checkpoint y perder para comprobar que el reinicio se hace desde el punto correcto.

**Acceptance Scenarios**:
1. **Given** un fragmento temporal en el nivel, **When** Milly lo recoge, **Then** aparece una animación o contador que confirma la recolección.
2. **Given** un checkpoint activo, **When** el jugador muere, **Then** el reinicio comienza en el último checkpoint alcanzado.
3. **Given** que el jugador progresa en el nivel, **When** observa el HUD o elementos del escenario, **Then** entiende su avance hacia el portal.

---

### User Story 4 - Refinar NPC y diálogos (Priority: P3)
Como jugador, quiero que los NPC del juego ofrezcan diálogos más inmersivos y útiles para la historia.

**Independent Test**: Interactuar con al menos un NPC en el Capítulo 1 o 2 y leer un diálogo que aporta contexto o una pista.

**Acceptance Scenarios**:
1. **Given** un NPC, **When** el jugador interactúa, **Then** aparece un diálogo con texto en castellano de fantasía medieval.
2. **Given** que el diálogo termina, **When** el jugador continúa, **Then** se actualiza un objetivo o la narrativa avanza.

---

## Requisitos *(mandatory)*

### Requisitos funcionales
- **FR-001**: El juego MUST mejorar la respuesta de control de Milly en suelo y aire.
- **FR-002**: El juego MUST actualizar o añadir animaciones para Milly en movimiento, salto y ataque mágico.
- **FR-003**: El juego MUST mejorar la ambientación y la guía de progreso del Capítulo 2.
- **FR-004**: El juego MUST implementar al menos un checkpoint funcional por capítulo.
- **FR-005**: El juego MUST incluir feedback visual o sonoro al recoger fragmentos temporales.
- **FR-006**: El juego MUST mantener la continuidad narrativa con la Parte 1 y la trama de viaje temporal.
- **FR-007**: El juego MUST usar `assets/backgrounds/FondoGame` como fondo de nivel y dibujar las plataformas encima de ese fondo.
- **FR-008**: Cada uno de los 3 niveles existentes MUST tener al menos 15 plataformas que permitan a Milly avanzar hasta el portal de pase de nivel.
- **FR-009**: El juego MUST evitar cambios drásticos en la arquitectura actual; las mejoras deben integrarse en el flujo existente.
- **FR-010**: El juego MUST garantizar que las interacciones con NPC no rompan el ritmo del nivel.
- **FR-011**: El juego MUST mostrar al menos un elemento temporal o visual que refuerce la narrativa de viaje en el tiempo en el Capítulo 2.
- **FR-012**: El juego MUST cargar las animaciones de Milly desde `assets/milly` usando archivos nombrados `Milly-<Accion><orden>`.
- **FR-013**: El juego MUST mantener la estructura de activos actual y no depender de nuevos motores de animación externos.

### Entidades clave
- **Milly**: protagonista jugable con controles y animaciones mejoradas.
- **Fragmento Temporal**: coleccionable que confirma el avance y refuerza la exploración.
- **Checkpoint**: punto de guardado interno que permite reiniciar tras perder.
- **NPC**: personaje con diálogo y contexto narrativo.
- **Capítulo 2**: sección central que debe ampliarse con señales temporales y claridad de objetivos.

## Criterios de éxito *(mandatory)*

- **SC-001**: El jugador percibe una mejora en la respuesta y animaciones de Milly durante el juego.
- **SC-002**: El Capítulo 2 ofrece una experiencia más inmersiva y coherente con el tema temporal.
- **SC-003**: Los checkpoints funcionan correctamente y el reinicio se realiza desde el último punto alcanzado.
- **SC-004**: Los fragmentos temporales muestran retroalimentación clara y son recolectables en el nivel.
- **SC-005**: Al menos un diálogo de NPC aporta valor narrativo sin frenar la jugabilidad.
- **SC-006**: La experiencia se mantiene fiel al estilo gráfico y estructural de Musiic Brothers.
- **SC-007**: Las mejoras se integran sin introducir nuevas librerías externas ni cambios de arquitectura innecesarios.
- **SC-008**: Las animaciones de Milly se cargan correctamente desde `assets/milly` con la convención `Milly-<Accion><orden>`.
- **SC-009**: Cada uno de los 3 niveles usa `assets/backgrounds/FondoGame` como fondo y contiene al menos 15 plataformas antes del portal de nivel.

## Suposiciones
- Las mejoras se harán sobre la base del motor HTML/CSS/JS actual del proyecto.
- Los assets existentes pueden reutilizarse para mejorar animaciones y fondos.
- Los sprites de Milly se almacenan en `assets/milly` y se usan archivos nombrados `Milly-<Accion><orden>`.
- No se necesitarán módulos externos ni frameworks adicionales para implementar las mejoras.
- El jugador sigue accediendo al juego desde una experiencia local en navegador.
- La historia central de Parte 2 y el viaje temporal ya están definidos; esta especificación los pule y refuerza.
