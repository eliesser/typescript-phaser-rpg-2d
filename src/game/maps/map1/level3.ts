import { Map1 } from './map1';

export default class Level3 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(this.scene.map.createLayer('level-3/shadows', this.scene.shadowsGround)!);
    layer.add(this.scene.map.createLayer('level-3/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('level-3/grass', this.scene.landFlat)!);

    this.scene.invisibleWallLayerLevel3 = this.scene.map
      .createLayer('level-3-enabled', this.scene.invisibleWall)
      ?.setVisible(false);
    this.scene.invisibleWallLayerLevel3.setCollisionByProperty({
      collider: true,
    });
    layer.add(this.scene.invisibleWallLayerLevel3);

    layer.setDepth(3);
    layer.setVisible(true);
  }
}
