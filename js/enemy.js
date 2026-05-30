window.GameEnemy = {
  state: {
    enemies: [],
    boss: null
  },
  init() {
    this.state.enemies = [];
    this.state.boss = null;
    if (GameChapter && typeof GameChapter.getCurrentChapter === 'function') {
      this.setupChapterEnemies(GameChapter.getCurrentChapter().name);
    }
    console.log('GameEnemy: inicializado.');
  },
  setupChapterEnemies(chapterName) {
    this.state.enemies = [];
    this.state.boss = null;

    switch (chapterName) {
      case 'Aldea Perdida':
        this.spawnEnemy(620, 304);
        break;
      case 'Bosque de los Ecos':
        this.spawnEnemy(600, 304);
        this.spawnEnemy(680, 304);
        break;
      case 'Torre del Tiempo':
        this.state.boss = {
          x: 700,
          y: 260,
          width: 48,
          height: 48,
          hp: 1,
          defeated: false,
          revealed: false
        };
        break;
      default:
        this.spawnEnemy(620, 304);
    }
  },
  spawnEnemy(x, y) {
    this.state.enemies.push({ x, y, hp: 1, width: 32, height: 32 });
  },
  setBoss(boss) {
    this.state.boss = boss;
  },
  update() {
    if (!this.state.boss || this.state.boss.defeated) {
      return;
    }
    const drift = Math.sin(Date.now() / 600) * 0.5;
    this.state.boss.x += drift;
  },
  getEnemies() {
    return this.state.enemies;
  },
  getBoss() {
    return this.state.boss && !this.state.boss.defeated ? this.state.boss : null;
  },
  checkProjectileCollisions(projectiles) {
    for (let i = projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = projectiles[i];
      if (this.state.boss && !this.state.boss.defeated) {
        const boss = this.state.boss;
        const hitBoss = projectile.x < boss.x + boss.width &&
          projectile.x + projectile.width > boss.x &&
          projectile.y < boss.y + boss.height &&
          projectile.y + projectile.height > boss.y;

        if (hitBoss) {
          boss.revealed = true;
          boss.hp -= 1;
          projectiles.splice(i, 1);
          GameUI.showStageMessage('Has herido a la guardia lejana del Rey Monster. Él te observa desde la sombra.');
          if (boss.hp <= 0) {
            boss.defeated = true;
            GameUI.showStageMessage('La guarda del Rey Monster ha sentido tu poder. Él sigue en las sombras.');
          }
          continue;
        }
      }

      const hitEnemy = this.state.enemies.some((enemy) => {
        return projectile.x < enemy.x + enemy.width &&
               projectile.x + projectile.width > enemy.x &&
               projectile.y < enemy.y + enemy.height &&
               projectile.y + projectile.height > enemy.y;
      });

      if (hitEnemy) {
        projectiles.splice(i, 1);
        this.state.enemies = this.state.enemies.filter((enemy) => {
          return !(projectile.x < enemy.x + enemy.width &&
                   projectile.x + projectile.width > enemy.x &&
                   projectile.y < enemy.y + enemy.height &&
                   projectile.y + projectile.height > enemy.y);
        });
      }
    }
  }
};
