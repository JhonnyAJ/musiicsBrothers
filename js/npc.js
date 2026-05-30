window.GameNPC = {
  state: {
    npcs: []
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
  update() {
    // Placeholder for NPC updates or proximity checks.
  }
};
