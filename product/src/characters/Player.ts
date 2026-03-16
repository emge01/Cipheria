import Phaser from "phaser";
import { PlayerConfig, type Direction, type ActionType } from "../config/PlayerConfig";
import { AnimationManager } from "./AnimationManager";
import { InputManager } from "../managers/InputManager";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private inputManager: InputManager;
    private isAttacking : boolean = false;
    private currentDirection: Direction = 'south';
    private currentAction: ActionType = 'idle'
    private spaceKey!: Phaser.Input.Keyboard.Key;

    //initialisation of Player class
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player-idle');
        
        
        this.setScale(2)
        this.setupPhysics(scene);
        this.inputManager = new InputManager(scene);
        this.spaceKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.play('south-idle');
        this.on('animationcomplete', this.handleAnimationComplete, this);
    }

    //makes sure that player doesn't go off the screen and only stays on the map
    private setupPhysics(scene: Phaser.Scene): void {
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        (this.body as Phaser.Physics.Arcade.Body).setSize(32, 32);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(16, 16);
        
    }

    //handles attacking animation
    private handleAnimationComplete(animation: Phaser.Animations.Animation) : void {
        if (animation.key.includes('attack')) {
            this.isAttacking = false;
        }
    }

    update(): void {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && !this.isAttacking) {
            this.isAttacking = true;
            this.setVelocity(0, 0);
            this.currentAction = 'attack';
            const attackKey = `${this.currentDirection}-attack`;
            AnimationManager.play(this, attackKey);
            this.scene.events.emit('player-attack');
            return;
        }

        if (this.isAttacking) {
            return;
        }

        const input = this.inputManager.getMovement(PlayerConfig.SPEED);

        this.setVelocity(input.velocityX, input.velocityY);

        if (input.isMoving && input.direction) {
            this.currentDirection = input.direction;
            this.currentAction = 'walk';
        } else {
            this.currentAction = 'idle';
        }

        const animKey = `${this.currentDirection}-${this.currentAction}`;
        AnimationManager.play(this, animKey);
    }

    getDirection(): Direction {
        return this.currentDirection;
    }

    getAction(): ActionType {
        return this.currentAction;
    }

    getIsAttacking(): boolean {
        return this.isAttacking;
    }
}