import Phaser from "phaser";
import { EnemyManager } from "../characters/EnemyManager";
import { DialogueManager } from "../dialogue/DialogueManager";
import { Player } from "../characters/Player";
import { NPC } from "../characters/NPC";
import type { QuestManager } from "../quests/QuestManager";

export abstract class QuestController {
    protected scene: Phaser.Scene;
    protected player: Player;
    protected enemyManager: EnemyManager;
    protected dialogueManager: DialogueManager;
    protected questManager: QuestManager;
    protected npcs: NPC[] = [];

    constructor(scene: Phaser.Scene, player: Player, enemyManager: EnemyManager, dialogueManager: DialogueManager, questManager: QuestManager) {
        this.scene = scene;
        this.player = player;
        this.enemyManager = enemyManager;
        this.dialogueManager = dialogueManager;
        this.questManager = questManager;
    }

    registerNPC(npc: NPC) {
        this.npcs.push(npc);
    }

    protected clearNPCs(): void {
        this.npcs.forEach(npc => npc.destroy());
        this.npcs = [];
    }

    abstract onPlayerNPCCollision(npc: NPC): void;

    protected spawnDroneWave() {
        this.enemyManager = (this.scene as any).getEnemyManager()
        const corners = [
            { x: 100, y: 100 },
            { x: 700, y: 100 },
            { x: 100, y: 700 },
        ]

        corners.forEach(corner => {
            let spawned = 0;
            const timer = this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    this.enemyManager.spawnDrone(corner.x, corner.y);
                    spawned ++
                    if (spawned >= 50) timer.destroy();
                },
                loop: true
            });
        });
    }
    protected playDialogueSequence(keys: string[], onComplete: () => void): void {
        //tried using a for loop, but didnt work
        const [first, ...rest] = keys; //end
        this.dialogueManager.startDialogue(first);
        if (rest.length === 0) {
            this.scene.events.once('dialogue-complete', onComplete);
        } else {
            this.scene.events.once('dialogue-complete', () => this.playDialogueSequence(rest, onComplete));
        }
    }

    destroy(): void {
        this.clearNPCs();
    }

    update(): void {};

}