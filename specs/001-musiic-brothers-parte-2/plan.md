# Implementation Plan: Musiic Brothers - Parte 2

**Branch**: `001-musiic-brothers-parte-2` | **Date**: 2026-05-30 | **Spec**: ../spec.md

**Input**: Feature specification from `/specs/001-musiic-brothers-parte-2/spec.md`

## Summary

Implementar la segunda parte del juego centrada en Milly con:
- movimiento y salto jugable
- carga y disparo de un proyectil mágico
- NPCs interactivos y diálogos en castellano medieval
- tres capítulos conectados por una narrativa de viaje temporal
- coleccionables de fragmentos temporales
- continuidad de estilo pixel art y arquitectura web estática existente

El enfoque técnico se basa en modularizar la lógica del juego en archivos JS/CSS/HTML independientes, reutilizar la arquitectura actual y validar siempre en navegador sin depender de librerías externas.

## Technical Context

**Language/Version**: HTML, CSS, JavaScript puro

**Primary Dependencies**: Ninguna dependencia externa; solo recursos locales en `assets/`

**Storage**: N/A (datos de juego en memoria de sesión)

**Testing**: Pruebas manuales en navegador moderno, verificaciones de flujo de juego

**Target Platform**: Navegadores web modernos, desktop y mobile responsive

**Project Type**: Web estática / juego HTML5

**Performance Goals**: 60 fps objetivo en navegadores modernos; carga progresiva de assets locales para minimizar tiempos de carga

**Constraints**:
- No usar frameworks ni plugins externos
- Solo tecnologías web estáticas y recursos locales
- Mantener estilo y arquitectura existentes
- No introducir elementos tecnológicos fuera de la ambientación medieval

**Scale/Scope**: Implementación de un juego de plataforma narrativa con 3 capítulos, 1 protagonista y contenido interactivo local

## Constitution Check

### Requisitos clave de la constitución
- Experiencia de juego primero: prioridad a controles claros, feedback visual y mecánicas jugables.
- Compatibilidad web y rendimiento: ejecución local en navegador sin dependencias externas.
- Diseño visual coherente y responsive: UI adaptativa para diálogos, HUD y menús.
- Arquitectura mantenible y modular: separar lógica en módulos claros para player, escena, diálogo, enemigos y coleccionables.
- Iteración con pulido constante: entregar primero la funcionalidad básica y luego añadir narrativa y efectos.

### Gates
- [x] Uso exclusivo de HTML/CSS/JS puro y recursos locales.
- [x] No se requieren servidores ni tecnologías externas para ejecutar el juego.
- [x] El diseño respeta la estética pixel art y la identidad de Musiic Brothers.
- [x] Migración modular de la lógica sin duplicar código innecesario.
- [x] Validación manual de jugabilidad tras cada hito.

## Project Structure

### Documentación de la característica
```text
specs/001-musiic-brothers-parte-2/
├── spec.md
├── plan.md
└── checklists/
    └── requirements.md
```

### Fuente propuesta
```text
index.html                # o nueva página de entrada para la Parte 2
css/                      # estilos compartidos y específicos de la Parte 2
├── game.css
├── dialogue.css
└── responsive.css
js/
├── input.js              # controles y mapeo de teclas/táctil
├── player.js             # lógica de Milly y físicas básicas
├── attack.js             # carga y proyectiles mágicos
├── enemy.js              # enemigos básicos y colisiones
├── npc.js                # NPCs e interacción de diálogo
├── chapter.js            # administración de capítulos y objetivos
├── collectibles.js       # fragmentos temporales
└── ui.js                 # HUD, notificaciones y transiciones
assets/
├── sprites/              # sprites pixel art de Milly, enemigos, objetos y NPCs
├── audio/                # sonidos locales de ataque, diálogo y colección
└── backgrounds/          # fondos de capítulo
```

**Structure Decision**: Mantener la arquitectura actual del juego en archivos estáticos, agregando una carpeta `js/` y `css/` si no existen todavía, con la lógica modular de la nueva Parte 2.

## Technical Implementation Plan

### Fase 0: Preparación
- Revisar la arquitectura actual de `index.html`, `menu/` y cualquier código JS existente.
- Identificar recursos reutilizables en `assets/` (sprites, audio) y qué activos nuevos se necesitan.
- Definir el flujo de capítulo temprano: Aldea Perdida -> Bosque de los Ecos -> Torre del Tiempo.

### Fase 1: Mecánica de Milly
- Implementar movimiento horizontal fluido y salto simple.
- Añadir estado `onGround` y físicas ligeras para caída y salto.
- Integrar animaciones básicas de Milly con sprites existentes.

### Fase 2: Golpe de Energía
- Definir botón/tecla de carga y liberar para disparar.
- Mostrar un indicador de carga en HUD.
- Crear `Projectile` con origen cercano al pecho de Milly, velocidad fija y duración limitada.
- Implementar colisión de proyectil con enemigos y objetos activables.

### Fase 3: Enemigos y elementos especiales
- Implementar enemigos básicos con hitbox, vida y muerte.
- Añadir al menos un objeto activable por proyectil (palanca o puerta desbloqueable).
- Manejar caso en que el proyectil no impacta nada (desaparece tras distancia/tiempo).

### Fase 4: NPC y diálogo
- Crear entidades NPC con posición y texto de diálogo.
- Activar diálogo solo cuando el jugador está cerca y presiona interacción.
- Diseñar caja de diálogo legible y responsive con líneas en castellano medieval.
- Al finalizar el diálogo, actualizar objetivo o pista de capítulo.

### Fase 5: Capítulos y narrativa
- Modelar capítulos como escenas con:
  - nombre
  - objetivos claros
  - NPCs
  - enemigos y activadores
  - coleccionables
- Implementar transiciones entre capítulos con mensaje narrativo.
- Validar las condiciones clave:
  - final del Capítulo 1 revela la Torre del Tiempo
  - Capítulo 2 ofrece acceso al portal
  - Capítulo 3 culmina con jefe/pasaje y revelación de Millyo

### Fase 6: Coleccionables y feedback
- Añadir fragmentos temporales ocultos en cada capítulo.
- Registrar colección en contador UI.
- Mostrar realimentación inmediata tras recoger un fragmento.

### Fase 7: Pulido y pruebas
- Ajustar animaciones, sonidos y feedback visual.
- Asegurar que no se rompen menús ni navegación existente.
- Probar en navegador moderno y varias resoluciones.
- Documentar la ejecución local mínima si se añaden archivos nuevos.

## Complexity Tracking

No se anticipan violaciones de la constitución ni la introducción de tecnologías extrañas. El plan mantiene la implementación en una sola pila de HTML/CSS/JS y respeta la arquitectura de juego actual.
