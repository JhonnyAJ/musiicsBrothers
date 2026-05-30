window.AssetsLoader = {
  assets: {},
  preload(callback) {
    // Placeholder for asset preloading logic.
    console.log('AssetsLoader: inicializando carga de recursos.');
    if (typeof callback === 'function') {
      callback();
    }
  },
  getAsset(name) {
    return this.assets[name] || null;
  }
};
