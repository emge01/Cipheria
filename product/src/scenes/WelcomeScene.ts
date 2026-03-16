import Phaser from "phaser";
import { QUESTS } from "../config/QuestsConfig";

export class WelcomeScene extends Phaser.Scene {

    private buttons: Phaser.GameObjects.Text[] = [];
    private expanded: boolean = false;

    constructor() {
        super('WelcomeScene');
    }

    preload(): void {
        this.load.image('Cipheria-tower', 'assets/welcome-page.png');
    }

    create(): void {
        const {width, height} = this.scale;

        const background = this.add.image(width/2,height/2, 'Cipheria-tower');
        background.setScale(4);
        
        this.add.rectangle(
            width / 2,
            height / 2,
            400,
            300,
            0x000000,
            0.6
        ).setStrokeStyle(2, 0xffffff)

        this.createButton(width / 2, height / 2 - 50, "Play", () => {
            this.scene.start('GameScene', { questId: 'quest-1' });
        });

        this.createButton(width / 2, height / 2, "Select Level", () => {
            this.toggleLevelSelect();
        });
    }

    private createButton(x: number, y: number, label: string, callback: () => void): void {
        const button = this.add.text(x, y, label, {
            fontSize: "22px",
            backgroundColor: "#222222",
            color: "#ffffff",
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setStyle({ backgroundColor: "#444444" });
        });

        button.on('pointerout', () => {
            button.setStyle({ backgroundColor: "#222222" });
        });

        button.on('pointerdown', callback);

        this.buttons.push(button)
    }
        private toggleLevelSelect() {
        const { width, height } = this.scale;

        // Remove old quest buttons if already expanded
        if (this.expanded) {
            this.buttons.slice(2).forEach(btn => btn.destroy());
            this.buttons = this.buttons.slice(0, 2);
            this.expanded = false;
            return;
        }

        let offsetY = height / 2 + 60;

        Object.values(QUESTS).forEach(quest => {
            const button = this.add.text(width / 2, offsetY, quest.name, {
                fontSize: "18px",
                backgroundColor: "#333333",
                color: "#ffffff",
                padding: { x: 15, y: 6 }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: "#555555" });
            });

            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: "#333333" });
            });

            button.on('pointerdown', () => {
                this.scene.start('GameScene', { questId: quest.id });
            });

            this.buttons.push(button);
            offsetY += 40;
        });

        this.expanded = true;
    }
}
