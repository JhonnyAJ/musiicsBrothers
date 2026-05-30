window.Game = {
  state: {
    chapter: 'Aldea Perdida',
    checkpoint: 1,
    charge: 0,
    loaded: false
  },
  init() {
    AssetsLoader.preload(() => {
      GameUI.init();
      GameInput.init();
      this.setChapter(this.state.chapter);
      this.setCheckpoint(this.state.checkpoint);
      this.updateCharge(0);
      this.state.loaded = true;
      this.startLoop();
    });
  },
  setChapter(name) {
    this.state.chapter = name;
    GameUI.setChapter(name);
  },
  setCheckpoint(index) {
    this.state.checkpoint = index;
    GameUI.setCheckpoint(index);
  },
  updateCharge(value) {
    this.state.charge = value;
    GameUI.setCharge(value);
  },
  startLoop() {
    const loop = () => {
      if (!this.state.loaded) {
        return;
      }
      this.updateLoop();
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  },
  updateLoop() {
    const input = GameInput.state;
    if (input.charge) {
      const nextCharge = Math.min(100, this.state.charge + 0.5);
      this.updateCharge(nextCharge);
    }
    if (input.attack && this.state.charge >= 20) {
      console.log('Game: ataque mágico ejecutado.');
      this.updateCharge(0);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
