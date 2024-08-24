import { Map1 } from '../maps/map1/map1';
import SetPlayer from './set-player';

export default class PlayerPro extends Phaser.Physics.Arcade.Sprite {
  animationName!: string;
  hair!: Phaser.Physics.Arcade.Sprite;
  hat!: Phaser.Physics.Arcade.Sprite;
  clothing!: Phaser.Physics.Arcade.Sprite;
  velocityPlayer: number;
  addSpeed: number;
  direction!: 'up' | 'down' | 'left' | 'right';
  scene: Map1;
  life!: number;
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

    runningDown: 'runningDown',
    runningUp: 'runningUp',
    runningLeft: 'runningLeft',
    runningRight: 'runningRight',

    jumpingDown: 'jumpingDown',
    jumpingUp: 'jumpingUp',
    jumpingLeft: 'jumpingLeft',
    jumpingRight: 'jumpingRight',
  };
  spritesheet!: string;
  gender: 'male' | 'female';

  constructor(
    scene: any,
    x: number,
    y: number,
    spritesheet: string,
    gender: 'male' | 'female' = 'male'
  ) {
    super(scene, x, y, spritesheet);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.gender = gender;

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);

    this.setScale(2.5);
    this.velocityPlayer = 200;
    this.addSpeed = 150;
    this.setMaxVelocity(this.velocityPlayer + this.addSpeed, this.velocityPlayer + this.addSpeed);
    this.setOrigin(0, 0);
    this.body?.setSize(12, 32, true);
    this.body?.setOffset(26, 14);
    this.setDepth(1.5);
    this.setVisible(true);
    // this.setCollideWorldBounds(true);
    this.life = 100;

    this.create();
  }

  create() {
    this.standing();
    this.walking();
    this.running();
    this.jumping();

    this.hair = new SetPlayer(this.scene, 170, 719, this, 'Hair');
    this.scene.groupPlayer.add(this.hair);

    /* this.hat = new SetPlayer(this.scene, 170, 719, this, 'Hat');
    this.scene.groupPlayer.add(this.hat);

    this.clothing = new SetPlayer(this.scene, 170, 719, this, 'Clothing', 'Lvl1');
    this.scene.groupPlayer.add(this.clothing); */
  }

  update() {
    this.movePlayer();
    if (this.hair) this.hair.update();
    if (this.hat) this.hat.update();
    if (this.clothing) this.clothing.update();
  }

  movePlayer() {
    if (this.life > 0) {
      this.animationName = this.getAnimationByName();

      let addSpeed = 0;
      let movementType = 'walking';

      if (this.scene.cursors.shift.isDown) {
        addSpeed = this.addSpeed;
        movementType = 'running';
      }

      if (this.scene.cursors.up.isDown) {
        this.setVelocityY(-(this.velocityPlayer + addSpeed));
        this.animationName = this.animations[`${movementType}Up`];
      } else if (this.scene.cursors.down.isDown) {
        this.setVelocityY(this.velocityPlayer + addSpeed);
        this.animationName = this.animations[`${movementType}Down`];
      } else {
        this.setVelocityY(0);
        if (this.direction === 'down') this.animations.last = this.animations.standingDown;
        else if (this.direction === 'up') this.animations.last = this.animations.standingUp;
      }

      if (this.scene.cursors.right.isDown) {
        this.setVelocityX(this.velocityPlayer + addSpeed);
        this.animationName = this.animations[`${movementType}Right`];
      } else if (this.scene.cursors.left.isDown) {
        this.setVelocityX(-(this.velocityPlayer + addSpeed));
        this.animationName = this.animations[`${movementType}Left`];
      } else {
        this.setVelocityX(0);
        if (this.direction === 'right') this.animations.last = this.animations.standingRight;
        else if (this.direction === 'left') this.animations.last = this.animations.standingLeft;
      }

      /* if (this.scene.cursors.space.isDown) {
      this.setVelocity(0);
      if (this.direction === 'up') {
        this.animationName = 'attackingUp1';
      } else if (this.direction === 'down') {
        this.animationName = 'attackingDown1';
      } else if (this.direction === 'left') {
        this.animationName = 'attackingX1';
      } else {
        this.animationName = 'attackingX1';
      }
    } */

      if (this.scene.cursors.space.isDown) {
        if (this.direction === 'up') {
          this.animationName = this.animations.jumpingUp;
        } else if (this.direction === 'down') {
          this.animationName = this.animations.jumpingDown;
        } else if (this.direction === 'left') {
          this.animationName = this.animations.jumpingLeft;
        } else {
          this.animationName = this.animations.jumpingRight;
        }
      }

      if (this.life <= 0) {
      }

      if (this.anims.getName() !== this.animationName) this.anims.play(this.animationName, true);
    }
  }

  animationStartEnd(
    parent: any,
    key: string,
    spritesheetKey: string,
    row: number,
    start: number = -1,
    end: number = -1,
    repeat: number = -1
  ) {
    const lengthX = 8;

    if (start <= -1) {
      start = lengthX * row;
      end = lengthX * row + lengthX - 1;
    } else {
      start = lengthX * row + start;
      end = start + end;
    }

    parent.anims.create({
      key,
      frames: parent.anims.generateFrameNumbers(spritesheetKey, {
        start,
        end,
      }),
      frameRate: 10,
      repeat,
    });
  }

  animationFrames(
    parent: any,
    key: string,
    spritesheetKey: string,
    row: number,
    frames: number[],
    frameRate: number = 10,
    repeat: number = -1
  ) {
    const lengthX = 8;

    frames = frames.map((frame) => row * lengthX + frame);

    parent.anims.create({
      key,
      frames: parent.anims.generateFrameNumbers(spritesheetKey, {
        frames,
      }),
      frameRate,
      repeat,
    });
  }

  standing(parent: any = this, type = '', spritesheet = this.spritesheet) {
    this.animationStartEnd(parent, 'standing' + type + 'Down', spritesheet, 0, 0, 0, 0);
    this.animationStartEnd(parent, 'standing' + type + 'Up', spritesheet, 1, 0, 0, 0);
    this.animationStartEnd(parent, 'standing' + type + 'Right', spritesheet, 2, 0, 0, 0);
    this.animationStartEnd(parent, 'standing' + type + 'Left', spritesheet, 3, 0, 0, 0);
  }

  walking(parent: any = this, type = '', spritesheet = this.spritesheet) {
    this.animationStartEnd(parent, 'walking' + type + 'Down', spritesheet, 4, 0, 5);
    this.animationStartEnd(parent, 'walking' + type + 'Up', spritesheet, 5, 0, 5);
    this.animationStartEnd(parent, 'walking' + type + 'Right', spritesheet, 6, 0, 5);
    this.animationStartEnd(parent, 'walking' + type + 'Left', spritesheet, 7, 0, 5);
  }

  running(parent: any = this, type = '', spritesheet = this.spritesheet) {
    const frames = [3, 6, 7];
    this.animationFrames(parent, 'running' + type + 'Down', spritesheet, 4, frames, 15);
    this.animationFrames(parent, 'running' + type + 'Up', spritesheet, 5, frames, 15);
    this.animationFrames(parent, 'running' + type + 'Right', spritesheet, 6, frames, 15);
    this.animationFrames(parent, 'running' + type + 'Left', spritesheet, 7, frames, 15);
  }

  jumping(parent: any = this, type = '', spritesheet = this.spritesheet) {
    const frames = [5, 6, 7, 5];
    this.animationFrames(parent, 'jumping' + type + 'Down', spritesheet, 0, frames, 10, 0);
    this.animationFrames(parent, 'jumping' + type + 'Up', spritesheet, 1, frames, 10, 0);
    this.animationFrames(parent, 'jumping' + type + 'Right', spritesheet, 2, frames, 10, 0);
    this.animationFrames(parent, 'jumping' + type + 'Left', spritesheet, 3, frames, 10, 0);
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
