import { Player } from "../characters/Player";
import { DialogueManager } from "../dialogue/DialogueManager";
import { EnemyManager } from "../characters/EnemyManager";
import { QuestManager } from "../quests/QuestManager";
import { NPC } from "../characters/NPC";
import { QuestController } from "./QuestController";
import Phaser from "phaser";
import { MAPS } from "../config/MapsConfig";

const KINGDOMS: Record<string, {
    map: string;
    arrival: string;
    puzzles: string[];
    complete: string;
}> = {
    linux: {
        map: 'linux-kingdom',
        arrival: 'quest-8-linux-arrival',
        puzzles: ['quest-8-linux-puzzle-1', 'quest-8-linux-puzzle-2', 'quest-8-linux-puzzle-3'],
        complete: 'quest-8-linux-complete'
    },
    windows: {
        map: 'windows-kingdom',
        arrival: 'quest-8-windows-arrival',
        puzzles: ['quest-8-windows-puzzle-1', 'quest-8-windows-puzzle-2', 'quest-8-windows-puzzle-3'],
        complete: 'quest-8-windows-complete'
    },
    mac: {
        map: 'mac-kingdom',
        arrival: 'quest-8-mac-arrival',
        puzzles: ['quest-8-mac-puzzle-1', 'quest-8-mac-puzzle-2', 'quest-8-mac-puzzle-3'],
        complete: 'quest-8-mac-complete'
    }
}

const TOTAL_KINGDOMS = Object.keys(KINGDOMS).length;

export class Quest8Controller extends QuestController {
    private completedKingdoms: Set<string> = new Set();
    private menuOpen = false;
    private menuContainer?: Phaser.GameObjects.Container;

    constructor(
            scene: Phaser.Scene,
            player: Player,
            enemyManager: EnemyManager,
            dialogueManager: DialogueManager,
            questManager: QuestManager,
        ) {
            super(scene, player, enemyManager, dialogueManager, questManager);
            this.playDialogueSequence(['quest-8-intro', 'quest-8-transmission'], () => {

            })
    }

    onPlayerNPCCollision(_npc: NPC): void {}

    onPortalEntered(): void {
        if (this.menuOpen) return;
        this.openKingdomMenu();
    }

    private openKingdomMenu(): void {
        this.menuOpen = true;

        const { width, height } = this.scene.scale;
        const available = Object.entries(KINGDOMS).filter(([id]) => !this.completedKingdoms.has(id));

        const bg = this.scene.add.rectangle(width / 2, height / 2, 500, 80 + available.length * 60, 0x000000, 0.85)
            .setScrollFactor(0).setDepth(2000);

        const title = this.scene.add.text(width / 2, height / 2 - (available.length * 30), 'Choose a Kingdom to travel to', {
            fontSize: '18px', color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);

        const buttons: Phaser.GameObjects.GameObject[] = [bg, title];

        available.forEach(([id, kingdom], i) => {
            const btnY = height / 2 - (available.length * 15) + 40 + i * 55;

            const btnBg = this.scene.add.rectangle(width / 2, btnY, 380, 44, 0x1a1a4e)
                .setStrokeStyle(2, 0x6666ff)
                .setInteractive({ useHandCursor: true })
                .setScrollFactor(0).setDepth(2001)
                .on('pointerover', () => btnBg.setFillStyle(0x4a4a8e))
                .on('pointerout', () => btnBg.setFillStyle(0x1a1a4e))
                .on('pointerdown', () => {
                    this.closeKingdomMenu();
                    this.travelToKingdom(id);
                });

            const btnLabel = this.scene.add.text(width / 2, btnY, kingdom.map, {
                fontSize: '15px', color: '#ffffff'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(2002);

            buttons.push(btnBg, btnLabel);
        });

        this.menuContainer = this.scene.add.container(0, 0, buttons).setDepth(2000);
    }

    private closeKingdomMenu(): void {
        this.menuContainer?.destroy();
        this.menuContainer = undefined;
        this.menuOpen = false;
    }

    private travelToKingdom(id: string): void {
        const kingdom = KINGDOMS[id];
        this.scene.events.emit('change-map', {
            mapConfig: MAPS[kingdom.map],
            spawnPoint: 'default'
        });
        this.scene.events.once('map-loaded', () => this.runKingdomStage(id))
    }

    private runKingdomStage(id: string): void {
        const kingdom = KINGDOMS[id];
        this.playDialogueSequence([kingdom.arrival, ...kingdom.puzzles, kingdom.complete], () => {
            this.completedKingdoms.add(id);
            this.returnToFortress();
        });
    }

    private returnToFortress(): void {
        this.scene.events.emit('change-map', {
            mapConfig: MAPS['fortress-entrance'],
            spawnPoint: 'default'
        });

        if (this.completedKingdoms.size >=TOTAL_KINGDOMS) {
            this.scene.events.once('map-loaded', () => this.startTrace());
        }
    }

    private startTrace(): void {}

    destroy(): void {
        super.destroy();
        this.closeKingdomMenu();
    }
}