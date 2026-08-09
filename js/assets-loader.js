window.AssetsLoader = {
  assets: {},
  preload(callback) {
    const manifest = {
      'milly-run-1': 'assets/sprites/milly/Milly-Run1.png',
      'milly-run-2': 'assets/sprites/milly/Milly-Run2.png',
      'milly-run-3': 'assets/sprites/milly/Milly-Run3.png',
      'milly-stop': 'assets/sprites/milly/Milly-Stop.png',
      'milly-jump-1': 'assets/sprites/milly/Milly-Jump1.png',
      'milly-jump-2': 'assets/sprites/milly/Milly-Jump2.png',
      'milly-inactiva': 'assets/sprites/milly/Milly-Inactiva.png',
      'milly-pose-poderosa': 'assets/sprites/milly/Milly-posePoderosa.png',
      'milly-fuya': 'assets/sprites/milly/Milly-fuya.png',
      'Milly_Ouch': 'assets/sprites/milly/Milly_Ouch.png',
      'aldeano': 'assets/sprites/extras/Aldeano.png',
      'aldeano-talking': 'assets/sprites/extras/AldeanoTalking.png',
      'enemy-shooter': 'assets/sprites/enemy/shooterEnemy1.png',
      'enemy-shooting': 'assets/sprites/enemy/ShootingEnemy.png',
      'enemy-died': 'assets/sprites/enemy/diedEnemy.png'
    };

    const assetNames = Object.keys(manifest);
    if (!assetNames.length) {
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }

    let pending = assetNames.length;
    console.log('AssetsLoader: cargando recursos de Milly.');

    assetNames.forEach((name) => {
      const image = new Image();
      image.onload = () => {
        this.assets[name] = this.makeTransparent(image, [255, 0, 255], 40);
        pending -= 1;
        if (pending === 0 && typeof callback === 'function') {
          callback();
        }
      };
      image.onerror = () => {
        this.assets[name] = null;
        pending -= 1;
        if (pending === 0 && typeof callback === 'function') {
          callback();
        }
      };
      image.src = manifest[name];
    });
  },
  makeTransparent(image, targetColor, tolerance) {
    const canvas = document.createElement('canvas');
    const width = image.naturalWidth || image.width || 32;
    const height = image.naturalHeight || image.height || 48;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    const [targetR, targetG, targetB] = targetColor;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];
      const diff = Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB);
      if (alpha > 0 && diff <= tolerance) {
        data[i + 3] = 0;
      }
    }

    context.putImageData(imageData, 0, 0);

    const processedImage = new Image();
    processedImage.src = canvas.toDataURL('image/png');
    return processedImage;
  },
  getAsset(name) {
    return this.assets[name] || null;
  }
};
