window.GameUI = {
  elements: {},
  init() {
    this.elements.charge = document.getElementById('hud-charge');
    this.elements.checkpoint = document.getElementById('hud-checkpoint');
    this.elements.chapter = document.getElementById('hud-chapter');
    this.elements.dialoguePanel = document.getElementById('dialogue-panel');
    this.elements.dialogueText = document.getElementById('dialogue-text');
    this.elements.dialogueNext = document.getElementById('dialogue-next');

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
