import { Map1 } from './maps/map1/map1';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  velocityPlayer: number;
  direction!: 'up' | 'down' | 'left' | 'right';
  scene: Map1;
  animations: any = {
    last: 'standingDown',

    standingDown: 'standingDown',
    standingUp: 'standingUp',
    standingLeft: 'standingLeft',
    standingRight: 'standingRight',

    walkingDown: 'walkingDown',
    walkingUp: 'walkingUp',
    walkingLeft: 'walkingLeft',
    walkingRight: 'walkingRight',
  };

  constructor(scene: Map1, x: number, y: number) {
    super(scene, x, y, '');

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);

    this.setScale(2.5);
    this.velocityPlayer = 200;
    this.setMaxVelocity(this.velocityPlayer, this.velocityPlayer);
    this.setOrigin(0, 0);
    this.body?.setSize(12, 32, true);
    this.body?.setOffset(18, 14);
    this.setDepth(1.5);
    this.setVisible(true);
    // this.setCollideWorldBounds(true);

    this.create();
  }

  create() {
    this.standingDown();
    this.standingUp();
    this.standingLeft();
    this.standingRight();

    this.walkingDown();
    this.walkingUp();
    this.walkingLeft();
    this.walkingRight();
  }

  update() {
    this.movePlayer();
    this.getAnimation();
  }

  movePlayer() {
    if (this.scene.cursors.up.isDown) {
      this.setVelocityY(-this.velocityPlayer);
      this.animations.last = this.animations.walkingDown;
    } else if (this.scene.cursors.down.isDown) {
      this.setVelocityY(this.velocityPlayer);
      this.animations.last = this.animations.walkingUp;
    } else {
      this.setVelocityY(0);
      if (this.direction === 'down')
        this.animations.last = this.animations.standingDown;
      else if (this.direction === 'up')
        this.animations.last = this.animations.standingUp;
    }

    if (this.scene.cursors.right.isDown) {
      this.setVelocityX(this.velocityPlayer);
      this.animations.last = this.animations.walkingRight;
    } else if (this.scene.cursors.left.isDown) {
      this.setVelocityX(-this.velocityPlayer);
      this.animations.last = this.animations.walkingRight;
    } else {
      this.setVelocityX(0);
      if (this.direction === 'right')
        this.animations.last = this.animations.standingRight;
      else if (this.direction === 'left')
        this.animations.last = this.animations.standingLeft;
    }
  }

  getAnimation() {
    let animationName = this.getAnimationByName();

    /* if (this.scene.cursors.space.isDown) {
      this.setVelocity(0);
      if (this.direction === 'up') {
        animationName = 'attackingUp1';
      } else if (this.direction === 'down') {
        animationName = 'attackingDown1';
      } else if (this.direction === 'left') {
        animationName = 'attackingX1';
      } else {
        animationName = 'attackingX1';
      }
    } */

    if (this.anims.getName() !== animationName)
      this.anims.play(animationName, true);
  }

  animationPlayer(key: string, spritesheetKey: string, row: number) {
    const lengthX = 8;
    const start = lengthX * row;
    const end = lengthX * row + lengthX - 1;

    this.scene.anims.create({
      key,
      frames: this.scene.anims.generateFrameNumbers(spritesheetKey, {
        start,
        end,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  standingDown() {
    this.animationPlayer('standingDown', 'playerIdle', 0);
  }

  standingUp() {
    this.animationPlayer('standingUp', 'playerIdle', 3);
  }

  standingLeft() {
    this.animationPlayer('standingLeft', 'playerIdle', 1);
  }

  standingRight() {
    this.animationPlayer('standingRight', 'playerIdle', 5);
  }

  walkingDown() {
    this.animationPlayer('walkingDown', 'playerWalk', 0);
  }

  walkingUp() {
    this.animationPlayer('walkingUp', 'playerWalk', 3);
  }

  walkingLeft() {
    this.animationPlayer('walkingLeft', 'playerWalk', 1);
  }

  walkingRight() {
    this.animationPlayer('walkingRight', 'playerWalk', 5);
  }

  getAnimationByName() {
    let name = this.animations.last;

    if (this.body && this.body?.velocity.y > 0) {
      name = this.animations.walkingDown;
      this.direction = 'down';
    } else if (this.body && this.body?.velocity.y < 0) {
      this.direction = 'up';
      name = this.animations.walkingUp;
    }

    if (this.body && this.body?.velocity.x > 0) {
      name = this.animations.walkingRight;
      this.direction = 'right';
    } else if (this.body && this.body?.velocity.x < 0) {
      name = this.animations.walkingLeft;
      this.direction = 'left';
    }

    return name;
  }
}
