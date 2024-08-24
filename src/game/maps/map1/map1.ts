import Level1 from './level1.ts';
import Level2 from './level2.ts';
import Level3 from './level3.ts';

import PlayerPro from '../../player/player-pro.ts';
import Player from '../../player/player.ts';

export class Map1 extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  player!: Phaser.Physics.Arcade.Sprite;
  groupPlayer!: any;
  cursors!: any;
  colliderLevel1!: Phaser.Physics.Arcade.Collider;
  colliderLevel2!: Phaser.Physics.Arcade.Collider;
  colliderLevel3!: Phaser.Physics.Arcade.Collider;
  rectangleLevel11!: Phaser.GameObjects.Group;
  rectangleLevel12!: Phaser.GameObjects.Group;
  rectangleLevel23!: Phaser.GameObjects.Group;
  landFlat!: Phaser.Tilemaps.Tileset;
  bridge!: Phaser.Tilemaps.Tileset;
  foam!: Phaser.Tilemaps.Tileset;
  invisibleWall!: Phaser.Tilemaps.Tileset;
  landElevation!: Phaser.Tilemaps.Tileset;
  shadowsGround!: Phaser.Tilemaps.Tileset;
  water!: Phaser.Tilemaps.Tileset;
  invisibleWallLayerLevel1: any;
  invisibleWallLayerLevel2: any;
  invisibleWallLayerLevel3: any;

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

    new Level1(this);

    this.groupPlayer = this.physics.add.group();
    //this.player = new Player(this, 170, 719);
    this.player = new PlayerPro(this, 170, 719, 'playerPro', 'female');
    this.groupPlayer.add(this.player);

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
    this.cursors.shift = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.colliderLevel1 = this.physics.add.collider(
      this.groupPlayer,
      this.invisibleWallLayerLevel1
    );
    this.colliderLevel1.active = true;

    this.colliderLevel2 = this.physics.add.collider(
      this.groupPlayer,
      this.invisibleWallLayerLevel2
    );
    this.colliderLevel2.active = false;

    this.colliderLevel3 = this.physics.add.collider(
      this.groupPlayer,
      this.invisibleWallLayerLevel3
    );
    this.colliderLevel3.active = false;

    this.rectangleLevel11 = this.add.group();
    this.addToGroup('level-1/level1', this.rectangleLevel11);
    this.physics.add.overlap(
      this.groupPlayer,
      this.rectangleLevel11,
      this.goToLevel1,
      undefined,
      this
    );

    this.rectangleLevel12 = this.add.group();
    this.addToGroup('level-1/level2', this.rectangleLevel12);
    this.physics.add.overlap(
      this.groupPlayer,
      this.rectangleLevel12,
      this.goToLevel2,
      undefined,
      this
    );

    this.rectangleLevel23 = this.add.group();
    this.addToGroup('level-2/level3', this.rectangleLevel23);
    this.physics.add.overlap(
      this.groupPlayer,
      this.rectangleLevel23,
      this.goToLevel3,
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

  goToLevel1() {
    this.colliderLevel1.active = true;
    this.colliderLevel2.active = false;
    this.colliderLevel3.active = false;
    this.groupPlayer.setDepth(1.5);
  }

  goToLevel2() {
    this.colliderLevel1.active = false;
    this.colliderLevel2.active = true;
    this.colliderLevel3.active = false;
    this.groupPlayer.setDepth(2.5);
  }

  goToLevel3() {
    this.colliderLevel1.active = true;
    this.colliderLevel2.active = false;
    this.colliderLevel3.active = true;
    this.groupPlayer.setDepth(3.5);
  }
}
