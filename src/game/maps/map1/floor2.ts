import { Map1 } from './map1';

export default class Floor2 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(this.scene.map.createLayer('floor-2/shadows', this.scene.shadowsGround)!);
    layer.add(this.scene.map.createLayer('floor-2/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('floor-2/grass', this.scene.landFlat)!);

    this.scene.invisibleWallLayerFloor2 = this.scene.map
      .createLayer('limits-floor-2', this.scene.invisibleWall)
      ?.setVisible(false);
    this.scene.invisibleWallLayerFloor2.setCollisionByProperty({
      collider: true,
    });
    layer.add(this.scene.invisibleWallLayerFloor2);

    layer.setDepth(3);
    layer.setVisible(true);
  }
}
