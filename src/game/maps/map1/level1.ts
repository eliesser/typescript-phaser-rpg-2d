import { Map1 } from './map1';

export default class Level1 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(this.scene.map.createLayer('level-1/seat', this.scene.water)!);
    layer.add(this.scene.map.createLayer('level-1/land', this.scene.landFlat)!);

    layer.add(this.scene.map.createLayer('level-1/foam/top', this.scene.foam)!);
    layer.add(this.scene.map.createLayer('level-1/foam/bottom', this.scene.foam)!);
    layer.add(this.scene.map.createLayer('level-1/foam/left', this.scene.foam)!);
    layer.add(this.scene.map.createLayer('level-1/foam/right', this.scene.foam)!);

    layer.add(this.scene.map.createLayer('level-1/elevation/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('level-1/elevation/grass', this.scene.landFlat)!);
    layer.add(this.scene.map.createLayer('level-1/elevation/stairs', this.scene.landElevation)!);

    this.scene.invisibleWallLayerLevel1 = this.scene.map
      .createLayer('level-1-enabled', this.scene.invisibleWall)
      ?.setVisible(false);

    this.scene.invisibleWallLayerLevel1.setCollisionByProperty({
      collider: true,
    });

    layer.add(this.scene.invisibleWallLayerLevel1);

    layer.setDepth(1);

    layer.setVisible(true);
  }
}
