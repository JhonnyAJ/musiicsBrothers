window.GameCollectibles = {
  state: {
    fragments: [],
    collected: 0,
    collectedIds: {}
  },
  STORAGE_KEY: 'mb2_collected_fragments',
  init() {
    this.state.fragments = [];
    this.state.collected = 0;
    this.state.collectedIds = {};
    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw);
        if (Array.isArray(ids)) {
          ids.forEach((id) => { this.state.collectedIds[id] = true; });
          this.state.collected = ids.length;
        }
      }
    } catch (e) {
      console.warn('GameCollectibles: no se pudo leer sessionStorage', e);
    }
    console.log('GameCollectibles: inicializado.');
  },
  addFragment(fragment) {
    // fragment: { id, x, y, width, height }
    fragment.collected = !!this.state.collectedIds[fragment.id];
    this.state.fragments.push(fragment);
  },
  getFragments() {
    return this.state.fragments;
  },
  getCollectedCount() {
    return this.state.collected;
  },
  collectFragmentById(id) {
    const frag = this.state.fragments.find((f) => f.id === id);
    if (!frag || frag.collected) {
      return false;
    }
    frag.collected = true;
    this.state.collected += 1;
    this.state.collectedIds[id] = true;
    this.persist();
    console.log('GameCollectibles: fragmento recogido', id);
    return true;
  },
  persist() {
    try {
      const ids = Object.keys(this.state.collectedIds);
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn('GameCollectibles: no se pudo persistir sessionStorage', e);
    }
  },
  update(playerState) {
    // detect pickup collisions
    for (let i = 0; i < this.state.fragments.length; i += 1) {
      const fragment = this.state.fragments[i];
      if (fragment.collected) continue;
      const hit = playerState.x < fragment.x + fragment.width &&
                  playerState.x + playerState.width > fragment.x &&
                  playerState.y < fragment.y + fragment.height &&
                  playerState.y + playerState.height > fragment.y;
      if (hit) {
        this.collectFragmentById(fragment.id);
        if (window.GameUI && typeof window.GameUI.showStageMessage === 'function') {
          window.GameUI.showStageMessage('Fragmento temporal recogido.');
        }
        if (window.GameUI && typeof window.GameUI.setFragmentsCount === 'function') {
          window.GameUI.setFragmentsCount(this.getCollectedCount());
        }
      }
    }
  }
};
