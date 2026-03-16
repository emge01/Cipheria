import { Player } from "../characters/Player";
import { DialogueManager } from "../dialogue/DialogueManager";
import { EnemyManager } from "../characters/EnemyManager";
import { QuestManager } from "../quests/QuestManager";
import { NPC } from "../characters/NPC";
import { QuestController } from "./QuestController";
import Phaser from "phaser";

const DEFENCE_STAGES: Record<string, { intro: string; riddle: string; complete: string }> = {
    firewall: {
        intro: 'quest-7-firewall-intro',
        riddle: 'quest-7-firewall-riddle',
        complete: 'quest-7-firewall-complete'
    },
    antivirus: {
        intro: 'quest-7-antivirus-intro',
        riddle: 'quest-7-antivirus-riddle',
        complete: 'quest-7-antivirus-complete'
    },
    encryption: {
        intro: 'quest-7-encryption-intro',
        riddle: 'quest-7-encryption-riddle',
        complete: 'quest-7-encryption-complete'
    },
    ids: {
        intro: 'quest-7-ids-intro',
        riddle: 'quest-7-ids-riddle',
        complete: 'quest-7-ids-complete'
    },
};

const TOTAL_DEFENCES = Object.keys(DEFENCE_STAGES).length;

export class Quest7Controller extends QuestController {
    private completedDefences: Set<string> = new Set();
    private isInteracting = false;

    constructor(
        scene: Phaser.Scene,
        player: Player,
        enemyManager: EnemyManager,
        dialogueManager: DialogueManager,
        questManager: QuestManager,
    ) {
        super(scene, player, enemyManager, dialogueManager, questManager);
        this.dialogueManager.startDialogue('quest-7-intro');
    }

    onPlayerNPCCollision(_npc: NPC): void {}

    onBuildZoneInteract(id: string): void {
        if (this.isInteracting) return;
        if (this.completedDefences.has(id)) return;

        const stage = DEFENCE_STAGES[id];
        if (!stage) { console.warn(`Unknown build zone stage: ${id}`); return; }

        this.isInteracting = true;
        this.playDialogueSequence([stage.intro, stage.riddle, stage.complete], () => {
            this.completedDefences.add(id);
            this.isInteracting = false;
            if (this.completedDefences.size >= TOTAL_DEFENCES) {
                this.onAllDefencesBuilt();
            }
        });
    }

    private onAllDefencesBuilt(): void {
        this.dialogueManager.startDialogue('quest-7-wrapup');
        this.scene.events.once('dialogue-complete', () => {
            this.questManager.completeQuest('quest-7');
        });
    }
}