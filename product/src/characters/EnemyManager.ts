import { Drone } from "./Drone";
import { Slime } from "./Slime";
import type { Player } from "./Player";
import { Enemy } from "./Enemy";

export class EnemyManager {
    private scene: Phaser.Scene;
    private enemies: Phaser.Physics.Arcade.Group;
    private player: Player;
    private colliders: Phaser.Physics.Arcade.Collider[] = [];

    constructor(scene: Phaser.Scene, player: Player, collisionLayer: Phaser.Tilemaps.TilemapLayer) {
        this.scene = scene;
        this.player = player;
        this.enemies = scene.physics.add.group();

        this.scene.events.on('player-attack', this.onPlayerAttack, this);
        this.colliders.push(this.scene.physics.add.collider(this.enemies, this.enemies));
        this.colliders.push(this.scene.physics.add.collider(this.enemies, collisionLayer));
    }

    private onPlayerAttack(): void {
        console.log('attack fired, enemies:', this.enemies.getLength());
        this.scene.physics.overlap(this.player, this.enemies, (_, enemy) => {
            console.log('overlap hit:', enemy);
            (enemy as Enemy).destroy();
            this.scene.game.events.emit('enemy-killed', enemy);
        });
    }

    destroy(): void {
        this.scene.events.off('player-attack', this.onPlayerAttack, this);
        this.colliders.forEach(c => c.destroy());
        this.colliders = [];
        this.enemies.clear(true, true);
    }

    spawnDrone(x: number, y: number): Drone {
        const drone = new Drone(this.scene, x, y);
        this.enemies.add(drone);
        return drone;
    }

    spawnSlime(x: number, y: number): Slime {
        const slime = new Slime(this.scene, x, y);
        this.enemies.add(slime);
        slime.setDepth(100);
        return slime;
    }

    update(): void {
        const enemies = this.enemies.getChildren() as Enemy[];
        enemies.forEach(enemy => {
            enemy.followPlayer(this.player);
            enemies.forEach(other => {
                if (other === enemy) return;
                const dist = Phaser.Math.Distance.Between(enemy.x, enemy.y, other.x, other.y);
                if (dist < 32) {
                    const angle = Phaser.Math.Angle.Between(other.x, other.y, enemy.x, enemy.y);
                    const body = enemy.body as Phaser.Physics.Arcade.Body | null;
                    if (!body) return;
                    body.velocity.x += Math.cos(angle) * 45;
                    body.velocity.y += Math.sin(angle) * 45;
                }
            });
        });
    }

    getEnemies(): Phaser.GameObjects.Group {
        return this.enemies;
    }
}