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
      GameChapter.init();
      GameAttack.init();
      GameEnemy.init();
      GameNPC.init();
      GameDialogue.init();
      GameCollectibles.init();

      this.setChapter(this.state.chapter);
      this.setCheckpoint(this.state.checkpoint);
      this.updateCharge(0);
      GameUI.hideStageMessage();
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
    const playerState = GamePlayer.state;
    GameAttack.update(input, playerState);

    GameEnemy.checkProjectileCollisions(GameAttack.state.projectiles);
    const activated = GameChapter.checkProjectileActivation(GameAttack.state.projectiles);
    if (activated) {
      console.log('Game: objeto activado con proyectil.');
    }

    GameChapter.checkPortalEntry(playerState);
    GameEnemy.update();
    GameNPC.update(input, playerState);
    this.updateCharge(GameAttack.getCharge());

    GameUI.renderGameLayer([
      {
        x: playerState.x,
        y: playerState.y,
        width: playerState.width,
        height: playerState.height,
        className: 'player'
      },
      ...GameAttack.state.projectiles.map((projectile) => ({
        x: projectile.x,
        y: projectile.y,
        width: projectile.width,
        height: projectile.height,
        className: 'projectile'
      })),
      ...GameEnemy.getEnemies().map((enemy) => ({
        x: enemy.x,
        y: enemy.y,
        width: enemy.width,
        height: enemy.height,
        className: 'enemy'
      })),
      ...(GameEnemy.getBoss() ? [{
        x: GameEnemy.getBoss().x,
        y: GameEnemy.getBoss().y,
        width: GameEnemy.getBoss().width,
        height: GameEnemy.getBoss().height,
        className: 'boss'
      }] : []),
      ...GameChapter.getNPCs().map((npc) => ({
        x: npc.x,
        y: npc.y,
        width: npc.width,
        height: npc.height,
        className: 'npc'
      })),
      (() => {
        const object = GameChapter.getActiveObject();
        if (!object) {
          return [];
        }
        return [{
          x: object.x,
          y: object.y,
          width: object.width,
          height: object.height,
          className: 'activatable',
          active: object.activated
        }];
      })(),
      (() => {
        const portal = GameChapter.getPortal();
        if (!portal) {
          return [];
        }
        return [{
          x: portal.x,
          y: portal.y,
          width: portal.width,
          height: portal.height,
          className: 'portal'
        }];
      })()
    ].flat());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
