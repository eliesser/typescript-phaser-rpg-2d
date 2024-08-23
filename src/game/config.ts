import { Boot } from './boot';
import { Map1 } from './maps/map1/map1';

export var gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT, // scala automaticamente
    autoCenter: Phaser.Scale.CENTER_BOTH, // centra automaticamente
    width: 1856, // ancho de pantalla
    height: 1216, // alto de pantalla
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
      fps: 60,
    },
  },
  fps: {
    target: 24,
    forceSetTimeOut: true,
  },
  roundPixels: true,
  backgroundColor: 0x000000,
  scene: [Boot, Map1],
};
