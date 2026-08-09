function createLevelPlatforms(baseY, widthPattern, rows = 5, columns = 4, randomize = true) {
  const platforms = [];

  const horizontalSpacing = 360; // Ajuste adicional para que las últimas plataformas queden más cerca
  const verticalSpacing = 88;    // Mantiene salto alcanzable con mayor potencia de salto

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;

      const x =
        32 +
        col * horizontalSpacing +
        (row % 2 === 1 ? 140 : 0) +
        (randomize ? Math.random() * 40 : 0);

      const y =
        baseY -
        row * verticalSpacing +
        (randomize ? (Math.random() * 20 - 10) : 0);

      platforms.push({
        x,
        y,
        width: widthPattern[index % widthPattern.length],
        height: 16
      });
    }
  }

  return platforms;
}

window.GameChapter = {
  state: {
    chapters: [],
    currentIndex: 0,
    checkpoint: 1
  },
  init() {
    const aldeaPlatforms = createLevelPlatforms(440, [122, 96, 78, 108, 136, 150, 164], 5, 5, false);
    const bosquePlatforms = createLevelPlatforms(430, [132, 104, 86, 112, 148, 168, 182], 5, 5);
    const torrePlatforms = createLevelPlatforms(424, [144, 112, 94, 118, 158, 174, 190], 5, 5);

    const makePortal = (platforms) => {
      if (!platforms.length) {
        return { x: 740, y: 320, width: 40, height: 40, active: false };
      }
      const lastPlatform = platforms.reduce((best, platform) => {
        return platform.x > best.x ? platform : best;
      }, platforms[0]);
      return {
        x: lastPlatform.x + lastPlatform.width / 2 - 20,
        y: lastPlatform.y - 44,
        width: 40,
        height: 40,
        active: false
      };
    };

    const makeActivatable = (platforms, index) => {
      const platform = platforms[Math.min(index, platforms.length - 1)];
      return {
        x: platform.x + 18,
        y: platform.y - 34,
        width: 32,
        height: 32,
        activated: false
      };
    };

    const makeNpc = (platforms, index, npcTemplate) => {
      const platform = platforms[Math.min(index, platforms.length - 1)];
      return [{
        ...npcTemplate,
        sprite: npcTemplate.sprite || 'aldeano',
        x: platform.x + 10,
        y: platform.y - (npcTemplate.height || 48),
      }];
    };

    this.state.chapters = [
      {
        name: 'Aldea Perdida',
        checkpointPositions: [1, 2],
        platforms: aldeaPlatforms,
        activatable: makeActivatable(aldeaPlatforms, 8),
        fragments: [
          { id: 'a_frag_1', x: aldeaPlatforms[3].x + 12, y: aldeaPlatforms[3].y - 20, width: 16, height: 16 },
          { id: 'a_frag_2', x: aldeaPlatforms[7].x + 10, y: aldeaPlatforms[7].y - 18, width: 16, height: 16 }
        ],
        portal: makePortal(aldeaPlatforms),
        npcs: makeNpc(aldeaPlatforms, 1, {
          id: 'aldeana',
            name: 'Aldeana del valle',
            width: 48,
            height: 72,
          talked: false,
          dialogue: [
            'Aldeana: Oh viajera, he sentido tu magia en la distancia.',
            'Aldeana: La Aldea Perdida guarda un secreto antiguo entre sus runas.',
            'Aldeana: Busca en el bosque un eco que te guíe hacia la Torre del Tiempo.'
          ],
          clue: 'El bosque te espera con un eco que aviva tu viaje.'
        })
      },
      {
        name: 'Bosque de los Ecos',
        checkpointPositions: [1, 2],
        platforms: bosquePlatforms,
        activatable: makeActivatable(bosquePlatforms, 9),
        fragments: [
          { id: 'b_frag_1', x: bosquePlatforms[4].x + 12, y: bosquePlatforms[4].y - 18, width: 16, height: 16 },
          { id: 'b_frag_2', x: bosquePlatforms[8].x + 10, y: bosquePlatforms[8].y - 18, width: 16, height: 16 }
        ],
        portal: makePortal(bosquePlatforms),
        npcs: makeNpc(bosquePlatforms, 2, {
          id: 'eco',
          name: 'Espíritu del Eco',
          width: 32,
          height: 48,
          talked: false,
          dialogue: [
            'Eco: Escucha la canción del bosque, viajera de tiempos antiguos.',
            'Eco: Tu corazón debe brillar con paciencia y fuerza para seguir.',
            'Eco: Solo quien comprenda el sonido del tiempo podrá llegar a la Torre.'
          ],
          clue: 'El sendero al final del bosque conduce a la Torre del Tiempo.'
        })
      },
      {
        name: 'Torre del Tiempo',
        checkpointPositions: [1, 2],
        platforms: torrePlatforms,
        activatable: makeActivatable(torrePlatforms, 10),
        fragments: [
          { id: 't_frag_1', x: torrePlatforms[12].x + 12, y: torrePlatforms[12].y - 18, width: 16, height: 16 }
        ],
        portal: makePortal(torrePlatforms),
        npcs: []
      }
    ];
    this.state.currentIndex = 0;
    this.state.checkpoint = 1;
    console.log('GameChapter: inicializado.');
  },
  getCurrentChapter() {
    return this.state.chapters[this.state.currentIndex];
  },
  getNPCs() {
    return this.getCurrentChapter().npcs || [];
  },
  getPlatforms() {
    return this.getCurrentChapter().platforms || [];
  },
  getNPCById(id) {
    return this.getNPCs().find((npc) => npc.id === id);
  },
  startDialogueForNPC(id) {
    const npc = this.getNPCById(id);
    if (!npc || npc.talked) {
      return false;
    }

    // mark source NPC so UI/dialogue-aware systems can react
    if (window.GameDialogue && GameDialogue.state) {
      GameDialogue.state.sourceNpcId = id;
    }
    // change NPC sprite to talking pose and orient towards the player
    try {
      const player = window.GamePlayer && GamePlayer.state ? GamePlayer.state : null;
      if (player) {
        // if player is left of npc, flip horizontally so npc faces left
        npc.flipX = player.x < npc.x;
      }
      npc._prevSprite = npc.sprite || 'aldeano';
      npc.sprite = 'aldeano-talking';
    } catch (e) {
      // ignore non-critical
    }

    GameDialogue.setLines(npc.dialogue);
    GameDialogue.state.onComplete = () => this.onDialogueComplete(npc);
    GameDialogue.start();
    return true;
  },
  onDialogueComplete(npc) {
    npc.talked = true;
    // clear source NPC when dialogue ends
    if (window.GameDialogue && GameDialogue.state) {
      GameDialogue.state.sourceNpcId = null;
    }
    // restore NPC sprite after dialogue
    try {
      if (npc && npc._prevSprite) {
        npc.sprite = npc._prevSprite;
        delete npc._prevSprite;
      }
    } catch (e) {}
    const clue = npc.clue || 'Has escuchado la historia del lugar.';
    GameUI.showStageMessage(clue);
    this.checkPortalActivation();
    console.log('GameChapter: diálogo completado con', npc.name);
  },
  isObjectiveComplete() {
    const chapter = this.getCurrentChapter();
    if (chapter.name === 'Torre del Tiempo') {
      return chapter.activatable.activated;
    }
    return chapter.activatable.activated && chapter.npcs.every((npc) => npc.talked);
  },
  getPortalBase() {
    return this.getCurrentChapter().portal;
  },
  getPortal() {
    const portal = this.getPortalBase();
    return portal && portal.active ? portal : null;
  },
  activatePortal() {
    const portal = this.getPortalBase();
    if (!portal || portal.active) {
      return false;
    }

    portal.active = true;
    const chapterName = this.getCurrentChapter().name;
    if (chapterName === 'Torre del Tiempo') {
      GameUI.showStageMessage('Un portal final se abre mientras el Rey Monster observa desde la sombra.');
    } else {
      GameUI.showStageMessage('Se ha abierto un portal temporal. Cruza para continuar.');
    }
    return true;
  },
  checkPortalActivation() {
    if (!this.isObjectiveComplete()) {
      return false;
    }
    return this.activatePortal();
  },
  checkProjectileActivation(projectiles) {
    const object = this.getActiveObject();
    if (!object || object.activated) {
      return false;
    }

    const hit = projectiles.some((projectile) => {
      return projectile.x < object.x + object.width &&
             projectile.x + projectile.width > object.x &&
             projectile.y < object.y + object.height &&
             projectile.y + projectile.height > object.y;
    });

    if (hit) {
      object.activated = true;
      const chapterName = this.getCurrentChapter().name;
      const message = chapterName === 'Torre del Tiempo'
        ? 'La runa final se ha encendido con tu ataque. Siente la presencia del Rey Monster.'
        : 'El artefacto ha despertado. Busca el portal para avanzar.';
      GameUI.showStageMessage(message);
      this.checkPortalActivation();
      console.log('GameChapter: objeto activado en capítulo', chapterName);
      return true;
    }

    return false;
  },
  checkPortalEntry(playerState) {
    const portal = this.getPortal();
    if (!portal) {
      return false;
    }

    const entered = playerState.x < portal.x + portal.width &&
      playerState.x + playerState.width > portal.x &&
      playerState.y < portal.y + portal.height &&
      playerState.y + playerState.height > portal.y;

    if (entered) {
      this.enterPortal();
      return true;
    }

    return false;
  },
  enterPortal() {
    if (this.state.currentIndex >= this.state.chapters.length - 1) {
      GameUI.showStageMessage('Has llegado al núcleo de la Torre. El Rey Monster observa desde las sombras.');
      GameUI.showChapterTransition('Final de la Parte 2', 3200);
      return;
    }

    GameUI.showStageMessage('Has cruzado el portal. Avanzando al siguiente capítulo...');
    this.advanceChapter();
  },
  advanceChapter() {
    if (this.state.currentIndex < this.state.chapters.length - 1) {
      this.state.currentIndex += 1;
      this.state.checkpoint = 1;
      Game.setChapter(this.getCurrentChapter().name);
      Game.setCheckpoint(this.state.checkpoint);
      if (GameEnemy && typeof GameEnemy.setupChapterEnemies === 'function') {
        GameEnemy.setupChapterEnemies(this.getCurrentChapter().name);
      }
      GameUI.showChapterTransition(`Capítulo ${this.state.currentIndex + 1}: ${this.getCurrentChapter().name}`);
    }
  },
  setCheckpoint(index) {
    this.state.checkpoint = index;
  },
  resetToCheckpoint() {
    console.log('GameChapter: reiniciar desde checkpoint', this.state.checkpoint);
  },
  getActiveObject() {
    return this.getCurrentChapter().activatable;
  }
};
