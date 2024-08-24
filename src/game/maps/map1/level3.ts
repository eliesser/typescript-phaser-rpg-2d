import { Map1 } from './map1';

export default class Level3 {
  scene: Map1;

  constructor(scene: Map1) {
    this.scene = scene;

    const layer = this.scene.add.container();

    layer.add(this.scene.map.createLayer('level-3/shadows', this.scene.shadowsGround)!);
    layer.add(this.scene.map.createLayer('level-3/elevation', this.scene.landElevation)!);
    layer.add(this.scene.map.createLayer('level-3/grass', this.scene.landFlat)!);
    layer.add(this.scene.map.createLayer('level-3/stairs', this.scene.landElevation)!);

    layer.setDepth(3);
    layer.setVisible(true);
  }
}
