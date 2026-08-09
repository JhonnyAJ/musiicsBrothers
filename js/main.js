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
      if (window.GameCamera && typeof window.GameCamera.init === 'function') {
        GameCamera.init();
      }
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
      if (window.GamePlayer && GamePlayer.state && typeof GameUI.setLife === 'function') {
        GameUI.setLife(GamePlayer.state.lives);
      }
      this.updateCharge(0);
      GameUI.hideStageMessage();
      this.state.loaded = true;
      this.startLoop();
    });
  },
  setChapter(name) {
    this.state.chapter = name;
    GameUI.setChapter(name);
    // Load fragments for the current chapter into collectibles
    if (window.GameCollectibles && typeof GameChapter.getCurrentChapter === 'function') {
      // Reset collectibles fragments and load chapter fragments
      GameCollectibles.state.fragments = [];
      const frags = GameChapter.getCurrentChapter().fragments || [];
      frags.forEach((f) => {
        GameCollectibles.addFragment(Object.assign({}, f));
      });
      if (GameUI && typeof GameUI.setFragmentsCount === 'function') {
        GameUI.setFragmentsCount(GameCollectibles.getCollectedCount());
      }
    }
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

    if (window.GameEnemy && typeof GameEnemy.checkPlayerCollision === 'function') {
      GameEnemy.checkPlayerCollision(playerState);
    }

    GameAttack.update(input, playerState);

    // Update camera to follow player
    if (window.GameCamera && typeof GameCamera.update === 'function') {
      GameCamera.update(playerState);
    }

    GameEnemy.checkProjectileCollisions(GameAttack.state.projectiles);
    GameEnemy.checkPlayerProjectileCollision(playerState);
    const activated = GameChapter.checkProjectileActivation(GameAttack.state.projectiles);
    if (activated) {
      console.log('Game: objeto activado con proyectil.');
    }

    GameChapter.checkPortalEntry(playerState);
    // Update collectibles (pickup detection)
    if (window.GameCollectibles && typeof GameCollectibles.update === 'function') {
      GameCollectibles.update(playerState);
    }

    GameEnemy.update(playerState);
    GameNPC.update(input, playerState);
    this.updateCharge(GameAttack.getCharge());

    const buildEntities = () => {
      const entities = [];
      const playerRenderState = window.GamePlayer && typeof GamePlayer.getRenderState === 'function'
        ? GamePlayer.getRenderState()
        : { x: playerState.x, y: playerState.y, width: playerState.width, height: playerState.height, className: 'player' };
      entities.push(playerRenderState);
      entities.push(...GameAttack.state.projectiles.map((p) => ({ x: p.x, y: p.y, width: p.width, height: p.height, className: 'projectile' })));
      entities.push(...(GameChapter.getPlatforms() || []).map((platform) => ({ x: platform.x, y: platform.y, width: platform.width, height: platform.height, className: 'platform' })));
      entities.push(...GameEnemy.getRenderEnemies());
      const boss = GameEnemy.getBoss();
      if (boss) entities.push({ x: boss.x, y: boss.y, width: boss.width, height: boss.height, className: 'boss' });
      entities.push(...GameEnemy.getEnemyProjectiles().map((p) => ({ x: p.x, y: p.y, width: p.width, height: p.height, className: 'enemy-projectile' })));
      entities.push(...GameChapter.getNPCs().map((npc) => ({ x: npc.x, y: npc.y, width: npc.width, height: npc.height, className: 'npc', sprite: npc.sprite || null, flipX: !!npc.flipX })));
      const object = GameChapter.getActiveObject();
      if (object) entities.push({ x: object.x, y: object.y, width: object.width, height: object.height, className: 'activatable', active: object.activated });
      const portal = GameChapter.getPortal();
      if (portal) entities.push({ x: portal.x, y: portal.y, width: portal.width, height: portal.height, className: 'portal' });
      entities.push(...GameCollectibles.getFragments().filter(f => !f.collected).map((f) => ({ x: f.x, y: f.y, width: f.width, height: f.height, className: 'fragment' })));
      return entities;
    };

    GameUI.renderGameLayer(buildEntities());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
