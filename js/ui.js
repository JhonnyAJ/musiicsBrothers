window.GameUI = {
  elements: {},
  messageTimeout: null,
  init() {
    this.elements.charge = document.getElementById('hud-charge');
    this.elements.checkpoint = document.getElementById('hud-checkpoint');
    this.elements.life = document.getElementById('hud-life');
    this.elements.chapter = document.getElementById('hud-chapter');
    this.elements.dialoguePanel = document.getElementById('dialogue-panel');
    this.elements.dialogueText = document.getElementById('dialogue-text');
    this.elements.dialogueNext = document.getElementById('dialogue-next');
    this.elements.gameLayer = document.getElementById('game-layer');
    this.elements.stageMessage = document.querySelector('.stage-message');
    this.elements.interactionPrompt = document.getElementById('interaction-prompt');
    this.elements.chapterOverlay = document.getElementById('chapter-overlay');
    this.elements.fragments = document.getElementById('hud-fragments');
    this._floatingTexts = [];

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

    // Apply camera transform (translation + scale) to game layer if available
    if (window.GameCamera && this.elements.gameLayer) {
      const cam = window.GameCamera.state;
      // ensure transforms use top-left as origin so scale + translate math stays in world coords
      this.elements.gameLayer.style.transformOrigin = '0 0';
      this.elements.gameLayer.style.transform = `translate(${-Math.round(cam.x)}px, ${-Math.round(cam.y)}px) scale(${cam.zoom})`;
      this.elements.gameLayer.style.willChange = 'transform';
    }

    entities.forEach((entity) => {
      const element = document.createElement('div');
      element.className = `entity ${entity.className}`;
      // Entities are placed in world coordinates; camera translation moves the viewport
      element.style.left = `${entity.x}px`;
      element.style.top = `${entity.y}px`;
      element.style.width = `${entity.width}px`;
      element.style.height = `${entity.height}px`;
      if (entity.active) {
        element.classList.add('object-activated');
      }
      this.elements.gameLayer.appendChild(element);
    });

    // Render floating texts (world coordinates)
    const now = Date.now();
    this._floatingTexts = (this._floatingTexts || []).filter(ft => ft.expiresAt > now);
    (this._floatingTexts || []).forEach((ft) => {
      const el = document.createElement('div');
      el.className = 'floating-text';
      el.textContent = ft.text;
      el.style.left = `${ft.x}px`;
      el.style.top = `${ft.y}px`;
      this.elements.gameLayer.appendChild(el);
    });
  },

  showFloatingText(text, x, y, duration = 1200) {
    this._floatingTexts = this._floatingTexts || [];
    this._floatingTexts.push({ text, x, y, expiresAt: Date.now() + duration });
  },

  clearFloatingTexts() {
    this._floatingTexts = [];
  },
  hideStageMessage() {
    if (this.elements.stageMessage) {
      this.elements.stageMessage.classList.add('hidden');
    }
  },
  showStageMessage(message, timeout = 2500) {
    if (this.elements.stageMessage) {
      this.elements.stageMessage.textContent = message;
      this.elements.stageMessage.classList.remove('hidden');
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
      }
      this.messageTimeout = setTimeout(() => {
        this.hideStageMessage();
        this.messageTimeout = null;
      }, timeout);
    }
  },
  showInteractionPrompt(message) {
    if (this.elements.interactionPrompt) {
      this.elements.interactionPrompt.textContent = message;
      this.elements.interactionPrompt.classList.remove('hidden');
    }
  },
  hideInteractionPrompt() {
    if (this.elements.interactionPrompt) {
      this.elements.interactionPrompt.classList.add('hidden');
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
  setLife(lives) {
    if (this.elements.life) {
      this.elements.life.textContent = `Vidas: ${Math.max(0, lives)}`;
    }
  },
  setChapter(name) {
    if (this.elements.chapter) {
      this.elements.chapter.textContent = `Capítulo: ${name}`;
    }
  },
  setFragmentsCount(count) {
    if (this.elements.fragments) {
      this.elements.fragments.textContent = `Fragmentos: ${count}`;
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
  },
  showChapterTransition(message, timeout = 2200) {
    if (!this.elements.chapterOverlay) {
      return;
    }
    this.elements.chapterOverlay.textContent = message;
    this.elements.chapterOverlay.classList.remove('hidden');
    setTimeout(() => {
      this.hideChapterTransition();
    }, timeout);
  },
  hideChapterTransition() {
    if (this.elements.chapterOverlay) {
      this.elements.chapterOverlay.classList.add('hidden');
    }
  }
};
