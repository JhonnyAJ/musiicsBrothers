window.GameInput = {
  state: {
    left: false,
    right: false,
    jump: false,
    charge: false,
    attack: false
  },
  init() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    console.log('GameInput: controles inicializados.');
  },
  onKeyDown(event) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.state.left = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.state.right = true;
        break;
      case 'Space':
      case 'KeyW':
      case 'ArrowUp':
        this.state.jump = true;
        break;
      case 'KeyE':
      case 'ShiftLeft':
        this.state.charge = true;
        break;
      case 'KeyF':
        this.state.attack = true;
        break;
    }
  },
  onKeyUp(event) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.state.left = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.state.right = false;
        break;
      case 'Space':
      case 'KeyW':
      case 'ArrowUp':
        this.state.jump = false;
        break;
      case 'KeyE':
      case 'ShiftLeft':
        this.state.charge = false;
        break;
      case 'KeyF':
        this.state.attack = false;
        break;
    }
  }
};
