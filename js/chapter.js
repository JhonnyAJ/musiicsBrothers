window.GameChapter = {
  state: {
    chapters: [],
    currentIndex: 0,
    checkpoint: 1
  },
  init() {
    this.state.chapters = [
      {
        name: 'Aldea Perdida',
        checkpointPositions: [1, 2],
        activatable: { x: 700, y: 280, width: 32, height: 32, activated: false },
        portal: { x: 740, y: 320, width: 40, height: 40, active: false },
        npcs: [
          {
            id: 'aldeana',
            name: 'Aldeana del valle',
            x: 520,
            y: 304,
            width: 32,
            height: 48,
            talked: false,
            dialogue: [
              'Aldeana: Oh viajera, he sentido tu magia en la distancia.',
              'Aldeana: La Aldea Perdida guarda un secreto antiguo entre sus runas.',
              'Aldeana: Busca en el bosque un eco que te guíe hacia la Torre del Tiempo.'
            ],
            clue: 'El bosque te espera con un eco que aviva tu viaje.'
          }
        ]
      },
      {
        name: 'Bosque de los Ecos',
        checkpointPositions: [1, 2],
        activatable: { x: 700, y: 280, width: 32, height: 32, activated: false },
        portal: { x: 740, y: 320, width: 40, height: 40, active: false },
        npcs: [
          {
            id: 'eco',
            name: 'Espíritu del Eco',
            x: 520,
            y: 304,
            width: 32,
            height: 48,
            talked: false,
            dialogue: [
              'Eco: Escucha la canción del bosque, viajera de tiempos antiguos.',
              'Eco: Tu corazón debe brillar con paciencia y fuerza para seguir.',
              'Eco: Solo quien comprenda el sonido del tiempo podrá llegar a la Torre.'
            ],
            clue: 'El sendero al final del bosque conduce a la Torre del Tiempo.'
          }
        ]
      },
      {
        name: 'Torre del Tiempo',
        checkpointPositions: [1, 2],
        activatable: { x: 700, y: 280, width: 32, height: 32, activated: false },
        portal: { x: 740, y: 320, width: 40, height: 40, active: false },
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
  getNPCById(id) {
    return this.getNPCs().find((npc) => npc.id === id);
  },
  startDialogueForNPC(id) {
    const npc = this.getNPCById(id);
    if (!npc || npc.talked) {
      return false;
    }

    GameDialogue.setLines(npc.dialogue);
    GameDialogue.state.onComplete = () => this.onDialogueComplete(npc);
    GameDialogue.start();
    return true;
  },
  onDialogueComplete(npc) {
    npc.talked = true;
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
