export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    console.log('Boot.preload()');

    let url = 'src/assets/typescript-phaser-rpg-2d/';

    this.load.tilemapTiledJSON('map', url + 'map.json');

    url = 'src/assets/typescript-phaser-rpg-2d/tiny-swords-update-010/Terrain/';

    this.loadMap('landFlatImg', url + 'Ground/Tilemap_Flat.png');
    this.loadMap('bridgeImg', url + 'Bridge/Bridge_All.png');
    this.loadMap('foamImg', url + 'Water/Foam/Foam.png');
    this.loadMap('invisibleWallImg', url + 'invisible_wall.png');
    this.loadMap('landElevationImg', url + 'Ground/Tilemap_Elevation.png');
    this.loadMap('shadowsImg', url + 'Ground/Shadows.png');
    this.loadMap('waterImg', url + 'Water/Water.png');

    this.loadPlayer('playerIdle', 'idle');
    this.loadPlayer('playerWalk', 'walk');
  }

  create() {
    console.log('Boot.create()');
    this.scene.start('Map1');
  }

  update() {}

  loadPlayer(key: string, name: string) {
    this.load.spritesheet(
      key,
      `src/assets/the-adventurer-free/${name}/${name}.png`,
      {
        frameWidth: 48,
        frameHeight: 64,
      }
    );
  }

  loadMap(key: string, url: string) {
    this.load.spritesheet(key, url, {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
}
