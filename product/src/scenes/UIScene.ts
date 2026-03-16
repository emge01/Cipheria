import Phaser from 'phaser';
import { QuestManager } from '../quests/QuestManager';

export class UIScene extends Phaser.Scene {
    private questManager!: QuestManager;
    private questText!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'UIScene', active: false });
    }

    init(data: { questManager: QuestManager }): void {
        this.questManager = data.questManager;
    }

    create(): void {
        const panel = this.add.graphics();

        // section 1: Prompt = How can I create a semi transparent panel which stays in the same place as the player moves
        panel.fillStyle(0x000000, 0.7);
        panel.fillRoundedRect(10, 10, 300, 200, 10);
        panel.setScrollFactor(0);

        this.questText = this.add.text(20, 20, '', {
            fontSize: '20px',
            color: '#ffffff',
            wordWrap: { width: 280 }
        });
        this.questText.setScrollFactor(0);
        // end of section 1

        this.game.events.on('quest-updated', this.updateQuestDisplay, this);
        this.game.events.on('quest-completed', this.onQuestComplete, this);

        this.updateQuestDisplay();
    }

    private updateQuestDisplay(): void {
        const activeQuests = this.questManager.getActiveQuests();
        
        if (activeQuests.length === 0) {
            this.questText.setText('No active quests');
            return;
        }

        // section 2: Prompt = How can I format neatly the active quests with their objectives, keeping track of what has been completed and what hasn't
        let display = 'ACTIVE QUESTS:\n\n';
        
        activeQuests.forEach(quest => {
            display += `${quest.name}\n`;
            quest.objectives.forEach(obj => {
                const status = obj.completed ? '✓' : '○';
                display += `  ${status} ${obj.description}\n`;
            });
            display += '\n';
        });
        //end of section 2

        this.questText.setText(display);
    }

    private onQuestComplete(questId: string): void {
        //section 3: Prompt = How to create an animated notification that pops up when the quest is completed
        const notification = this.add.text(400, 300, `QUEST ${questId} COMPLETED!`, {
            fontSize: '32px',
            color: '#00ff00'
        });
        notification.setOrigin(0.5);
        notification.setScrollFactor(0);

        this.tweens.add({
            targets: notification,
            alpha: 0,
            y: 250,
            duration: 2000,
            onComplete: () => notification.destroy()
        });
        // end of section 3

        this.updateQuestDisplay();
    }
}