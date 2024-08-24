import Floor0 from './floor0.ts';
import Floor1 from './floor1.ts';
import Floor2 from './floor2.ts';

import PlayerPro from '../../player/player-pro.ts';
import Player from '../../player/player.ts';

export class Map1 extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  player!: Phaser.Physics.Arcade.Sprite;
  groupPlayer!: any;
  cursors!: any;
  colliderFloor0!: Phaser.Physics.Arcade.Collider;
  colliderFloor1!: Phaser.Physics.Arcade.Collider;
  colliderFloor2!: Phaser.Physics.Arcade.Collider;
  rectangleFloor00!: Phaser.GameObjects.Group;
  rectangleFloor01!: Phaser.GameObjects.Group;
  rectangleFloor12!: Phaser.GameObjects.Group;
  landFlat!: Phaser.Tilemaps.Tileset;
  bridge!: Phaser.Tilemaps.Tileset;
  foam!: Phaser.Tilemaps.Tileset;
  invisibleWall!: Phaser.Tilemaps.Tileset;
  landElevation!: Phaser.Tilemaps.Tileset;
  shadowsGround!: Phaser.Tilemaps.Tileset;
  water!: Phaser.Tilemaps.Tileset;
  invisibleWallLayerFloor0: any;
  invisibleWallLayerFloor1: any;
  invisibleWallLayerFloor2: any;

  constructor() {
    super('Map1');
  }

  preload() {
    console.log('Map1.preload()');
  }

  create() {
    console.log('Map1.create()');

    this.map = this.make.tilemap({ key: 'map' });

    this.landFlat = this.map.addTilesetImage(' land-flat', 'landFlatImg')!;
    this.bridge = this.map.addTilesetImage('bridge', 'bridgeImg')!;
    this.foam = this.map.addTilesetImage('foam', 'foamImg')!;
    this.invisibleWall = this.map.addTilesetImage('invisible_wall', 'invisibleWallImg')!;
    this.landElevation = this.map.addTilesetImage('land-elevation', 'landElevationImg')!;
    this.shadowsGround = this.map.addTilesetImage('shadows-ground', 'shadowsImg')!;
    this.water = this.map.addTilesetImage('water', 'waterImg')!;

    new Floor0(this);

    this.groupPlayer = this.physics.add.group();
    //this.player = new Player(this, 170, 719);
    this.player = new PlayerPro(this, 170, 719, 'playerPro', 'female');
    this.groupPlayer.add(this.player);

    new Floor1(this);

    new Floor2(this);

    let layer = this.add.container();
    layer.add(
      this.add.text(195, 57, 'Samantha', {
        fontFamily: 'ThaleahFat',
        fontSize: '48px',
        color: '#000000',
      })
    );
    layer.setDepth(5);
    layer.setVisible(true);

    const ribbonYellow3SlidesImg = this.map.addTilesetImage(
      'Ribbon_Yellow_3Slides',
      'ribbonYellow3SlidesImg'
    )!;
    layer = this.add.container();
    layer.add(this.map.createLayer('title', ribbonYellow3SlidesImg)!);
    layer.setDepth(4);
    layer.setVisible(true);

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.cursors.shift = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.colliderFloor0 = this.physics.add.collider(
      this.groupPlayer,
      this.invisibleWallLayerFloor0
    );
    this.colliderFloor0.active = true;

    this.colliderFloor1 = this.physics.add.collider(
      this.groupPlayer,
      this.invisibleWallLayerFloor1
    );
    this.colliderFloor1.active = false;

    this.colliderFloor2 = this.physics.add.collider(
      this.groupPlayer,
      this.invisibleWallLayerFloor2
    );
    this.colliderFloor2.active = false;

    this.rectangleFloor00 = this.add.group();
    this.addToGroup('enabled-limits-floor-0', this.rectangleFloor00);
    this.physics.add.overlap(
      this.groupPlayer,
      this.rectangleFloor00,
      this.goToFloor1,
      undefined,
      this
    );

    this.rectangleFloor01 = this.add.group();
    this.addToGroup('enabled-limits-floor-1', this.rectangleFloor01);
    this.physics.add.overlap(
      this.groupPlayer,
      this.rectangleFloor01,
      this.goToFloor2,
      undefined,
      this
    );

    this.rectangleFloor12 = this.add.group();
    this.addToGroup('enabled-limits-floor-2', this.rectangleFloor12);
    this.physics.add.overlap(
      this.groupPlayer,
      this.rectangleFloor12,
      this.goToFloor3,
      undefined,
      this
    );
  }

  update() {
    this.player.update();
  }

  addToGroup(key: string, group: any) {
    const objects = this.map.getObjectLayer(key)!.objects;

    objects.forEach((object: any) => {
      const newObject = this.physics.add.image(
        object.x! + object.width! / 2,
        object.y! + object.height! / 2,
        ''
      );

      newObject.setSize(object.width!, object.height!);
      newObject.setVisible(false);

      group.add(newObject);
    });
  }

  goToFloor1() {
    this.colliderFloor0.active = true;
    this.colliderFloor1.active = false;
    this.colliderFloor2.active = false;
    this.groupPlayer.setDepth(1.5);
  }

  goToFloor2() {
    this.colliderFloor0.active = false;
    this.colliderFloor1.active = true;
    this.colliderFloor2.active = false;
    this.groupPlayer.setDepth(2.5);
  }

  goToFloor3() {
    this.colliderFloor0.active = true;
    this.colliderFloor1.active = false;
    this.colliderFloor2.active = true;
    this.groupPlayer.setDepth(3.5);
  }
}
