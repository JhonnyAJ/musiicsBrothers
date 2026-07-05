window.GameEnemy = {
  state: {
    enemies: [],
    boss: null,
    enemyProjectiles: [],
    lastShotAt: 0,
    shotInterval: 2200
  },
  init() {
    this.state.enemies = [];
    this.state.boss = null;
    this.state.enemyProjectiles = [];
    this.state.lastShotAt = 0;
    if (GameChapter && typeof GameChapter.getCurrentChapter === 'function') {
      this.setupChapterEnemies(GameChapter.getCurrentChapter().name);
    }
    console.log('GameEnemy: inicializado.');
  },
  setupChapterEnemies(chapterName) {
    this.state.enemies = [];
    this.state.boss = null;

    // Use chapter platforms to place enemies so positions remain consistent with level layout
    if (window.GameChapter && typeof GameChapter.getCurrentChapter === 'function') {
      const chap = GameChapter.getCurrentChapter();
      const plats = chap.platforms || [];
      if (chapterName === 'Torre del Tiempo') {
        // Boss positioned near portal/top area
        const portal = chap.portal || { x: 700, y: 260 };
        this.state.boss = {
          x: portal.x - 80,
          y: portal.y - 40,
          width: 48,
          height: 48,
          hp: 1,
          defeated: false,
          revealed: false
        };
      } else {
        // Spawn 1-2 enemies on platforms that are not in the first column
        const eligiblePlatforms = plats.filter((platform) => platform.x > 120);
        if (eligiblePlatforms.length >= 2) {
          const idx1 = Math.floor(eligiblePlatforms.length * 0.4);
          const idx2 = Math.floor(eligiblePlatforms.length * 0.8);
          const p1 = eligiblePlatforms[Math.min(eligiblePlatforms.length - 1, idx1)];
          const p2 = eligiblePlatforms[Math.min(eligiblePlatforms.length - 1, idx2)];
          if (p1) this.spawnEnemy(p1.x + 12, p1.y - 32);
          if (p2) this.spawnEnemy(p2.x + 12, p2.y - 32);
        } else if (eligiblePlatforms.length === 1) {
          const p = eligiblePlatforms[0];
          this.spawnEnemy(p.x + 12, p.y - 32);
        } else if (plats.length >= 2) {
          const p1 = plats[1];
          const p2 = plats[2] || plats[1];
          this.spawnEnemy(p1.x + 12, p1.y - 32);
          this.spawnEnemy(p2.x + 12, p2.y - 32);
        } else {
          // fallback
          this.spawnEnemy(620, 304);
        }

        // Also spawn a couple of static (non-shooting) enemies that require multiple hits to kill
        try {
          // choose platforms that are not in the first column (x > 120)
          const eligible = (plats || []).filter((platform) => platform.x > 120);
          const maxStatic = Math.min(4, eligible.length);
          const used = new Set();
          for (let i = 0; i < maxStatic; i += 1) {
            const idx = Math.floor(((i + 1) / (maxStatic + 1)) * eligible.length);
            const p = eligible[Math.min(eligible.length - 1, Math.max(0, idx))];
            if (!p) continue;
            const key = `${p.x}:${p.y}`;
            if (used.has(key)) continue;
            used.add(key);
            this.state.enemies.push({ x: p.x + 12, y: p.y - 32, hp: 3, width: 32, height: 32, canShoot: false });
          }
        } catch (e) {
          // ignore non-critical errors
        }
      }
    }
  },
  spawnEnemy(x, y) {
    this.state.enemies.push({ x, y, hp: 1, width: 32, height: 32, canShoot: true });
  },
  setBoss(boss) {
    this.state.boss = boss;
  },
  update(playerState) {
    const now = Date.now();
    if (this.state.boss && !this.state.boss.defeated) {
      const drift = Math.sin(now / 600) * 0.5;
      this.state.boss.x += drift;
    }

    if (!playerState || !playerState.alive) {
      return;
    }

    if (now - this.state.lastShotAt >= this.state.shotInterval) {
      this.state.lastShotAt = now;
      this.fireEnemyProjectiles(playerState);
    }

    const levelMaxX = window.GameChapter && typeof GameChapter.getCurrentChapter === 'function'
      ? Math.max(900, ...(GameChapter.getCurrentChapter().platforms || []).map((platform) => platform.x + platform.width))
      : 900;

    this.state.enemyProjectiles = this.state.enemyProjectiles.filter((projectile) => {
      projectile.x += projectile.vx;
      projectile.y += projectile.vy;
      return projectile.x >= -100 && projectile.x <= levelMaxX + 220 && projectile.y >= -100 && projectile.y <= (window.innerHeight || 600) + 220;
    });
  },
  getEnemies() {
    return this.state.enemies;
  },
  getBoss() {
    return this.state.boss && !this.state.boss.defeated ? this.state.boss : null;
  },
  getEnemyProjectiles() {
    return this.state.enemyProjectiles;
  },
  fireEnemyProjectiles(playerState) {
    const enemies = [...this.state.enemies];
    if (this.state.boss && !this.state.boss.defeated) {
      enemies.push(this.state.boss);
    }

    const shooters = enemies.filter((enemy) => enemy.canShoot !== false);
    shooters.forEach((enemy) => {
      const startX = enemy.x + enemy.width / 2;
      const startY = enemy.y + enemy.height / 2;
      const dx = playerState.x + playerState.width / 2 - startX;
      const dy = playerState.y + playerState.height / 2 - startY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const currentName = (window.GameChapter && typeof GameChapter.getCurrentChapter === 'function') ? GameChapter.getCurrentChapter().name : null;
      const speed = currentName === 'Aldea Perdida' ? 2.2 : 3.2;
      const vx = (dx / distance) * speed;
      const vy = (dy / distance) * speed;
      this.state.enemyProjectiles.push({
        x: startX,
        y: startY,
        vx,
        vy,
        width: 18,
        height: 18,
        power: 1
      });
    });
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

      // Apply damage to first matching enemy; enemies may require multiple hits (hp)
      let handled = false;
      for (let j = this.state.enemies.length - 1; j >= 0; j -= 1) {
        const enemy = this.state.enemies[j];
        const collided = projectile.x < enemy.x + enemy.width &&
                          projectile.x + projectile.width > enemy.x &&
                          projectile.y < enemy.y + enemy.height &&
                          projectile.y + projectile.height > enemy.y;
        if (collided) {
          // damage by projectile.power (fallback 1)
          let dmg = projectile.power && typeof projectile.power === 'number' ? projectile.power : 1;
          // static (non-shooting) enemies always take 1 damage per hit regardless of projectile power
          if (enemy.canShoot === false) {
            dmg = 1;
          }
          enemy.hp = (enemy.hp || 1) - dmg;
          projectiles.splice(i, 1);
          handled = true;
          if (enemy.hp <= 0) {
            this.state.enemies.splice(j, 1);
          }
          break;
        }
      }
      if (handled) {
        continue;
      }
    }
  },

  checkPlayerCollision(playerState) {
    if (!playerState || !playerState.alive) {
      return false;
    }

    const playerLeft = playerState.x;
    const playerRight = playerState.x + playerState.width;
    const playerTop = playerState.y;
    const playerBottom = playerState.y + playerState.height;

    const allEnemies = [...this.state.enemies];
    const boss = this.getBoss();
    if (boss) {
      allEnemies.push(boss);
    }

    const collided = allEnemies.some((enemy) => {
      return playerRight > enemy.x &&
             playerLeft < enemy.x + enemy.width &&
             playerBottom > enemy.y &&
             playerTop < enemy.y + enemy.height;
    });

    const dialogueInvulnerable = window.GameDialogue && GameDialogue.state && GameDialogue.state.active && GameDialogue.state.sourceNpcId === 'aldeana';
    const timeInvulnerable = window.GamePlayer && typeof GamePlayer.isInvulnerable === 'function' && GamePlayer.isInvulnerable();
    if (collided && window.GamePlayer && typeof GamePlayer.loseLife === 'function' && !timeInvulnerable && !dialogueInvulnerable) {
      GamePlayer.loseLife();
      return true;
    }

    return false;
  },

  checkPlayerProjectileCollision(playerState) {
    if (!playerState || !playerState.alive) {
      return false;
    }

    const playerLeft = playerState.x;
    const playerRight = playerState.x + playerState.width;
    const playerTop = playerState.y;
    const playerBottom = playerState.y + playerState.height;

    for (let i = this.state.enemyProjectiles.length - 1; i >= 0; i -= 1) {
      const projectile = this.state.enemyProjectiles[i];
      const hitPlayer = playerRight > projectile.x &&
        playerLeft < projectile.x + projectile.width &&
        playerBottom > projectile.y &&
        playerTop < projectile.y + projectile.height;

      if (hitPlayer) {
        this.state.enemyProjectiles.splice(i, 1);
        const dialogueInv = window.GameDialogue && GameDialogue.state && GameDialogue.state.active && GameDialogue.state.sourceNpcId === 'aldeana';
        const timeInv = window.GamePlayer && typeof GamePlayer.isInvulnerable === 'function' && GamePlayer.isInvulnerable();
        if (window.GamePlayer && typeof GamePlayer.loseLife === 'function' && !timeInv && !dialogueInv) {
          GamePlayer.loseLife();
        }
        return true;
      }
    }

    return false;
  }
};
