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
      GamePlayer.init();
      GameAttack.init();
      GameEnemy.init();
      GameNPC.init();
      GameDialogue.init();
      GameChapter.init();
      GameCollectibles.init();

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
    GameChapter.setCheckpoint(index);
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
    GamePlayer.update(input);
    GameAttack.update(input);
    GameEnemy.update();
    GameNPC.update();
    this.updateCharge(GameAttack.getCharge());

    if (input.attack && GameAttack.getCharge() === 0 && !input.charge) {
      console.log('Game: ataque mágico ejecutado.');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
