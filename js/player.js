window.GamePlayer = {
  state: {
    x: 100,
    y: 300,
    vx: 0,
    vy: 0,
    width: 32,
    height: 48,
    onGround: true,
    speed: 2.8,
    jumpStrength: 7.2
  },
  init() {
    console.log('GamePlayer: inicializado.');
  },
  update(input) {
    if (input.left) {
      this.state.vx = -this.state.speed;
    } else if (input.right) {
      this.state.vx = this.state.speed;
    } else {
      this.state.vx = 0;
    }

    if (input.jump && this.state.onGround) {
      this.state.vy = -this.state.jumpStrength;
      this.state.onGround = false;
    }

    this.state.vy += 0.3;
    this.state.x += this.state.vx;
    this.state.y += this.state.vy;

    if (this.state.y >= 300) {
      this.state.y = 300;
      this.state.vy = 0;
      this.state.onGround = true;
    }
  }
};
