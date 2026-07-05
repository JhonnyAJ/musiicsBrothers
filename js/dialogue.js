window.GameDialogue = {
  state: {
    lines: [],
    currentLine: 0,
    active: false,
    onComplete: null
  },
  init() {
    this.state.lines = [];
    this.state.currentLine = 0;
    this.state.active = false;
    this.state.onComplete = null;
    this.state.sourceNpcId = null;
    console.log('GameDialogue: inicializado.');
  },
  setLines(lines) {
    this.state.lines = lines;
    this.state.currentLine = 0;
  },
  start() {
    if (this.state.lines.length > 0) {
      this.state.active = true;
      GameUI.showDialogue(this.state.lines[this.state.currentLine]);
    }
  },
  next() {
    if (!this.state.active) {
      return;
    }
    this.state.currentLine += 1;
    if (this.state.currentLine < this.state.lines.length) {
      GameUI.showDialogue(this.state.lines[this.state.currentLine]);
    } else {
      this.state.active = false;
      GameUI.hideDialogue();
      if (typeof this.state.onComplete === 'function') {
        this.state.onComplete();
        this.state.onComplete = null;
      }
    }
  }
};
