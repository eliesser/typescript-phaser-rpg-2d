import { Map1 } from './map1';

export default class Floor0 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(this.scene.map.createLayer('floor-0/seat', this.scene.water)!);
    layer.add(this.scene.map.createLayer('floor-0/land', this.scene.landFlat)!);

    layer.add(this.scene.map.createLayer('floor-0/foam/top', this.scene.foam)!);
    layer.add(this.scene.map.createLayer('floor-0/foam/bottom', this.scene.foam)!);
    layer.add(this.scene.map.createLayer('floor-0/foam/left', this.scene.foam)!);
    layer.add(this.scene.map.createLayer('floor-0/foam/right', this.scene.foam)!);

    layer.add(this.scene.map.createLayer('floor-0/elevation/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('floor-0/elevation/grass', this.scene.landFlat)!);
    layer.add(this.scene.map.createLayer('floor-0/elevation/stairs', this.scene.landElevation)!);

    this.scene.invisibleWallLayerFloor0 = this.scene.map
      .createLayer('limits-floor-0', this.scene.invisibleWall)
      ?.setVisible(false);

    this.scene.invisibleWallLayerFloor0.setCollisionByProperty({
      collider: true,
    });

    layer.add(this.scene.invisibleWallLayerFloor0);

    layer.setDepth(1);

    layer.setVisible(true);
  }
}
