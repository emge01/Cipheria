import Phaser from "phaser";
import { EnemyManager } from "../characters/EnemyManager";
import { DialogueManager } from "../dialogue/DialogueManager";
import { Player } from "../characters/Player";
import { BadGuy } from "../characters/BadGuy";
import { Citizen } from "../characters/Citizen";
import { QuestController } from "./QuestController";
import type { QuestManager } from "../quests/QuestManager";
import type { NPC } from "../characters/NPC";

export type Character = 'archer' | 'enchantress' | 'knight' | 'musketeer' | 'swordsman';

const CHARACTERS: Character[] = ['archer', 'enchantress', 'knight', 'musketeer', 'swordsman'];
const CITIZEN_DIALOGUES = [
    'npc-phishing-dialogue-citizen-1',
    'npc-phishing-dialogue-citizen-2',
    'npc-phishing-dialogue-citizen-3',
    'npc-phishing-dialogue-citizen-4',
    'npc-phishing-dialogue-citizen-5',
    'npc-phishing-dialogue-citizen-6'
];
const NPC_POSITIONS = [
    { x: 200, y: 200 }, { x: 600, y: 200 },
    { x: 200, y: 400 }, { x: 600, y: 400 },
    { x: 400, y: 150 }, { x: 400, y: 500 }
];

export class Quest3Controller extends QuestController{
    private stage = 0;
    private npcGroup!: Phaser.Physics.Arcade.Group;
    private interactedNPCs: Set<Citizen | BadGuy> = new Set();
    private selectionMode: boolean = false;
    private promptText!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, player: Player, enemyManager: EnemyManager, dialogueManager: DialogueManager, questManager: QuestManager) {
        super(scene, player, enemyManager, dialogueManager, questManager);
        this.dialogueManager.startDialogue("quest-3-intro");
        this.scene.events.once('dialogue-complete', () => this.startPhishingStage())
    }

    onPlayerNPCCollision(_npc: NPC): void {}

    private startPhishingStage() {
        this.stage = 1;
        this.interactedNPCs = new Set();
        this.clearNPCs();
        this.npcGroup?.destroy(true);
        this.npcGroup = this.scene.physics.add.group();

        const impostor: Character = Phaser.Utils.Array.GetRandom(CHARACTERS);
        console.log('spawning NPCs, count:', CHARACTERS.length);
        CHARACTERS.forEach((character, index) => {
            const { x, y } = NPC_POSITIONS[index];
            const npc =
                character === impostor
                    ? new BadGuy(this.scene, x, y, character)
                    : new Citizen(this.scene, x, y, character);

            npc.setInteractive();
            npc.on('pointerdown', () => this.onNPCClicked(npc));
            npc.on('pointerover', () => npc.setTint(0xaaaaff));
            npc.on('pointerout', () => {
                if (this.interactedNPCs.has(npc)) {
                    npc.setTint(0x00ff00);
                } else {
                    npc.clearTint();
                }
            });

            this.npcs.push(npc);
            this.npcGroup.add(npc);
        });
        console.log('NPC positions:', this.npcs.map(n => ({ x: n.x, y: n.y, visible: n.visible, active: n.active })));
        this.scene.physics.add.collider(this.player, this.npcGroup);
    }

    private onNPCClicked(npc: Citizen | BadGuy) {
        if (this.selectionMode) {
            npc instanceof BadGuy ? this.impostorIdentified() : this.wrongGuess();
            return;
        }

        if (this.interactedNPCs.has(npc)) return;

        this.interactedNPCs.add(npc);
        npc.setTint(0x00ff00);
        npc.interact();

        const dialogueKey = npc instanceof Citizen
            ? Phaser.Utils.Array.GetRandom(CITIZEN_DIALOGUES)
            : 'npc-phishing-dialogue-impostor';
        
        this.dialogueManager.startDialogue(dialogueKey);

        if (this.interactedNPCs.size === this.npcs.length) {
            this.scene.events.once('dialogue-complete', () => this.enterSelectionMode())
        }
        
    }

    private enterSelectionMode() {
        this.selectionMode = true;
        this.npcs.forEach(npc => npc.clearTint());

        this.promptText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            30,
            'Who is the impostor? Click on them!',
            { fontSize: '20px', color: '#ffff00', backgroundColor: '#000000', padding: { x: 10, y: 6 } }
        ).setOrigin(0.5).setScrollFactor(0).setDepth(100);
    }

    private wrongGuess() {
        this.selectionMode = false;
        this.promptText?.destroy();
        this.dialogueManager.startDialogue('quest-3-phishing-fail');

        this.scene.game.events.once('dialogue-complete', () => {
            this.startPhishingStage();
        });
    }

    private impostorIdentified() {
        if (this.stage !== 1) return;
        this.selectionMode = false;
        this.promptText?.destroy();
        this.dialogueManager.startDialogue('quest-3-phishing-complete');

        this.scene.events.once('dialogue-complete', () => {
            this.npcs.forEach(npc => npc.destroy());
            this.npcs = [];
            this.npcGroup.clear(true, true);
            this.startDDoSStage();
        });
    }

    private startDDoSStage() {
        this.stage = 2;
        this.dialogueManager.startDialogue('quest-3-ddos-intro');

        this.scene.events.once('dialogue-complete', () => {
            this.spawnDroneWave();
            this.checkDDoSStageComplete();
        })
    }

    private checkDDoSStageComplete() {
        this.scene.game.events.on('enemy-killed', () => {
            const remaining = this.enemyManager.getEnemies().getLength();
            if (remaining === 0 && this.stage === 2) {
                this.scene.game.events.removeListener('enemy-killed');
                this.dialogueManager.startDialogue('quest-3-ddos-complete');

                this.scene.events.once('dialogue-complete', () => this.startMalwareStage());
            }
        });
    }

    private startMalwareStage() {
        this.stage = 3;
        this.dialogueManager.startDialogue('quest-3-malware-intro');

        this.scene.events.once('dialogue-complete', () => {
            const slime = this.enemyManager.spawnSlime(400, 300);
            this.scene.physics.add.overlap(
                this.player,
                slime,
                () => this.slimeTouched(),
                undefined,
                this
            )

        })
    }

    private slimeTouched() {
        this.enemyManager.spawnSlime(400, 300);
       
        this.dialogueManager.startDialogue('quest-3-malware-complete');
        this.scene.events.once('dialogue-complete', () => {
            this.enemyManager.getEnemies().clear(true, true);
            this.startRansomewareStage();
       })
    }
    private startRansomewareStage() {
        this.stage = 4;
        this.dialogueManager.startDialogue('quest-3-ransomware-intro');

        this.scene.events.once('dialogue-complete', () => {
            const agent = new BadGuy(this.scene, 400, 300, 'wizard');

            this.dialogueManager.startDialogue('riddle-1');

            this.scene.events.once('dialogue-complete', () => {
                agent.destroy();
                this.dialogueManager.startDialogue('quest-3-ransomware-complete');
                this.scene.events.once('dialogue-complete', () => this.dialogueManager.startDialogue('quest-3-wrapup'));                });
            });
    }
}