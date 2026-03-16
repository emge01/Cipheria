import { NPC } from "./NPC";

export class Citizen extends NPC {

    constructor(scene: Phaser.Scene, x: number, y: number, character: string) {
        super(scene, x, y, character, 50);
        this.setDepth(100);
        this.setScale(0.75)
    }

    public interact(): void {
        super.interact();

        this.scene.events.emit('npc-interaction', {
            type: 'citizen',
            npc: this
        });
    }
}