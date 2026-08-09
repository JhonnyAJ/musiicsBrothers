window.GameCamera = {
  state: {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    lerp: 0.44,
    minX: 0,
    minY: 0,
    marginX: 170,
    marginY: 70,
    // zoom state (1 = no zoom). targetZoom can be changed via API.
    zoom: 1.5,
    targetZoom: 1.5,
    minZoom: 1.4,
    maxZoom: 2.0,
    zoomLerp: 0.24
  },
  init() {
    window.addEventListener('resize', () => {
      this.state.width = window.innerWidth;
      this.state.height = window.innerHeight;
    });
  },
  update(target) {
    if (!target) return;
    const s = this.state;
    // compute visible area in world coordinates based on current zoom
    const visibleW = Math.floor(s.width / s.zoom);
    const visibleH = Math.floor(s.height / s.zoom);
    const desiredX = Math.max(s.minX, Math.floor(target.x + target.width / 2 - visibleW / 2 - s.marginX));
    const desiredY = Math.max(s.minY, Math.floor(target.y + target.height / 2 - visibleH / 2 - s.marginY));
    s.x += (desiredX - s.x) * s.lerp;
    s.y += (desiredY - s.y) * s.lerp;
    if (s.x < s.minX) s.x = s.minX;
    if (s.y < s.minY) s.y = s.minY;

    // smooth zoom towards targetZoom
    // clamp targetZoom first
    if (s.targetZoom < s.minZoom) s.targetZoom = s.minZoom;
    if (s.targetZoom > s.maxZoom) s.targetZoom = s.maxZoom;
    s.zoom += (s.targetZoom - s.zoom) * s.zoomLerp;
  },
  setBounds(minX, minY) {
    this.state.minX = minX || 0;
    this.state.minY = minY || 0;
  }
  ,
  // Public API to change zoom target quickly
  setTargetZoom(z) {
    if (!z || typeof z !== 'number') return;
    this.state.targetZoom = Math.min(this.state.maxZoom, Math.max(this.state.minZoom, z));
  },
  setZoomBounds(minZ, maxZ) {
    if (typeof minZ === 'number') this.state.minZoom = minZ;
    if (typeof maxZ === 'number') this.state.maxZoom = maxZ;
    if (this.state.targetZoom < this.state.minZoom) this.state.targetZoom = this.state.minZoom;
    if (this.state.targetZoom > this.state.maxZoom) this.state.targetZoom = this.state.maxZoom;
  }
};
