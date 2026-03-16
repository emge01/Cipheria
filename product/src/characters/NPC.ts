import Phaser from "phaser";
import { AnimationManager } from "./AnimationManager";

export type NPCState = 'idle' | 'walk' | 'attack';
export type Direction = 'east' | 'west'

export abstract class  NPC extends Phaser.Physics.Arcade.Sprite {

    protected speed: number;
    protected character: string;
    protected isInteracting: boolean = false;
    protected currentState: NPCState = 'idle'
    protected direction: Direction = 'east'

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        character: string,
        speed: number
    ) {
        super(scene, x, y, `${character}-idle`);

        
        this.speed = speed;
        this.character = character;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(64, 64);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(32, 64);

        this.setCollideWorldBounds(true);
        this.setPushable(false)

        this.playAnimation('idle');
    }

    update(): void {
        if (this.isInteracting) return;
    }

    public interact(): void {
        this.isInteracting = true;
    }

    public interacting(): boolean {
        return this.isInteracting;
    }

    protected playAnimation(action: string): void {
        const key = `${this.character}-${action}`
        AnimationManager.play(this, key);
    }
}