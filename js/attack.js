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
  update(input, playerState) {
    if (input.charge) {
      this.state.isCharging = true;
      this.state.chargeLevel = Math.min(100, this.state.chargeLevel + 1);
    } else if (this.state.isCharging) {
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

    this.state.projectiles = this.state.projectiles.filter((projectile) => {
      projectile.x += projectile.vx;
      return projectile.x < 900;
    });
  },
  fireProjectile(playerState, power) {
    const speed = 5 + Math.floor(power / 20);
    const startX = playerState.x + playerState.width;
    const startY = playerState.y + playerState.height / 2 - 8;

    this.state.projectiles.push({
      x: startX,
      y: startY,
      vx: speed,
      power,
      width: 16,
      height: 16
    });
    console.log('GameAttack: proyectil lanzado con carga', power);
  },
  getCharge() {
    return this.state.chargeLevel;
  },
  clearProjectile(index) {
    this.state.projectiles.splice(index, 1);
  }
};
