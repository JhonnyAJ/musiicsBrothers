# Feature Specification: Menú Principal - Musiic Brothers

**Feature Branch**: `002-main-menu`

**Created**: 2026-08-09

**Status**: Draft

**Input**: Crear un menú principal independiente que sirva como entrada al juego, con opciones `Jugar` y `Créditos`, estilo medieval y tierno, y un título llamativo tipo `MusiiC Brothers`.

## Overview

El menú principal debe vivir en un archivo HTML separado para no sobrecargar el juego existente.
Debe ofrecer una página de inicio clara y atractiva antes de cargar la experiencia de juego principal.
La navegación principal será:

- `Jugar`: redirige al inicio del juego existente
- `Créditos`: muestra la pantalla de créditos

El estilo visual debe mantener el tono medieval y amable del juego, con textos humorísticos dispersos en el fondo.

## Requirements

### Funcionales

- **FR-001**: El menú principal debe estar en un HTML independiente, por ejemplo `menu-principal.html`.
- **FR-002**: Debe mostrar un título grande: `MusiiC Brothers`.
- **FR-003**: Debe incluir botones o enlaces claros para `Jugar` y `Créditos`.
- **FR-004**: Al hacer clic en `Jugar`, el usuario debe redirigirse al inicio del juego actual.
- **FR-005**: Debe haber una vista de créditos accesible desde el mismo menú.
- **FR-006**: La estética debe ser medieval y tierna a la vez.
- **FR-007**: En el fondo deben aparecer leyendas humorísticas en lugares dispersos como:
  - *No pidió la misión. Le tocó.*
  - **Millynda Temporada Medieval**
  - **Milly, Caballera por Accidente**

### No funcionales

- **NFR-001**: El menú debe funcionar sin servidor, solamente con HTML/CSS/JS local.
- **NFR-002**: Debe cargar rápido y no sobrecargar el motor de juego existente.
- **NFR-003**: El HTML debe ser independiente y no mezclar la lógica principal del juego.

## User Stories

### User Story 1 - Acceder al juego desde un menú encantador

**Como** jugador,
**quiero** ver un menú principal medieval y amigable,
**para** iniciar la aventura sin abrir directamente el juego principal.

**Acceptance Criteria**:
- Dado que estoy en la página del menú,
  cuando hago clic en `Jugar`,
  entonces voy al inicio del juego.
- Dado que estoy en la página del menú,
  cuando hago clic en `Créditos`,
  entonces veo una pantalla de créditos con un estilo consistente.

### User Story 2 - Sentir el tono del juego desde el menú

**Como** jugador,
**quiero** que el menú tenga un diseño medieval tierno y humorístico,
**para** sentir la personalidad del juego antes de comenzar.

**Acceptance Criteria**:
- El menú debe mostrar un título `MusiiC Brothers`.
- Debe haber textos decorativos humorísticos dispersos en el fondo.
- El diseño debe usar una paleta suave y elementos que recuerden fantasia medieval.

## Design Notes

- Usar tipografías con aspecto manuscrito o pixel art suave.
- Colocar iconografía de fantasía leve (símbolos de espada, escudo, pergamino, estrella mágica).
- El fondo puede tener texturas suaves, pergaminos y puntos decorativos.
- El menú principal debe ser claro, con botones grandes y legibles.

## Assets

- No es necesario agregar assets nuevos si se puede lograr el estilo con CSS.
- Si se usan imágenes, deben almacenarse localmente en `assets/`.

## Success Criteria

- Existe un archivo `menu-principal.html` independiente.
- El archivo contiene enlaces claros a `Jugar` y `Créditos`.
- `Jugar` redirige correctamente al juego principal.
- El menú muestra el título `MusiiC Brothers`.
- Hay leyendas humorísticas de fondo que refuerzan el tono.

## Implementation Notes

- `Jugar` puede apuntar a `musiic-brothers-parte-2.html` o al HTML que cargue el juego principal.
- `Créditos` puede ser una sección dentro del mismo HTML o una página secundaria simple.
- Mantener la lógica de la página principal sin cambios.
