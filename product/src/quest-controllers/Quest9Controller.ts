import Phaser from "phaser";
import { Player } from "../characters/Player";
import { DialogueManager } from "../dialogue/DialogueManager";
import { EnemyManager } from "../characters/EnemyManager";
import { QuestManager } from "../quests/QuestManager";
import { NPC } from "../characters/NPC";
import { QuestController } from "./QuestController";
import { CipherManager } from "../ciphers/CipherManager";
import type { CipherConfig } from "../ciphers/CipherManager";

interface Exchange {
    intro: string;
    cipher: CipherConfig;
    cipherDialogue?: string;
    reveal: string;
}

const EXCHANGES: Exchange[] = [
    {
        intro: 'quest-9-exchange-1-intro',
        cipher: { type: 'caesar', encoded: 'WKH JXDUGLDQ LV DOLYH', answer: 'THE GUARDIAN IS ALIVE', shift: 3 },
        reveal: 'quest-9-exchange-1-reveal'
    },
    {
        intro: 'quest-9-exchange-2-intro',
        cipher: {
            type: 'morse',
            encoded: '.. / .- -- / .. -. / - .... . / -. ..- .-.. .-.. / -.. --- -- .- .. -.',
            answer: 'I AM IN THE NULL DOMAIN'
        },
        cipherDialogue: 'quest-9-morse-choice',
        reveal: 'quest-9-exchange-2-reveal'
    },
    {
        intro: 'quest-9-exchange-3-intro',
        cipher: {
            type: 'binary',
            encoded: '01000011 01001111 01010010 01000101',
            answer: 'CORE'
        },
        cipherDialogue: 'quest-9-binary-choice',
        reveal: 'quest-9-exchange-3-reveal'
    },
    {
        intro: 'quest-9-exchange-4-intro',
        cipher: { type: 'caesar', encoded: 'ABEGU GBJRE', answer: 'NORTH TOWER', shift: 13 },
        reveal: 'quest-9-exchange-4-reveal'
    }
];

export class Quest9Controller extends QuestController {
    private cipherManager: CipherManager;
    private exchange = 0;
    private isInteracting = false;

    constructor(
        scene: Phaser.Scene,
        player: Player,
        enemyManager: EnemyManager,
        dialogueManager: DialogueManager,
        questManager: QuestManager,
    ) {
        super(scene, player, enemyManager, dialogueManager, questManager);
        this.cipherManager = new CipherManager(scene);

        this.scene.events.on('cipher-complete', this.onCipherComplete, this);
        this.scene.events.on('cipher-failed', this.onCipherFailed, this);

        this.dialogueManager.startDialogue('quest-9-intro');
    }

    onPlayerNPCCollision(_npc: NPC): void {}

    onCrystalInteract(): void {
        if (this.isInteracting) return;
        if (this.exchange >= EXCHANGES.length) return;
        this.isInteracting = true;
        this.startExchange(this.exchange);
    }

    private startExchange(index: number): void {
        const ex = EXCHANGES[index];
        const isMiniGame = ex.cipher.type === 'caesar';

        this.dialogueManager.startDialogue(ex.intro);
        this.scene.events.once('dialogue-complete', () => {
            if (isMiniGame) {
                this.cipherManager.startCipher(ex.cipher);
            } else {
                this.cipherManager.startCipher(ex.cipher);
                this.dialogueManager.startDialogue(ex.cipherDialogue!);
                this.scene.events.once('dialogue-complete', () =>
                    this.onCipherComplete({ type: ex.cipher.type, decoded: ex.cipher.answer })
                );
            }
        });
    }

    private onCipherComplete(_data: { type: string; decoded: string }): void {
        const ex = EXCHANGES[this.exchange];
        this.cipherManager.destroy();
        this.dialogueManager.startDialogue(ex.reveal);
        this.scene.events.once('dialogue-complete', () => {
            this.exchange++;
            this.isInteracting = false;
            if (this.exchange >= EXCHANGES.length) {
                this.onAllExchangesComplete();
            }
        });
    }

    private onCipherFailed(): void {
        this.cipherManager.destroy();
        this.isInteracting = false;
    }

    private onAllExchangesComplete(): void {
        this.dialogueManager.startDialogue('quest-9-wrapup');
        this.scene.events.once('dialogue-complete', () => {
            this.questManager.completeQuest('quest-9');
        });
    }

    destroy(): void {
        super.destroy();
        this.cipherManager.destroy();
        this.scene.events.off('cipher-complete', this.onCipherComplete, this);
        this.scene.events.off('cipher-failed', this.onCipherFailed, this);
    }
}