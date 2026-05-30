# Implementation Plan: Musiic Brothers - Parte 2

**Branch**: `001-musiic-brothers-parte-2` | **Date**: 2026-05-30 | **Spec**: ../spec.md

**Input**: Feature specification from `/specs/001-musiic-brothers-parte-2/spec.md`

## Summary

Entregar una segunda parte jugable y narrativa de Musiic Brothers centrada en Milly, con:
- tres capítulos con identidad propia: Aldea Perdida, Bosque de los Ecos y Torre del Tiempo
- controles claros, salto y ataque mágico cargado
- progresión del ataque mágico de Milly entre capítulos
- NPCs con diálogos en castellano de fantasía medieval comprensible
- un jefe final del Capítulo 3 que sirve a Rey Monster
- sistema de puntos de control por capítulo
- descubrimiento narrativo de que Milly está en otro período temporal
- coleccionables de fragmentos temporales y transición fluida entre escenas

El enfoque técnico mantiene HTML/CSS/JS puro, reutiliza la arquitectura estática actual y añade lógica modular para cada subsistema del juego.

## Technical Context

**Language/Version**: HTML, CSS, JavaScript puro

**Primary Dependencies**: Ninguna dependencia externa; solo recursos locales en `assets/`

**Storage**: N/A (datos de juego en memoria de sesión / estado de capítulo temporal)

**Testing**: Pruebas manuales en navegador moderno, con revisiones de flujo de capítulo y jugabilidad

**Target Platform**: Navegadores web modernos, desktop y mobile responsive

**Project Type**: Web estática / juego HTML5

**Performance Goals**: 60 fps objetivo en navegadores modernos; carga progresiva de assets locales para minimizar tiempos de carga

**Constraints**:
- No usar frameworks ni plugins externos
- Solo tecnologías web estáticas y recursos locales
- Mantener estilo pixel art y arquitectura actual
- No introducir elementos tecnológicos modernos dentro de la ambientación medieval

**Scale/Scope**: Juego de plataforma narrativa con 3 capítulos jugables, NPCs, un jefe final y coleccionables locales

## Constitution Check

### Requisitos clave de la constitución
- Experiencia de juego primero: foco en controles claros, feedback inmediato y mecánicas jugables.
- Compatibilidad web y rendimiento: ejecución local sin dependencias externas.
- Diseño visual coherente y responsive: UI y diálogos adaptativos en múltiples resoluciones.
- Arquitectura mantenible y modular: separar controles, jugador, ataque, capítulos, NPCs, diálogos y UI.
- Iteración con pulido constante: entregar funcionalidad básica antes de añadir efectos y narrativa adicional.

### Gates
- [x] Uso exclusivo de HTML/CSS/JS puro y recursos locales.
- [x] No se requieren servidores ni tecnologías externas para ejecutar el juego.
- [x] El diseño respeta la estética pixel art y la identidad de Musiic Brothers.
- [x] Se mantiene una estructura modular sin duplicar lógica de juego.
- [x] Se valida manualmente la jugabilidad y las transiciones de capítulo.

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
musiic-brothers-parte-2.html  # entrada del feature desde el menú o página principal
css/
├── game.css
├── dialogue.css
└── responsive.css
js/
├── main.js                # inicialización y bucle principal del juego
├── input.js               # controles de teclado/táctil
├── player.js              # lógica de Milly y físicas básicas
├── attack.js              # carga, disparo y progresión del ataque mágico
├── enemy.js               # enemigos básicos y jefe final
├── npc.js                 # NPCs y detección de interacción
├── dialogue.js            # panel de diálogo y líneas de texto
├── chapter.js             # definición de capítulos, objetivos y puntos de control
├── collectibles.js        # fragmentos temporales y recolección
└── ui.js                  # HUD, mensajes narrativos y transiciones
assets/
├── sprites/               # sprites pixel art de Milly, enemigos, NPCs y objetos
├── audio/                 # sonidos locales de ataque, diálogo y colección
└── backgrounds/           # fondos específicos de capítulo
```

**Structure Decision**: Mantener la arquitectura web estática actual y añadir módulos específicos para la mecánica de capítulos, checkpoints y progresión de ataque.

## Technical Implementation Plan

### Fase 0: Preparación y análisis
- Revisar la arquitectura actual del juego, menús y páginas HTML existentes.
- Identificar activos reutilizables y qué nuevos recursos pixel art y audio se requieren.
- Confirmar la página de entrada y los nombres de archivo para la Parte 2.
- Definir las tres escenas principales y sus objetivos narrativos:
  - Capítulo 1: Aldea Perdida
  - Capítulo 2: Bosque de los Ecos
  - Capítulo 3: Torre del Tiempo

### Fase 1: Base jugable y checkpoints
- Implementar el movimiento de Milly y el salto con físicas ligeras.
- Añadir colisiones simples y detección de suelo.
- Definir el sistema de puntos de control dentro de cada capítulo.
- Permitir reiniciar desde el último checkpoint tras perder.
- Crear indicadores de checkpoint en la UI.

### Fase 2: Golpe de Energía y progresión del ataque
- Implementar carga de energía y disparo de proyectil básico.
- Añadir un indicador de carga en la interfaz.
- Modelar la progresión del ataque mágico:
  - Capítulo 1: proyectil básico y efectos iniciales
  - Capítulo 2: ataque mejorado con alcance o interacción adicional
  - Capítulo 3: versión final más poderosa o con efectos especiales para el jefe
- Manejar colisiones de proyectiles con enemigos y objetos activables.

### Fase 3: NPCs y diálogos narrativos
- Implementar NPCs con interacción por proximidad y botón de acción.
- Crear un panel de diálogo legible y responsive.
- Garantizar que los textos de los NPCs usan castellano de fantasía medieval comprensible.
- Actualizar objetivos y pistas cuando concluye un diálogo.
- Incluir momentos narrativos donde Milly descubre estar en otro período temporal.

### Fase 4: Capítulos y jefe final
- Definir la estructura de cada capítulo:
  - Capítulo 1: Aldea Perdida con primera pista temporal
  - Capítulo 2: Bosque de los Ecos con atmósfera distorsionada y progreso mágico
  - Capítulo 3: Torre del Tiempo con jefe final que sirve a Rey Monster
- Implementar transiciones narrativas entre capítulos.
- Asegurar que Rey Monster no aparece como combate directo, sino como fuerza detrás de escenas.
- Añadir el jefe final del Capítulo 3 con mecánica de combate contra Milly y relación temática con Rey Monster.
- Finalizar el Capítulo 3 con activación del portal y la revelación de que Millyo sigue vivo.

### Fase 5: Coleccionables y feedback
- Añadir fragmentos temporales ocultos en cada capítulo.
- Registrar la colección y mostrar el progreso en la UI.
- Proporcionar feedback visual/al sonido al recoger cada fragmento.
- Asegurar que la recolección incentiva la exploración sin romper el flujo.

### Fase 6: Pulido y validación
- Ajustar animaciones, sonidos y efectos del ataque mágico.
- Verificar que los diálogos y textos son legibles y coherentes.
- Probar la funcionalidad de checkpoints y reinicio de capítulos.
- Revisar el balance del jefe final y la progresión de combate.
- Validar la experiencia en navegadores modernos y en diversas resoluciones.

## Complexity Tracking

No se requiere un cambio de arquitectura mayor ni dependencias nuevas. El plan respeta la constitución manteniendo el juego como una aplicación web estática, con módulos claros para la mecánica de capítulo, narración y control de estado.
