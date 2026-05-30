window.GameUI = {
  elements: {},
  init() {
    this.elements.charge = document.getElementById('hud-charge');
    this.elements.checkpoint = document.getElementById('hud-checkpoint');
    this.elements.chapter = document.getElementById('hud-chapter');
    this.elements.dialoguePanel = document.getElementById('dialogue-panel');
    this.elements.dialogueText = document.getElementById('dialogue-text');
    this.elements.dialogueNext = document.getElementById('dialogue-next');
    this.elements.gameLayer = document.getElementById('game-layer');
    this.elements.stageMessage = document.querySelector('.stage-message');

    if (this.elements.dialogueNext) {
      this.elements.dialogueNext.addEventListener('click', () => {
        if (window.GameDialogue && typeof window.GameDialogue.next === 'function') {
          window.GameDialogue.next();
        } else {
          this.hideDialogue();
        }
      });
    }

    console.log('GameUI: inicializado.');
  },
  clearGameLayer() {
    if (this.elements.gameLayer) {
      this.elements.gameLayer.innerHTML = '';
    }
  },
  renderGameLayer(entities) {
    if (!this.elements.gameLayer) {
      return;
    }
    this.clearGameLayer();

    entities.forEach((entity) => {
      const element = document.createElement('div');
      element.className = `entity ${entity.className}`;
      element.style.left = `${entity.x}px`;
      element.style.top = `${entity.y}px`;
      element.style.width = `${entity.width}px`;
      element.style.height = `${entity.height}px`;
      if (entity.active) {
        element.classList.add('object-activated');
      }
      this.elements.gameLayer.appendChild(element);
    });
  },
  hideStageMessage() {
    if (this.elements.stageMessage) {
      this.elements.stageMessage.classList.add('hidden');
    }
  },
  setCharge(percent) {
    if (this.elements.charge) {
      this.elements.charge.textContent = `Carga: ${Math.round(percent)}%`;
    }
  },
  setCheckpoint(index) {
    if (this.elements.checkpoint) {
      this.elements.checkpoint.textContent = `Checkpoint: ${index}`;
    }
  },
  setChapter(name) {
    if (this.elements.chapter) {
      this.elements.chapter.textContent = `Capítulo: ${name}`;
    }
  },
  showDialogue(message) {
    if (this.elements.dialoguePanel && this.elements.dialogueText) {
      this.elements.dialogueText.textContent = message;
      this.elements.dialoguePanel.classList.remove('hidden');
    }
  },
  hideDialogue() {
    if (this.elements.dialoguePanel) {
      this.elements.dialoguePanel.classList.add('hidden');
    }
  }
};
