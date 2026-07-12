window.GameAttack = {
  state: {
    chargeLevel: 0,
    isCharging: false,
    projectiles: [],
    wasAttacking: false
  },
  init() {
    console.log('GameAttack: inicializado.');
  },
  getAttackModifiers() {
    if (!window.GameChapter) {
      return { speedBonus: 0, powerBonus: 0, sizeBonus: 0 };
    }
    const chapterIndex = window.GameChapter.state.currentIndex || 0;
    return {
      speedBonus: chapterIndex,
      powerBonus: chapterIndex * 10,
      sizeBonus: chapterIndex * 2
    };
  },
  update(input, playerState) {
    if (input.charge) {
      if (!this.state.isCharging) {
        if (window.GameUI && typeof GameUI.showFloatingText === 'function' && playerState) {
          GameUI.showFloatingText('Pose poderosa!!!', playerState.x + playerState.width / 2 - 24, playerState.y - 24, 1200);
        }
      }
      this.state.isCharging = true;
      this.state.chargeLevel = Math.min(100, this.state.chargeLevel + 1);
    } else if (this.state.isCharging) {
      if (window.GameUI && playerState) {
        if (typeof GameUI.clearFloatingTexts === 'function') {
          GameUI.clearFloatingTexts();
        }
        if (typeof GameUI.showFloatingText === 'function') {
          GameUI.showFloatingText('fu-ya', playerState.x + playerState.width / 2 - 12, playerState.y - 24, 900);
        }
      }
      this.fireProjectile(playerState, this.state.chargeLevel);
      this.state.isCharging = false;
      this.state.chargeLevel = 0;
    }

    if (input.attack && !this.state.wasAttacking) {
      const power = this.state.chargeLevel > 0 ? this.state.chargeLevel : 20;
      this.fireProjectile(playerState, power);
      this.state.wasAttacking = true;
      this.state.isCharging = false;
      this.state.chargeLevel = 0;
    }

    if (!input.attack) {
      this.state.wasAttacking = false;
    }

    const levelMaxX = window.GameChapter && typeof GameChapter.getCurrentChapter === 'function'
      ? Math.max(900, ...(GameChapter.getCurrentChapter().platforms || []).map((platform) => platform.x + platform.width))
      : 900;

    this.state.projectiles = this.state.projectiles.filter((projectile) => {
      projectile.x += projectile.vx;
      return projectile.x < levelMaxX + 220;
    });
  },
  fireProjectile(playerState, power) {
    if (!playerState) {
      return;
    }

    const modifiers = this.getAttackModifiers();
    const speed = 5 + Math.floor(power / 20) + modifiers.speedBonus;
    const projectileWidth = 16 + modifiers.sizeBonus;
    const projectileHeight = 16 + modifiers.sizeBonus;
    const startX = playerState.x + playerState.width;
    const startY = playerState.y + playerState.height / 2 - projectileHeight / 2;

    this.state.projectiles.push({
      x: startX,
      y: startY,
      vx: speed,
      power: power + modifiers.powerBonus,
      width: projectileWidth,
      height: projectileHeight
    });

    if (window.GamePlayer && typeof GamePlayer.startAttackAnimation === 'function') {
      GamePlayer.startAttackAnimation();
    }

    console.log('GameAttack: proyectil lanzado con carga', power, 'modificado a', power + modifiers.powerBonus);
  },
  getCharge() {
    return this.state.chargeLevel;
  },
  clearProjectile(index) {
    this.state.projectiles.splice(index, 1);
  }
};
