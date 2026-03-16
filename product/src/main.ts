import Phaser from 'phaser';
import { WelcomeScene } from './scenes/WelcomeScene';
import { GameScene } from './scenes/GameScene';
import { UIScene } from './scenes/UIScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
              y: 0,
              x: 0
            },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [WelcomeScene, GameScene, UIScene],
    dom: {
        createContainer: true
    }
};

export default new Phaser.Game(config);