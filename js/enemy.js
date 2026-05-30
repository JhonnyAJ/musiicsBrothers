window.GameEnemy = {
  state: {
    enemies: [],
    boss: null
  },
  init() {
    this.state.enemies = [];
    this.state.boss = null;
    this.spawnEnemy(620, 304);
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
  },
  checkProjectileCollisions(projectiles) {
    this.state.enemies = this.state.enemies.filter((enemy) => {
      const hit = projectiles.some((projectile) => {
        return projectile.x < enemy.x + enemy.width &&
               projectile.x + projectile.width > enemy.x &&
               projectile.y < enemy.y + enemy.height &&
               projectile.y + projectile.height > enemy.y;
      });
      return !hit;
    });
  }
};
