window.GameAttack = {
  state: {
    chargeLevel: 0,
    isCharging: false,
    ready: false,
    projectiles: []
  },
  init() {
    console.log('GameAttack: inicializado.');
  },
  update(input) {
    if (input.charge) {
      this.state.isCharging = true;
      this.state.chargeLevel = Math.min(100, this.state.chargeLevel + 0.8);
    } else if (this.state.isCharging) {
      this.fireProjectile();
      this.state.isCharging = false;
      this.state.chargeLevel = 0;
    }
    this.state.projectiles = this.state.projectiles.filter((projectile) => {
      projectile.x += projectile.vx;
      return projectile.x < 900;
    });
  },
  fireProjectile() {
    const speed = 5 + Math.floor(this.state.chargeLevel / 20);
    this.state.projectiles.push({ x: 130, y: 280, vx: speed, power: this.state.chargeLevel });
    console.log('GameAttack: proyectil lanzado con carga', this.state.chargeLevel);
  },
  getCharge() {
    return this.state.chargeLevel;
  }
};
