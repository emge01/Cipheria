import { type QuestData, QUESTS } from '../config/QuestsConfig';

//handles different quest making sure that adding more quests in future is easier
export class QuestManager {
    private activeQuests: Map<string, QuestData> = new Map();
    private completedQuests: Set<string> = new Set();
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    startQuest(questId: string): boolean {
        const questData = QUESTS[questId];
        
        if (!questData) {
            console.error(`Quest ${questId} not found`);
            return false;
        }

        if (questData.prerequisiteQuests) {
            for (const prereqId of questData.prerequisiteQuests) {
                if (!this.completedQuests.has(prereqId)) {
                    console.log(`Cannot start quest. Complete ${prereqId} first.`);
                    return false;
                }
            }
        }

        //section 7: Prompt= How can i prevent mutations to my questData, when trying to track completion progress
        const quest = JSON.parse(JSON.stringify(questData));
        //end of section 7

        this.activeQuests.set(questId, quest);
        
        console.log(`Started quest: ${quest.name}`);
        this.emitQuestUpdate(questId);
        return true;
    }

    updateObjective(questId: string, objectiveId: string, progress?: number): void {
        const quest = this.activeQuests.get(questId);
        if (!quest) return;

        const objective = quest.objectives.find(obj => obj.id === objectiveId);
        if (!objective || objective.completed) return;

        if (objective.type === 'fix' || objective.type === 'kill') {
            if (objective.count && progress) {
                if (progress >= objective.count) {
                    objective.completed = true;
                }
            }
        } else {
            objective.completed = true;
        }

        if (this.isQuestComplete(questId)) {
            this.completeQuest(questId);
        }

        this.emitQuestUpdate(questId);
    }

    private isQuestComplete(questId: string): boolean {
        const quest = this.activeQuests.get(questId);
        if (!quest) return false;

        return quest.objectives.every(obj => obj.completed);
    }

    completeQuest(questId: string): void {
        const quest = this.activeQuests.get(questId);
        if (!quest) return;

        this.activeQuests.delete(questId);
        this.completedQuests.add(questId);

        console.log(`Quest completed: ${quest.name}`);

        this.emitQuestComplete(questId);
    }

    getActiveQuests(): QuestData[] {
        return Array.from(this.activeQuests.values());
    }

    isQuestActive(questId: string): boolean {
        return this.activeQuests.has(questId);
    }

    isQuestCompleted(questId: string): boolean {
        return this.completedQuests.has(questId);
    }

    private emitQuestUpdate(questId: string): void {
        this.scene.events.emit('quest-updated', questId);
        this.scene.game.events.emit('quest-updated', questId);
    }

    private emitQuestComplete(questId: string): void {
        this.scene.events.emit('quest-completed', questId);
        this.scene.game.events.emit('quest-completed', questId);
    }

    incrementCount(): void {
        for (const [questId, quest] of this.activeQuests.entries()) {
            quest.objectives.forEach(q => {
                if ((q.type === 'kill' || q.type === 'fix' ) && !q.completed) {
                    q.currentCount = (q.currentCount ?? 0) + 1;
                }

                if (q.count && q.currentCount && q.currentCount >= q.count) {
                    q.completed = true;
                }
                console.log(q.currentCount)
            })
            if (this.isQuestComplete(questId)) {
                this.completeQuest(questId);
            }

            this.emitQuestUpdate(questId);
            
        }
    }

    handleQuestCompleteDialogue(questId: string): void {
        const dialogueId = `${questId}-wrapup`
        const dialogueManager = (this.scene as any).getDialogueManager();

        dialogueManager.startDialogue(dialogueId);
    }

    save(): any {
        return {
            active: Array.from(this.activeQuests.entries()),
            completed: Array.from(this.completedQuests)
        };
    }

    load(data: any): void {
        this.activeQuests = new Map(data.active);
        this.completedQuests = new Set(data.completed);
    }
}