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
        activatable: { x: 700, y: 280, width: 32, height: 32, activated: false }
      },
      {
        name: 'Bosque de los Ecos',
        checkpointPositions: [1, 2],
        activatable: { x: 700, y: 280, width: 32, height: 32, activated: false }
      },
      {
        name: 'Torre del Tiempo',
        checkpointPositions: [1, 2],
        activatable: { x: 700, y: 280, width: 32, height: 32, activated: false }
      }
    ];
    this.state.currentIndex = 0;
    this.state.checkpoint = 1;
    console.log('GameChapter: inicializado.');
  },
  getCurrentChapter() {
    return this.state.chapters[this.state.currentIndex];
  },
  advanceChapter() {
    if (this.state.currentIndex < this.state.chapters.length - 1) {
      this.state.currentIndex += 1;
      this.state.checkpoint = 1;
      Game.setChapter(this.getCurrentChapter().name);
      Game.setCheckpoint(this.state.checkpoint);
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
      console.log('GameChapter: objeto activado en capítulo', this.getCurrentChapter().name);
      return true;
    }

    return false;
  }
};
