window.GameEnemy = {
  state: {
    enemies: [],
    boss: null
  },
  init() {
    this.state.enemies = [];
    this.state.boss = null;
    console.log('GameEnemy: inicializado.');
  },
  spawnEnemy(x, y) {
    this.state.enemies.push({ x, y, hp: 1, width: 32, height: 32 });
  },
  setBoss(boss) {
    this.state.boss = boss;
  },
  update() {
    // Placeholder for enemy and boss behavior.
  },
  getEnemies() {
    return this.state.enemies;
  }
};
