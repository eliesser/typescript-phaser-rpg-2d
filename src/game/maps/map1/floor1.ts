import { Map1 } from './map1';

export default class Floor1 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(this.scene.map.createLayer('floor-1/shadows', this.scene.shadowsGround)!);
    layer.add(this.scene.map.createLayer('floor-1/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('floor-1/grass', this.scene.landFlat)!);
    layer.add(this.scene.map.createLayer('floor-1/bridges', this.scene.bridge)!);

    layer.add(this.scene.map.createLayer('floor-1/elevation/shadows', this.scene.shadowsGround)!);
    layer.add(this.scene.map.createLayer('floor-1/elevation/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('floor-1/elevation/grass', this.scene.landFlat)!);
    layer.add(this.scene.map.createLayer('floor-1/elevation/stairs', this.scene.landElevation)!);

    this.scene.invisibleWallLayerFloor1 = this.scene.map
      .createLayer('limits-floor-1', this.scene.invisibleWall)
      ?.setVisible(false);
    this.scene.invisibleWallLayerFloor1.setCollisionByProperty({
      collider: true,
    });
    layer.add(this.scene.invisibleWallLayerFloor1);

    layer.setDepth(2);

    layer.setVisible(true);
  }
}
