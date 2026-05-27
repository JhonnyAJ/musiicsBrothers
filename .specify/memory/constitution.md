<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles: generated from template placeholders
Added sections: Additional Constraints, Development Workflow
Removed sections: none
Templates requiring updates: .specify/memory/constitution.md ✅ updated
Follow-up TODOs: none
-->

# Musiic’s Brothers Constitution

## Core Principles

### I. Experiencia de juego primero
El proyecto MUST priorizar el juego como experiencia interactiva: controles claros, niveles jugables,
feedback visual y audio consistentes, y transiciones suaves. Cada cambio de código debe preservar o
mejorar la sensación de plataforma clásica con toques modernos.

### II. Compatibilidad web y rendimiento
El juego MUST funcionar en navegadores modernos sin dependencias externas, usando HTML, CSS y
JavaScript puro. El rendimiento en pantalla completa y en dispositivos móviles MUST ser fluido, con
optimización para 60 fps cuando sea posible y carga progresiva de assets.

### III. Diseño visual coherente y responsive
La interfaz MUST ser responsiva y accesible, con tipografía legible, elementos interactivos claros y
animaciones controladas. El menú, créditos, diálogos y niveles MUST funcionar bien en tamaños de
pantalla variados sin depender de plugins ni comportamientos específicos de un solo navegador.

### IV. Arquitectura mantenible y modular
El código del juego MUST mantenerse organizado en módulos claros: assets, escenas, controles,
animaciones y lógica de juego. El proyecto MUST evitar duplicación innecesaria y facilitar cambios
de niveles, personajes y efectos sin romper otras pantallas.

### V. Iteración con pulido constante
El equipo MUST entregar mejoras pequeñas y verificables, enfocándose primero en funcionalidad básica
jugable y luego en pulido visual, ajustes de audio y experiencia de usuario. Las decisiones de diseño
se revisan con base en resultados concretos antes de añadir complejidad.

## Additional Constraints

- El proyecto MUST usar solo tecnologías web estáticas: HTML, CSS, JavaScript y archivos de assets.
- Los recursos MUST almacenarse localmente en `assets/` y cargarse de forma optimizada para minimizar
  tiempos de carga en navegadores.
- La experiencia MUST ser autosuficiente: no se requiere servidor para ejecutar el juego en un navegador.
- El repositorio MUST incluir documentación mínima sobre ejecución local y estructura de archivos.

## Development Workflow

- Cada cambio significativo MUST documentarse en una rama descriptiva y, si es posible, en un issue o
  nota de seguimiento.
- Las revisiones MUST validar que los niveles sigan siendo jugables y que no rompan el funcionamiento
  del menú, los diálogos o la navegación entre pantallas.
- Cualquier corrección de bugs o mejora visual MUST acompañarse de pruebas manuales de usuario final
  (por ejemplo, jugar el nivel afectado y verificar transiciones y sonidos).
- Las mejoras estéticas MUST priorizar claridad sobre complejidad; el pulido visual no debe comprometer
  la estabilidad del juego.

## Governance

La constitución MUST ser la guía principal para decisiones de desarrollo en este repositorio.
Los cambios en la experiencia del juego, la compatibilidad web o la arquitectura del frontend MUST
ser justificados y documentados.

- Cualquier enmienda a esta constitución MUST registrarse con fecha y motivo en este archivo.
- Las revisiones mayores de diseño o tecnología MUST usar la versión semántica para indicar rupturas.
- La revisión de cumplimiento MUST incluir al menos una prueba de ejecución en navegador y una inspección
  de la estructura de archivos relevante.
- Las decisiones de implementación MUST alinearse con los principios de experiencia, rendimiento,
  mantenimiento y pulido iterativo.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
