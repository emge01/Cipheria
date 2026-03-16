import { NPC } from "./NPC";

export class BadGuy extends NPC {

    private isAttacking: boolean = false;
    private discovered: boolean = false;
    private attackRange: number = 64;

    constructor(scene: Phaser.Scene, x: number, y:number, character: string) {
        super(scene, x, y, character, 50);

        this.setDepth(100);
        this.setScale(0.75)
    }

    update(): void {
        super.update();

        const player = (this.scene as any).getPlayer?.();
        if (!player) return

        const distance = Phaser.Math.Distance.Between(
            this.x, this.y, player.x, player.y
        );

        if (distance < this.attackRange && !this.isAttacking && !this.discovered) {
            this.attack();
        }
    }

    private attack(): void {
        this.isAttacking = true;
        this.setVelocity(0, 0);

        this.playAnimation('attack');

        this.scene.time.delayedCall(300, () => {
            this.isAttacking = false;
            this.playAnimation('idle');
        });
    }

    public interact(): void {
        this.scene.events.emit('npc-interaction', {
            type: 'badguy',
            npc: this
        })
    }
}