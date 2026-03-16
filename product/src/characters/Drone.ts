import { Enemy } from "./Enemy";

export class Drone extends Enemy {
    // Initialisation of the Drone class
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'drone-south', 'drone');
        this.setCollideWorldBounds(true);
        this.setSize(32, 32);
        this.setOffset(16, 16);
    }
}