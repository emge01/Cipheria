import Phaser from "phaser";
import { CaesarCipherGame } from "./CeasarCipherGame";
import { ReferencePanel } from "./ReferencePanel";
import type { ReferenceType } from "./ReferencePanel";

export type CipherType = 'caesar' | 'morse' | 'binary';

export interface CipherConfig {
    type: CipherType;
    encoded: string;
    answer: string;
    shift?: number;
}

export class CipherManager {
    private scene: Phaser.Scene;
    private activeGame?: CaesarCipherGame;
    private referencePanel: ReferencePanel;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.referencePanel = new ReferencePanel(scene);
    }

    startCipher(config: CipherConfig): void {
        this.destroy();
        switch (config.type) {
            case 'caesar':
                this.activeGame = new CaesarCipherGame(this.scene, config);
                this.activeGame.start();
                break;
            case 'morse':
            case 'binary':
                this.referencePanel.show(config.type as ReferenceType);
                this.scene.events.once('dialogue-complete', () => this.referencePanel.hide());
                break;
        }
    }

    destroy(): void {
        this.activeGame?.destroy();
        this.activeGame = undefined;
        this.referencePanel.hide();
    }
}