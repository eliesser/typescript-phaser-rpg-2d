import Level1 from './level1.ts';
import Level2 from './level2.ts';
import Level3 from './level3.ts';

import Player from '../../player.ts';

export class Map1 extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: any;
  colliderLevel1!: Phaser.Physics.Arcade.Collider;
  colliderLevel2!: Phaser.Physics.Arcade.Collider;
  level1!: Phaser.Tilemaps.ObjectLayer;
  level2!: Phaser.Tilemaps.ObjectLayer;
  rectColliderLevel1!: Phaser.GameObjects.Group;
  rectColliderLevel2!: Phaser.GameObjects.Group;
  landFlat!: Phaser.Tilemaps.Tileset;
  bridge!: Phaser.Tilemaps.Tileset;
  foam!: Phaser.Tilemaps.Tileset;
  invisibleWall!: Phaser.Tilemaps.Tileset;
  landElevation!: Phaser.Tilemaps.Tileset;
  shadowsGround!: Phaser.Tilemaps.Tileset;
  water!: Phaser.Tilemaps.Tileset;
  invisibleWallLayerLevel1: any;
  invisibleWallLayerLevel2: any;

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
    this.invisibleWall = this.map.addTilesetImage(
      'invisible_wall',
      'invisibleWallImg'
    )!;
    this.landElevation = this.map.addTilesetImage(
      'land-elevation',
      'landElevationImg'
    )!;
    this.shadowsGround = this.map.addTilesetImage(
      'shadows-ground',
      'shadowsImg'
    )!;
    this.water = this.map.addTilesetImage('water', 'waterImg')!;

    new Level1(this);

    this.player = new Player(this, 170, 719);

    new Level2(this);

    new Level3(this);

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
    layer.add(this.map.createLayer('top', ribbonYellow3SlidesImg)!);
    layer.setDepth(4);
    layer.setVisible(true);

    this.cursors = this.input.keyboard?.createCursorKeys();

    this.colliderLevel1 = this.physics.add.collider(
      this.player,
      this.invisibleWallLayerLevel1
    );
    this.colliderLevel1.active = true;

    this.colliderLevel2 = this.physics.add.collider(
      this.player,
      this.invisibleWallLayerLevel2
    );
    this.colliderLevel2.active = false;

    let objects: Phaser.Types.Tilemaps.TiledObject[] =
      this.map.getObjectLayer('level-1/level1')!.objects;

    this.rectColliderLevel1 = this.add.group();

    objects.forEach((object) => {
      const newObject = this.physics.add.image(
        object.x! + object.width! / 2,
        object.y! + object.height! / 2,
        ''
      );

      newObject.setSize(object.width!, object.height!);
      newObject.setVisible(false);

      this.rectColliderLevel1.add(newObject);
    });

    this.physics.add.overlap(
      this.player,
      this.rectColliderLevel1,
      this.goToLevel1,
      undefined,
      this
    );

    objects = this.map.getObjectLayer('level-1/level2')!.objects;

    this.rectColliderLevel2 = this.add.group();

    objects.forEach((object) => {
      const newObject = this.physics.add.image(
        object.x! + object.width! / 2,
        object.y! + object.height! / 2,
        ''
      );

      newObject.setSize(object.width!, object.height!);
      newObject.setVisible(false);

      this.rectColliderLevel2.add(newObject);
    });

    this.physics.add.overlap(
      this.player,
      this.rectColliderLevel2,
      this.goToLevel2,
      undefined,
      this
    );
  }

  update() {
    this.player.update();
  }

  goToLevel1() {
    this.colliderLevel1.active = true;
    this.colliderLevel2.active = false;
    this.player.setDepth(1.5);
  }

  goToLevel2() {
    this.colliderLevel1.active = false;
    this.colliderLevel2.active = true;
    this.player.setDepth(2.5);
  }
}
