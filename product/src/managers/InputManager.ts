import Phaser from "phaser";
import type { Direction } from "../config/PlayerConfig";
import type { ActionType } from "../config/PlayerConfig";

//Input manager for Player animation. Allows the player to move when specific keys are pressed
export interface MovementInput {
    velocityX: number;
    velocityY: number;
    direction: Direction | null;
    action: ActionType | null;
    isMoving: boolean;
}

export class InputManager {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard!.createCursorKeys();
    }

    getMovement(speed: number): MovementInput {
        let velocityX = 0;
        let velocityY = 0;
        let direction: Direction | null = null;
        let action: ActionType = 'idle';

        const up = this.cursors.up.isDown;
        const down = this.cursors.down.isDown;
        const left = this.cursors.left.isDown;
        const right = this.cursors.right.isDown;

        const isMoving = up || down || left || right;

        action = isMoving ? 'walk' : 'idle';

        // Vertical movement
        if (up) {
            velocityY = -speed;
            direction = 'north';
        } else if (down) {
            velocityY = speed;
            direction = 'south';
        } 

        // Horizontal movement
        if (left) {
            velocityX = -speed;
            direction = 'west';
        } else if (right) {
            velocityX = speed;
            direction = 'east';
        }

        // Handle diagonal priorities
        if (up && left) direction = 'north';
        else if (up && right) direction = 'north';
        else if (down && left) direction = 'south';
        else if (down && right) direction = 'south';

        //section 8: Prompt = How can i stop my sprite from changing speed when it moves diagonally
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= 0.707;
            velocityY *= 0.707;
        }
        //end of section 8

        return {
            velocityX,
            velocityY,
            direction,
            action,
            isMoving: velocityX !== 0 || velocityY !== 0
        };
    }
    isAttackPressed(): boolean {
        return this.cursors.space.isDown;
    }
}