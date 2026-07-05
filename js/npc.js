window.GameNPC = {
  state: {
    npcs: [],
    interactDistance: 120,
    interactPressed: false,
    canInteract: false
  },
  init() {
    this.state.npcs = [];
    console.log('GameNPC: inicializado.');
  },
  addNPC(npc) {
    this.state.npcs.push(npc);
  },
  getNPCs() {
    return this.state.npcs;
  },
  update(input, playerState) {
    const npcs = GameChapter.getNPCs();
    let closest = null;
    let closestDistance = Infinity;

    npcs.forEach((npc) => {
      const dx = npc.x - playerState.x;
      const dy = npc.y - playerState.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.state.interactDistance && distance < closestDistance) {
        closestDistance = distance;
        closest = npc;
      }
    });

    if (closest && !GameDialogue.state.active) {
      this.state.canInteract = true;
      GameUI.showInteractionPrompt(`Presiona Q para hablar con ${closest.name}`);
      if (input.interact && !this.state.interactPressed) {
        GameChapter.startDialogueForNPC(closest.id);
      }
    } else {
      this.state.canInteract = false;
      GameUI.hideInteractionPrompt();
    }

    this.state.interactPressed = input.interact;
  }
};
