import { Map1 } from './maps/map1/map1';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  velocityPlayer: number;
  direction!: 'up' | 'down' | 'left' | 'right';
  scene: Map1;
  life: number = 100;
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
    walkingUpLeft: 'walkingUpLeft',
    walkingUpRight: 'walkingUpRight',

    dyingDown: 'dyingDown',
    dyingUp: 'dyingUp',
    dyingLeft: 'dyingLeft',
    dyingRight: 'dyingRight',
    dyingUpLeft: 'dyingUpLeft',
    dyingUpRight: 'dyingUpRight',
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
    this.walkingUpLeft();
    this.walkingUpRight();

    this.dyingDown();
    this.dyingUp();
    this.dyingLeft();
    this.dyingRight();
    this.dyingUpLeft();
    this.dyingUpRight();
  }

  update() {
    this.movePlayer();
    this.getAnimation();
  }

  movePlayer() {
    if (this.life > 0) {
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

    if (this.life > 0) {
      if (this.scene.cursors.up.isDown && this.scene.cursors.left.isDown) {
        animationName = this.animations.walkingUpLeft;
      } else if (
        this.scene.cursors.up.isDown &&
        this.scene.cursors.right.isDown
      ) {
        animationName = this.animations.walkingUpRight;
      }
    } else {
      if (this.direction === 'down') animationName = this.animations.dyingDown;
      else if (this.direction === 'up') animationName = this.animations.dyingUp;
      else if (this.direction === 'right')
        animationName = this.animations.dyingRight;
      else if (this.direction === 'left')
        animationName = this.animations.dyingLeft;
    }

    if (this.anims.getName() !== animationName)
      this.anims.play(animationName, true);
  }

  animationPlayer(
    key: string,
    spritesheetKey: string,
    row: number,
    repeat: number = -1
  ) {
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
      repeat,
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

  walkingUpLeft() {
    this.animationPlayer('walkingUpLeft', 'playerWalk', 2);
  }

  walkingUpRight() {
    this.animationPlayer('walkingUpRight', 'playerWalk', 4);
  }

  dyingDown() {
    this.animationPlayer('dyingDown', 'playerDeath', 0, 0);
  }

  dyingUp() {
    this.animationPlayer('dyingUp', 'playerDeath', 3, 0);
  }

  dyingLeft() {
    this.animationPlayer('dyingLeft', 'playerDeath', 1, 0);
  }

  dyingRight() {
    this.animationPlayer('dyingRight', 'playerDeath', 5, 0);
  }

  dyingUpLeft() {
    this.animationPlayer('dyingUpLeft', 'playerDeath', 2, 0);
  }

  dyingUpRight() {
    this.animationPlayer('dyingUpRight', 'playerDeath', 4, 0);
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
