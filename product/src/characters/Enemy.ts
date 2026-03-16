import { EnemyConfig, type EnemyType } from "../config/EnemyConfig";
import type { EnemyManager } from "./EnemyManager";
import type { Player } from "./Player";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    type: EnemyType;
    attackCooldown: number;
    
    //initialisation of Enemy class
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: EnemyType) {
        super(scene, x, y, texture);

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.type = type;
        this.attackCooldown = 0;
        
        this.setCollideWorldBounds(true);
    }

    //spawn enemy (type of enemy can change) stating how many to spawn and if there should be a delay between spawns
    static spawn(
        scene: Phaser.Scene,
        trigger: Phaser.Types.Tilemaps.TiledObject,
        enemyType: EnemyType,
        count: number,
        delay: number,
        enemyManager: EnemyManager
    ): void {
        if (delay === 0) {
            for (let n = 0; n < count; n++) {
                Enemy.spawnSingleEnemy(trigger, enemyType, enemyManager);
            }
        } else {
            Enemy.spawnWithDelay(scene,trigger, enemyType, count, delay, enemyManager)
        }
    }

    //spawns the enemies with a delay between each spawn
    private static spawnWithDelay(
        scene: Phaser.Scene,
        trigger: Phaser.Types.Tilemaps.TiledObject,
        enemyType: EnemyType,
        count: number,
        delay: number,
        enemyManager: EnemyManager
    ): void {
        let spawned = 0;
        const timer = scene.time.addEvent({
            delay: delay,
            callback: () => {
                Enemy.spawnSingleEnemy(trigger, enemyType, enemyManager);
                spawned++;

                if (spawned >= count) {
                    timer.destroy()
                }
            },
            loop: true
        });
    }

    //spawns a single enemy
    private static spawnSingleEnemy(
        trigger: Phaser.Types.Tilemaps.TiledObject,
        enemyType: string,
        enemyManager: EnemyManager
    ): void {

        let x = trigger.x!;
        let y = trigger.y!;

        const direction = trigger.properties?.find((p:any) => p.name === 'spawnDirection')?.value;

        switch (direction) {
            case 'down':
                x += trigger.width! / 2;
                y += trigger.height!;
                break;
            case 'up':
                x += trigger.width! / 2;
                break;
            case 'left':
                y += trigger.height! / 2;
                break;
            case 'right':
                x += trigger.width!;
                y += trigger.height! / 2;
                break;
            default:
                x += trigger.width! / 2;
                y += trigger.height! /2;
        }
        
        if (enemyType === 'drone') {
            enemyManager.spawnDrone(x, y);
        }
    }

    //Makes sure that the enemies are targeting the player and following the player around the map
    followPlayer(player: Player): void {
        const offsetX = Phaser.Math.Between(-25, 25);
        const offsetY = Phaser.Math.Between(-25, 25);
        const speed = this.type === 'drone' ? EnemyConfig.SPEED.DRONE : EnemyConfig.SPEED.SLIME
        this.scene.physics.moveTo(this, player.x + offsetX, player.y + offsetY, speed);
    }


}