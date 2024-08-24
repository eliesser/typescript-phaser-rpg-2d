import { Map1 } from '../maps/map1/map1';
import PlayerPro from './player-pro';

export default class SetPlayer extends Phaser.Physics.Arcade.Sprite {
  player!: PlayerPro;
  scene: Map1;
  animations!: any;
  spritesheet!: string;
  gender: 'male' | 'female';
  clothingLvl!: 'Lvl1' | 'Lvl2';

  constructor(
    scene: Map1,
    x: number,
    y: number,
    player: PlayerPro,
    type: 'Hair' | 'Hat' | 'Clothing',
    clothingLvl: 'Lvl1' | 'Lvl2' = 'Lvl1'
  ) {
    super(scene, x, y, '');

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.player = player;
    this.gender = player.gender;
    this.type = type;
    this.clothingLvl = clothingLvl;

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);

    this.setScale(this.player.scale);
    this.setOrigin(this.player.originX, this.player.originY);
    this.body?.setSize(12, 32, true);
    this.body?.setOffset(26, 14);
    this.setDepth(player.depth + 0.1);
    this.setVisible(true);
    // this.setCollideWorldBounds(true);

    this.create();
  }

  create() {
    if (this.type === 'Hair') {
      if (this.gender === 'female') this.spritesheet = 'hairFemale';
      else if (this.gender === 'male') this.spritesheet = 'hairMale';
    } else if (this.type === 'Hat') {
      if (this.gender === 'female') this.spritesheet = 'hat1';
      else if (this.gender === 'male') this.spritesheet = 'hat2';
    } else {
      if (this.gender === 'female') this.spritesheet = 'clothingFemale' + this.clothingLvl;
      else if (this.gender === 'male') this.spritesheet = 'clothingMale' + this.clothingLvl;
    }

    this.animations = {
      standingDown: 'standing' + this.type + 'Down',
      standingUp: 'standing' + this.type + 'Up',
      standingLeft: 'standing' + this.type + 'Left',
      standingRight: 'standing' + this.type + 'Right',

      walkingDown: 'walking' + this.type + 'Down',
      walkingUp: 'walking' + this.type + 'Up',
      walkingLeft: 'walking' + this.type + 'Left',
      walkingRight: 'walking' + this.type + 'Right',

      runningDown: 'running' + this.type + 'Down',
      runningUp: 'running' + this.type + 'Up',
      runningLeft: 'running' + this.type + 'Left',
      runningRight: 'running' + this.type + 'Right',

      jumpingDown: 'jumping' + this.type + 'Down',
      jumpingUp: 'jumping' + this.type + 'Up',
      jumpingLeft: 'jumping' + this.type + 'Left',
      jumpingRight: 'jumping' + this.type + 'Right',
    };

    this.player.standing(this, this.type, this.spritesheet);
    this.player.walking(this, this.type, this.spritesheet);
    this.player.running(this, this.type, this.spritesheet);
    this.player.jumping(this, this.type, this.spritesheet);
  }

  update() {
    this.setDepth(this.player.depth + 0.1);
    this.movePlayer();
  }

  movePlayer() {
    let addSpeed = 0;

    if (this.scene.cursors.shift.isDown) addSpeed = this.player.addSpeed;

    if (this.scene.cursors.up.isDown) {
      this.setVelocityY(-(this.player.velocityPlayer + addSpeed));
    } else if (this.scene.cursors.down.isDown) {
      this.setVelocityY(this.player.velocityPlayer + addSpeed);
    } else {
      this.setVelocityY(0);
    }

    if (this.scene.cursors.right.isDown) {
      this.setVelocityX(this.player.velocityPlayer + addSpeed);
    } else if (this.scene.cursors.left.isDown) {
      this.setVelocityX(-(this.player.velocityPlayer + addSpeed));
    } else {
      this.setVelocityX(0);
    }

    if (this.player.life <= 0) {
    }

    this.anims.play(this.animations[this.player.animationName], true);
  }
}
