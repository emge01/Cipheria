import type { DialogueData } from "./DialogueConfig";

export class Dialogue {
    private isActive = true;
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private dialogueData: DialogueData;
    private index = 0;
    private character?: Phaser.GameObjects.Image;
    private onComplete?: () => void;
    private text: Phaser.GameObjects.Text;
    private choiceButtons: Phaser.GameObjects.Container[] = [];
    private awaitingChoice = false;

    constructor(scene: Phaser.Scene, dialogueData: DialogueData) {
        this.scene = scene;
        this.dialogueData = dialogueData;

        const panel = this.scene.add.rectangle(0, -50, 750, 150, 0x000000, 0.7).setOrigin(0).setDepth(1000);
        this.text = scene.add.text(10, -20, '', {
            fontSize: '20px',
            color: '#ffffff',
            wordWrap: { width: 700 }
        });

        this.container = this.scene.add.container(20, scene.scale.height - 120, [panel, this.text]);
        this.container.setDepth(1000).setScrollFactor(0);
        this.text.setDepth(1000);

        if (dialogueData.character) {
            this.character = this.scene.add.image(750, 700, dialogueData.character)
                .setDepth(1000).setScrollFactor(0);
        }
    }

    start(onComplete?: () => void): void {
        this.onComplete = onComplete;
        this.showCurrentText();
        this.scene.input.keyboard?.on('keydown-ENTER', this.showNextText, this);
    }

    private showCurrentText(): void {
        if (!this.isActive) return;
        this.text.setText(this.dialogueData.texts[this.index]);
    }

    private showNextText(): void {
        if (!this.isActive || this.awaitingChoice) return;
        this.index++;

        // Last text and choices exist — show choices instead of ending
        if (this.index >= this.dialogueData.texts.length && this.dialogueData.choices) {
            this.showChoices();
            return;
        }

        if (this.index >= this.dialogueData.texts.length) {
            this.end();
            return;
        }

        this.showCurrentText();
    }

    private showChoices(): void {
        this.awaitingChoice = true;
        this.scene.input.keyboard?.off('keydown-ENTER', this.showNextText, this);
        this.text.setText('Choose your answer:');

        const choices = this.dialogueData.choices!;
        const shuffled = Phaser.Utils.Array.Shuffle([...choices]);

        shuffled.forEach((choice, i) => {
            const x = i % 2 === 0 ? 180 : 550;
            const y = i < 2 ? 30 : 80;

            const bg = this.scene.add.rectangle(x, y, 280, 36, 0x1a1a4e)
                .setStrokeStyle(2, choice.correct ? 0x6666ff : 0x6666ff)
                .setInteractive({ useHandCursor: true })
                .setScrollFactor(0).setDepth(1001)
                .on('pointerover', () => bg.setFillStyle(0x4a4a8e))
                .on('pointerout', () => bg.setFillStyle(0x1a1a4e))
                .on('pointerdown', () => this.onChoiceSelected(choice, bg));

            const label = this.scene.add.text(x, y, choice.label, {
                fontSize: '14px', color: '#ffffff'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);

            const btn = this.scene.add.container(20, this.scene.scale.height - 120, [bg, label])
                .setScrollFactor(0).setDepth(1001);

            this.choiceButtons.push(btn);
        });
    }

    private onChoiceSelected(
        choice: { label: string, correct: boolean, response: string },
        bg: Phaser.GameObjects.Rectangle
    ): void {
        // Disable all buttons
        this.choiceButtons.forEach(btn => btn.each((obj: any) => obj.removeAllListeners?.()));

        // Flash correct/wrong colour
        bg.setFillStyle(choice.correct ? 0x006600 : 0x660000);
        this.text.setText(choice.response);

        this.clearChoices();
        
        this.scene.time.delayedCall(3000, () => {
            if (choice.correct) {
                this.clearChoices();
                this.end();
            } else {
                this.clearChoices();
                this.awaitingChoice = false;
                this.showChoices();
            }
        });
    }

    private clearChoices(): void {
        this.choiceButtons.forEach(btn => btn.destroy());
        this.choiceButtons = [];
    }

    private end(): void {
        this.scene.input.keyboard?.off('keydown-ENTER', this.showNextText, this);
        this.destroy();
        if (this.onComplete) this.onComplete();
    }

    destroy(): void {
        this.isActive = false;
        this.clearChoices();
        this.container.destroy();
        this.character?.destroy();
    }
}