window.GamePlayer = {
  state: {
    x: 80,
    y: 300,
    vx: 0,
    vy: 0,
    width: 32,
    height: 48,
    onGround: false,
    speed: 2.8,
    jumpStrength: 9.5,
    lives: 3,
    alive: true,
    invulnerableUntil: 0
  },
  init() {
    console.log('GamePlayer: inicializado.');
    this.setInvulnerable(2000);
  },
  update(input) {
    if (input.left) {
      this.state.vx = -this.state.speed;
    } else if (input.right) {
      this.state.vx = this.state.speed;
    } else {
      this.state.vx = 0;
    }

    if (!this.state.alive) {
      return;
    }

    if (input.jump && this.state.onGround) {
      this.state.vy = -this.state.jumpStrength;
      this.state.onGround = false;
    }

    this.state.vy += 0.3;
    const previousX = this.state.x;
    const previousY = this.state.y;
    this.state.x += this.state.vx;
    this.state.y += this.state.vy;

    const platforms = window.GameChapter && typeof window.GameChapter.getPlatforms === 'function'
      ? window.GameChapter.getPlatforms()
      : [];

    let landedOnPlatform = false;
    for (const platform of platforms) {
      const playerLeft = this.state.x;
      const playerRight = this.state.x + this.state.width;
      const playerTop = this.state.y;
      const playerBottom = this.state.y + this.state.height;
      const platformLeft = platform.x;
      const platformRight = platform.x + platform.width;
      const platformTop = platform.y;
      const platformBottom = platform.y + platform.height;

      const intersectsHorizontally = playerRight > platformLeft && playerLeft < platformRight;
      const wasAbovePlatform = previousY + this.state.height <= platformTop + 4;
      const isFallingOntoPlatform = this.state.vy >= 0 && playerBottom >= platformTop && playerBottom <= platformTop + 18;

      if (intersectsHorizontally && wasAbovePlatform && isFallingOntoPlatform) {
        this.state.y = platformTop - this.state.height;
        this.state.vy = 0;
        this.state.onGround = true;
        landedOnPlatform = true;
        break;
      }
    }

    if (!landedOnPlatform) {
      this.state.onGround = false;
    }

    if (this.state.y > (window.innerHeight || 600) + 80) {
      this.loseLife();
    }
  },
  isInvulnerable() {
    return Date.now() < this.state.invulnerableUntil;
  },
  setInvulnerable(durationMs) {
    this.state.invulnerableUntil = Date.now() + durationMs;
    if (window.GameUI && typeof GameUI.showStageMessage === 'function') {
      GameUI.showStageMessage('Invulnerable por 2 segundos');
    }
  },
  loseLife() {
    if (this.state.lives <= 0) {
      return;
    }

    this.state.lives -= 1;
    if (window.GameUI && typeof GameUI.setLife === 'function') {
      GameUI.setLife(this.state.lives);
    }

    if (this.state.lives <= 0) {
      this.state.alive = false;
      this.state.vx = 0;
      this.state.vy = 0;
      if (window.GameUI && typeof GameUI.showStageMessage === 'function') {
        GameUI.showStageMessage('Game Over. Vida 0 alcanzada.');
      }
      return;
    }

    this.resetAfterFall();
    if (window.GameUI && typeof GameUI.showStageMessage === 'function') {
      GameUI.showStageMessage(`Has perdido una vida. Vidas restantes: ${this.state.lives}`);
    }
  },
  resetAfterFall() {
    this.state.x = 80;
    this.state.y = 300;
    this.state.vx = 0;
    this.state.vy = 0;
    this.state.onGround = false;
    this.setInvulnerable(2000);
  }
};
