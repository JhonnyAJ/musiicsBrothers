# Research: Mejoras para Musiic Brothers Parte 2

## Decision: Usar la arquitectura web estática actual

- Se elegirá la base existente del proyecto: HTML, CSS y JavaScript puro.
- No se introducirán frameworks ni motores externos para mantener compatibilidad y rendimiento.
- Las mejoras serán incrementales y se integrarán en la estructura actual de `assets/`, `js/` y `css/`.

## Decision: Animaciones de Milly desde `assets/milly`

- Las animaciones de Milly se construirán usando frames individuales almacenados en `assets/milly`.
- La convención `Milly-<Accion><orden>` será la regla de naming para cada fotograma.
- Esto facilita el control fino de cada fase de movimiento, salto y ataque sin depender de spritesheets externos.

## Decision: Uso de `assets/backgrounds/FondoGame` como fondo base

- Cada nivel utilizará el fondo local en `assets/backgrounds/FondoGame`.
- Las plataformas se dibujarán encima de ese fondo para mantener la estética definida y reforzar la continuidad visual.
- Se exigirá un mínimo de 15 plataformas por nivel para llegar al portal de pase de nivel; esto refuerza la exploración y el diseño de plataformas.

## Alternatives considered

- Usar un nuevo motor de animación o spritesheet dinámico: rechazado por incumplir la constitución de mantener arquitectura simple y tecnologías web estáticas.
- Rediseñar la estructura de niveles por completo: rechazado porque la especificación pide mejoras sobre la base existente, no una reescritura total.

## Rationale

- Esta solución minimiza riesgo técnico y mantiene la experiencia fiel al proyecto original.
- El uso de assets locales y convenciones claras de naming facilita la implementación y el mantenimiento futuro.
- La mejora de niveles, animaciones y feedback de checkpoint ofrece valor jugable inmediato sin agregar complejidad innecesaria.
