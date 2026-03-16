import Phaser from "phaser";
import { Player } from "../characters/Player";
import { DialogueManager } from "../dialogue/DialogueManager";
import { QuestManager } from "../quests/QuestManager";
import { EnemyManager } from "../characters/EnemyManager";
import { NPC } from "../characters/NPC";
import { MAPS } from "../config/MapsConfig";
import { BadGuy } from "../characters/BadGuy";
import { QuestController } from "./QuestController";

const CONFIDENTIALITY_NPC_TOTAL = 7;
const IMPOSTOR_DIALOGUES = [
    'quest-4-confidentiality-badguy-1',
    'quest-4-confidentiality-badguy-2',
    'quest-4-confidentiality-badguy-3'
];
const CITIZEN_DIALOGUES = [
    'quest-4-confidentiality-citizen-1',
    'quest-4-confidentiality-citizen-2',
    'quest-4-confidentiality-citizen-3',
    'quest-4-confidentiality-citizen-4',
    'quest-4-confidentiality-citizen-5'
];
    

export class Quest4Controller extends QuestController{
    private stage = 0;
    private isInteracting = false;
    private totalInteractions = 0;
    private crystal?: string;
    private spawnTimers: Phaser.Time.TimerEvent[] = [];

    constructor(scene: Phaser.Scene, player: Player, enemyManager: EnemyManager, dialogueManager: DialogueManager, questManager: QuestManager) {
        super(scene, player, enemyManager, dialogueManager, questManager);
        this.dialogueManager.startDialogue('quest-4-intro');
    } 

    onCrystalClicked() {
        if (this.isInteracting) return;
        this.isInteracting = true;
        this.dialogueManager.startDialogue('quest-4-integrity-intro');
        this.scene.events.once('dialogue-complete', () => this.startIntegrityStage());
    }

    private startIntegrityStage() {
        this.crystal = 'integrity-crystal';
        this.dialogueManager.startDialogue('quest-4-integrity-riddle');
        this.scene.events.once('dialogue-complete', () => this.onIntegrityComplete());
    }

    private onIntegrityComplete() {
        this.scene.events.emit('crystal-restored', { crystalType: this.crystal });
        this.dialogueManager.startDialogue('quest-4-integrity-complete');
        this.scene.events.once('dialogue-complete', () => {
            this.scene.events.emit('change-map', {
                mapConfig: MAPS['cipheria-town'],
                spawnPoint: 'default'
            });
            this.stage++;
            this.dialogueManager.startDialogue('quest-4-confidentiality-intro');
        });
    }

    onPlayerNPCCollision(npc: NPC) {
        if (this.stage !== 1) return;
        if (npc.interacting()) return;
        npc.interact();

        let dialogueKey: string;

        if (npc instanceof BadGuy) {
            dialogueKey = Phaser.Utils.Array.GetRandom(IMPOSTOR_DIALOGUES);
        } else {
            dialogueKey = Phaser.Utils.Array.GetRandom(CITIZEN_DIALOGUES);
        }

        this.dialogueManager.startDialogue(dialogueKey);
        this.totalInteractions++;

        this.scene.events.once('dialogue-complete', () => {
            if (this.totalInteractions >= CONFIDENTIALITY_NPC_TOTAL) {
                this.onAllNPCsInteracted();
            }
        });
    }

    private onAllNPCsInteracted() {
        this.dialogueManager.startDialogue('quest-4-confidentiality-quiz');
        this.scene.events.once('dialogue-complete', () => this.onConfidentialityComplete());
    }

    private onConfidentialityComplete() {
        this.dialogueManager.startDialogue('quest-4-confidentiality-found');
        this.stage++;
        this.scene.events.once('dialogue-complete', () => {
            this.npcs.forEach(npc => npc.destroy());
            this.npcs = [];
            this.scene.events.emit('change-map', {
                mapConfig: MAPS['null-domain'],
                spawnPoint: 'default'
            });
            this.dialogueManager.startDialogue('quest-4-availability-intro');
            this.scene.events.once('dialogue-complete', () => {
                this.spawnDroneWave();
                this.checkWaveDefeated();
            });
        });
    }

    private checkWaveDefeated() {
        this.scene.game.events.on('enemy-killed', () => {
            const enemyManager: EnemyManager | undefined = (this.scene as any).getEnemyManager();
            if (!enemyManager) return;
            const remaining = enemyManager.getEnemies().getLength();
            if (remaining === 0 && this.stage === 2) {
                this.scene.game.events.removeListener('enemy-killed');
                this.onAvailabilityComplete();
            }
        });
    }

    private onAvailabilityComplete() {
        this.spawnTimers.forEach(t => t.destroy());
        this.spawnTimers = [];
        this.stage++;
        this.dialogueManager.startDialogue('quest-4-availability-complete');
        this.scene.events.once('dialogue-complete', () => {
            this.scene.events.emit('change-map', {
                mapConfig: MAPS['motherboard-quest-4'],
                spawnPoint: 'default'
            });
            this.questManager.completeQuest('quest-4');
        });
    }
}