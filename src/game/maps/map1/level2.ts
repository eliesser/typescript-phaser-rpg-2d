import { Map1 } from './map1';

export default class Level2 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(
      this.scene.map.createLayer('level-2/shadows', this.scene.shadowsGround)!
    );
    layer.add(
      this.scene.map.createLayer('level-2/elevation', this.scene.landElevation)!
    );
    layer.add(
      this.scene.map.createLayer('level-2/grass', this.scene.landFlat)!
    );
    layer.add(
      this.scene.map.createLayer('level-2/bridges', this.scene.bridge)!
    );
    this.scene.invisibleWallLayerLevel2 = this.scene.map
      .createLayer('level-2-enabled', this.scene.invisibleWall)
      ?.setVisible(false);
    this.scene.invisibleWallLayerLevel2.setCollisionByProperty({
      collider: true,
    });
    layer.add(this.scene.invisibleWallLayerLevel2);

    layer.setDepth(2);

    layer.setVisible(true);
  }
}
