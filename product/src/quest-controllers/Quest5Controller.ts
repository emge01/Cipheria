import Phaser from "phaser";
import { Player } from "../characters/Player";
import { DialogueManager } from "../dialogue/DialogueManager";
import { NPC } from "../characters/NPC";
import { Citizen } from "../characters/Citizen";
import { QuestController } from "./QuestController";
import type { EnemyManager } from "../characters/EnemyManager";
import type { QuestManager } from "../quests/QuestManager";

const GUARD_STAGES = [
    {
        dialogues: ['quest-5-guard1-greeting', 'quest-5-player-name', 'quest-5-guard1-verified'],
    },
    {
        dialogues: ['quest-5-guard2-greeting', 'quest-5-guard2-verified'],
    },
    {
        dialogues: ['quest-5-guard3-greeting', 'quest-5-invitation-choice', 'quest-5-guard3-verified'],
    },
];

export class Quest5Controller extends QuestController{
    private stage = 0;
    private guard?: NPC
    private isInteracting = false;

    constructor(scene: Phaser.Scene, player: Player, enemyManager: EnemyManager, dialogueManager: DialogueManager, questManager: QuestManager) {
            super(scene, player, enemyManager, dialogueManager, questManager);
            this.dialogueManager.startDialogue('quest-5-intro');
            this.scene.events.once('dialogue-complete', () => this.spawnGuard());
            this.scene.events.on('map-loaded', () => this.spawnGuard());
    }

    onPlayerNPCCollision(_npc: NPC): void {}

    private spawnGuard() {
        this.guard?.destroy();

        if (this.stage >= 3) return;

        this.player = (this.scene as any).getPlayer();
        if (!this.player) return;

        this.guard = new Citizen(this.scene, 400, 100, 'archer');
        this.scene.physics.add.collider(
            this.player,
            this.guard,
            () => this.onGuardOverlap(),
            undefined,
            this
        );
    }

    private onGuardOverlap() {
        if (this.isInteracting) return;
        this.isInteracting = true;
        this.runGuardStageInteraction(this.stage);
    }

    private runGuardStageInteraction(stage: number) {
        const {dialogues} = GUARD_STAGES[stage];
        this.playDialogueSequence(dialogues, () => {
            this.guard?.destroy();
            this.stage++;
            this.isInteracting = false;

            if (this.stage === GUARD_STAGES.length) {
                this.dialogueManager.startDialogue('quest-5-wrapup');
            }
        })
    }
    
    getStage() {
        return this.stage;
    }
}