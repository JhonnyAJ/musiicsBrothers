# Quickstart: Mejoras para Musiic Brothers Parte 2

## Preview the feature
1. Abra el archivo `specs/003-musiic-brothers-parte-2-mejoras/spec.md` para revisar el alcance y los requisitos.
2. Verifique que el nivel usa `assets/backgrounds/FondoGame` como fondo base.
3. Confirme que las animaciones de Milly se extraen desde `assets/milly` con la convención `Milly-<Accion><orden>`.
4. Valide que cada uno de los tres niveles tiene al menos 15 plataformas antes de llegar al portal de pase de nivel.
5. Compruebe el feedback de recolección de fragmentos temporales y el comportamiento de checkpoints en cada nivel.
6. Revise la presencia de un NPC con diálogo que aporte contexto narrativo en Capítulo 1 o 2.

## Manual validation checklist
- [ ] El fondo de nivel usa `assets/backgrounds/FondoGame` y las plataformas se dibujan encima.
- [ ] Cada nivel contiene un mínimo de 15 plataformas hasta el portal.
- [ ] Las animaciones de Milly se cargan desde `assets/milly` con naming `Milly-<Accion><orden>`.
- [ ] El control de Milly responde bien en suelo, salto y ataque mágico.
- [ ] Los checkpoints y fragmentos temporales ofrecen feedback visual o sonoro.
- [ ] Al menos un NPC ofrece un diálogo narrativo en castellano de fantasía medieval.
- [ ] La experiencia mantiene la arquitectura web estática sin nuevas librerías.

## Implementation notes
- Use existing JS modules for player movement, level rendering y diálogo.
- Keep background rendering separate from platform drawing for clarity.
- Implement platform count validation as part of level setup.
- Store Milly animation frame files locally in `assets/milly` and reference them with consistent naming.
- Keep the feature compatible with desktop and mobile browsers.
