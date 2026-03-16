import Phaser from "phaser";
import { Player } from "../characters/Player";
import { DialogueManager } from "../dialogue/DialogueManager";
import { QuestManager } from "../quests/QuestManager";
import { NPC } from "../characters/NPC";
import { BadGuy } from "../characters/BadGuy";
import { QuestController } from "./QuestController";
import type { EnemyManager } from "../characters/EnemyManager";

const TOTAL_NPCS = 7;
const TRICKSTER_DIALOGUES = [
    'quest-6-trickster-1',
    'quest-6-trickster-2',
    'quest-6-trickster-3',
    'quest-6-trickster-4'
]
const GENUINE_DIALOGUES = [
    'quest-6-genuine-1',
    'quest-6-genuine-2',
    'quest-6-genuine-3',
    'quest-6-genuine-4'
]

export class Quest6Controller extends QuestController{
    private totalInteractions = 0;

    constructor(scene: Phaser.Scene, player: Player, enemyManager: EnemyManager, dialogueManager: DialogueManager, questManager: QuestManager) {
        super(scene, player, enemyManager, dialogueManager, questManager);
        this.dialogueManager.startDialogue('quest-6-intro');
    } 

    onPlayerNPCCollision(npc: NPC): void {
        if (npc.interacting()) return;
        npc.interact();

        let dialogueKey: string;

        if (npc instanceof BadGuy) {
            dialogueKey = Phaser.Utils.Array.GetRandom(TRICKSTER_DIALOGUES);
        } else {
            dialogueKey = Phaser.Utils.Array.GetRandom(GENUINE_DIALOGUES);
        }

        this.dialogueManager.startDialogue(dialogueKey);

        this.scene.events.once('dialogue-complete', () => {
            this.totalInteractions ++;
            if (this.totalInteractions >= TOTAL_NPCS) {
                this.onAllInteractionsComplete();
            }
        });
    }

    private onAllInteractionsComplete(): void {
        this.npcs.forEach(npc => npc.destroy());
        this.npcs = [];
        
        this.dialogueManager.startDialogue('quest-6-wrapup')
    }

}