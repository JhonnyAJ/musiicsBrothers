window.GameChapter = {
  state: {
    chapters: [],
    currentIndex: 0,
    checkpoint: 1
  },
  init() {
    this.state.chapters = [
      { name: 'Aldea Perdida', checkpointPositions: [1, 2] },
      { name: 'Bosque de los Ecos', checkpointPositions: [1, 2] },
      { name: 'Torre del Tiempo', checkpointPositions: [1, 2] }
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
  }
};
