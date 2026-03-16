import type { QuestManager } from "../quests/QuestManager";
import { Dialogue } from "./Dialogue";
import { DIALOGUE } from "./DialogueConfig";

//handles different dialogues making sure that adding more dialogues in future is easier
export class DialogueManager {
    private scene: Phaser.Scene;
    private dialogue?: Dialogue;
    private questManager?: QuestManager;
    
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.questManager = (scene as any).questManager;
    }

    startDialogue(id: string): void {
        const dialogueData = DIALOGUE[id];

        if (!dialogueData) {
            console.log('Dialogue does not exist')
        }

        this.dialogue?.destroy();

        this.dialogue = new Dialogue(this.scene, dialogueData);
        this.dialogue.start(() => {
            this.onCompleteDialogue(dialogueData);
        });
        
    }

    private onCompleteDialogue(dialogueData: any): void {
        if (dialogueData.connectedDialogue) {
            this.startDialogue(dialogueData.connectedDialogue)
        }
        if (dialogueData.questToActivate) {
            this.questManager?.startQuest(dialogueData.questToActivate);
        }
        if (dialogueData.type === 'interaction') {
            this.dialogue?.destroy();
        }
        if (dialogueData.objectiveToComplete) {
            this.questManager?.updateObjective(dialogueData.questIdForObjective, dialogueData.objectiveToComplete)
        }
        this.scene.events.emit('dialogue-complete', dialogueData.id)
    }

    destroy(): void {
        this.dialogue?.destroy();
    }

}