import { Enemy } from "./Enemy";

export class Slime extends Enemy {
    // Initialisation of the Drone class
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'slime', 'slime');
        this.setCollideWorldBounds(true);
        this.setSize(32, 25);
        this.setOffset(0, 0);

        this.setDepth(100);
        this.play('slime-move')
    }
}