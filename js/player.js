window.GamePlayer = {
  state: {
    x: 80,
    y: 300,
    vx: 0,
    vy: 0,
    width: 40,
    height: 56,
    onGround: false,
    speed: 2.8,
    jumpStrength: 9.5,
    lives: 3,
    alive: true,
    invulnerableUntil: 0,
    hurtUntil: 0,
    animationState: 'idle',
    lastInputAt: 0,
    attackAnimationUntil: 0,
    facing: 1
  },
  init() {
    console.log('GamePlayer: inicializado.');
    this.state.lastInputAt = Date.now();
    this.setInvulnerable(2000);
  },
  update(input) {
    const now = Date.now();

    if (input.left) {
      this.state.vx = -this.state.speed;
      this.state.facing = -1;
    } else if (input.right) {
      this.state.vx = this.state.speed;
      this.state.facing = 1;
    } else {
      this.state.vx = 0;
    }

    if (!this.state.alive) {
      return;
    }

    if (input.left || input.right || input.jump || input.charge || input.attack) {
      this.state.lastInputAt = now;
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
      return;
    }

    this.updateAnimationState(now);
  },
  updateAnimationState(now) {
    const chargeActive = Boolean((window.GameAttack && window.GameAttack.state && window.GameAttack.state.isCharging) || (window.GameInput && window.GameInput.state && window.GameInput.state.charge));
    const attackActive = now < this.state.attackAnimationUntil;

    if (now < this.state.hurtUntil) {
      this.state.animationState = 'ouch';
    } else if (attackActive) {
      this.state.animationState = 'attack';
    } else if (chargeActive) {
      this.state.animationState = 'charge';
    } else if (!this.state.onGround) {
      this.state.animationState = 'jump';
    } else if (Math.abs(this.state.vx) > 0.1) {
      this.state.animationState = 'run';
    } else if (now - this.state.lastInputAt > 3000) {
      this.state.animationState = 'inactive';
    } else {
      this.state.animationState = 'idle';
    }
  },
  getAnimationAssetName() {
    const now = Date.now();
    if (now < this.state.hurtUntil) {
      return 'Milly_Ouch';
    }
    switch (this.state.animationState) {
      case 'run':
        return ['milly-run-1', 'milly-run-2', 'milly-run-3'][Math.floor(Date.now() / 120) % 3];
      case 'jump':
        return this.state.vy < 0 ? 'milly-jump-1' : 'milly-jump-2';
      case 'charge':
        return 'milly-pose-poderosa';
      case 'attack':
        return 'milly-fuya';
      case 'inactive':
        return 'milly-inactiva';
      default:
        return 'milly-stop';
    }
  },
  startAttackAnimation(durationMs = 220) {
    this.state.attackAnimationUntil = Date.now() + durationMs;
    this.state.animationState = 'attack';
  },
  getRenderState() {
    const now = Date.now();
    const isBlinking = this.isInvulnerable() && this.state.alive;
    return {
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height,
      className: 'player',
      sprite: this.getAnimationAssetName(),
      flipX: this.state.facing < 0,
      opacity: isBlinking ? (Math.floor(now / 120) % 2 === 0 ? 0.35 : 1) : 1
    };
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
  takeHit() {
    const now = Date.now();
    if (this.isInvulnerable() || !this.state.alive) {
      return false;
    }

    this.state.lives = Math.max(0, this.state.lives - 1);
    this.state.invulnerableUntil = now + 2000;
    this.state.hurtUntil = now + 1000;
    this.state.animationState = 'ouch';
    this.state.lastInputAt = now;

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
    } else if (window.GameUI && typeof GameUI.showStageMessage === 'function') {
      GameUI.showStageMessage('¡Milly ha sido golpeada!');
    }

    return true;
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
    this.state.animationState = 'idle';
    this.state.attackAnimationUntil = 0;
    this.state.lastInputAt = Date.now();
    this.setInvulnerable(2000);
  }
};
