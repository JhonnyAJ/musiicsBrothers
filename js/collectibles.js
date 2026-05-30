window.GameCollectibles = {
  state: {
    fragments: [],
    collected: 0
  },
  init() {
    this.state.fragments = [];
    this.state.collected = 0;
    console.log('GameCollectibles: inicializado.');
  },
  addFragment(fragment) {
    this.state.fragments.push(fragment);
  },
  collectFragment(index) {
    const fragment = this.state.fragments[index];
    if (fragment && !fragment.collected) {
      fragment.collected = true;
      this.state.collected += 1;
      console.log('GameCollectibles: fragmento recogido', index);
    }
  }
};
