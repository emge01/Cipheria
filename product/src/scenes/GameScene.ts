import Phaser from 'phaser';
import { QUESTS } from '../config/QuestsConfig';
import { Player } from '../characters/Player';
import { QuestManager } from '../quests/QuestManager';
import { MapManager } from '../maps/MapManager';
import { MAPS } from '../config/MapsConfig';
import { AnimationManager } from '../characters/AnimationManager';
import { PlayerConfig } from '../config/PlayerConfig';
import { MapLoader } from './helpers/MapLoader';
import { ObjectLayerHandler } from './helpers/ObjectLayerHandler';
import { EnemyManager } from '../characters/EnemyManager';
import { DialogueManager } from '../dialogue/DialogueManager';
import { EnemyConfig } from '../config/EnemyConfig';
import { Quest3Controller } from '../quest-controllers/Quest3Controller';
import { NPCConfig } from '../config/NPCConfig';
import { Quest5Controller } from '../quest-controllers/Quest5Controller';
import { Quest4Controller } from '../quest-controllers/Quest4Controller';
import { Quest6Controller } from '../quest-controllers/Quest6Controller';
import type { QuestController } from '../quest-controllers/QuestController';
import { Quest7Controller } from '../quest-controllers/Quest7Controller';
import { Quest8Controller } from '../quest-controllers/Quest8Controller';
import { Quest9Controller } from '../quest-controllers/Quest9Controller';


export class GameScene extends Phaser.Scene {
    private player!: Player;
    private questManager!: QuestManager;
    private mapManager!: MapManager;
    private mapLoader!: MapLoader;
    private objectHandler!: ObjectLayerHandler;
    private enemyManager!: EnemyManager;
    private dialogueManager!: DialogueManager;
    private questController?: QuestController;

    constructor() {
        super('GameScene');
    }

    preload(): void {

        Object.values(MAPS).forEach(mapConfig => {
            this.load.tilemapTiledJSON(mapConfig.key, mapConfig.jsonPath);
            
            mapConfig.tilesets.forEach(tileset => {
                this.load.image(tileset.imageKey, tileset.imagePath);
            });
        });

        this.load.spritesheet('player-walk', 'assets/Player-spritesheets/Swordsman_lvl3_Walk_without_shadow.png', {
             frameWidth: PlayerConfig.FRAME_WIDTH,
             frameHeight: PlayerConfig.FRAME_HEIGHT
        });
         this.load.spritesheet('player-idle', 'assets/Player-spritesheets/Swordsman_lvl3_Idle_without_shadow.png', {
             frameWidth: PlayerConfig.FRAME_WIDTH,
             frameHeight: PlayerConfig.FRAME_HEIGHT
        });
        this.load.spritesheet('player-attack', 'assets/Player-spritesheets/Swordsman_lvl3_attack_without_shadow.png', {
            frameWidth: PlayerConfig.FRAME_WIDTH,
            frameHeight: PlayerConfig.FRAME_HEIGHT
        });

        this.load.spritesheet('slime','assets/Enemy-spritesheets/slime-Sheet.png', {
            frameWidth: 32,
            frameHeight: 25
        })

        //NPC sprites
        this.load.spritesheet('archer-idle', 'assets/NPC/Archer/Idle_2.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('archer-walk', 'assets/NPC/Archer/Walk.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('archer-attack', 'assets/NPC/Archer/Attack_1.png', {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet('enchantress-idle', 'assets/NPC/Enchantress/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('enchantress-walk', 'assets/NPC/Enchantress/Walk.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('enchantress-attack', 'assets/NPC/Enchantress/Attack_4.png', {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet('knight-idle', 'assets/NPC/Knight/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('knight-walk', 'assets/NPC/Knight/Walk.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('knight-attack', 'assets/NPC/Knight/Attack_1.png', {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet('musketeer-idle', 'assets/NPC/Musketeer/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('musketeer-walk', 'assets/NPC/Musketeer/Walk.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('musketeer-attack', 'assets/NPC/Musketeer/Attack_3.png', {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet('swordsman-idle', 'assets/NPC/Swordsman/Idle_2.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('swordsman-walk', 'assets/NPC/Swordsman/Walk.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('swordsman-attack', 'assets/NPC/Swordsman/Attack_3.png', {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet('wizard-idle', 'assets/NPC/Wizard/Idle_2.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('wizard-walk', 'assets/NPC/Wizard/Walk.png', {frameWidth: 128, frameHeight: 128})
        this.load.spritesheet('wizard-attack', 'assets/NPC/Wizard/Attack_3.png', {frameWidth: 128, frameHeight: 128})

        this.load.image('drone-south', 'assets/Enemy-spritesheets/drone-south.png');
        this.load.image('Elder', 'assets/Elder.png');

        //cia crystals
        this.load.image('confidentiality-crystal', 'assets/crystals/crystal_violet2.png');
        this.load.image('integrity-crystal', 'assets/crystals/crystal_green3.png');
        this.load.image('corrupted-crystal', 'assets/crystals/crystal_black4.png');
        this.load.image('availability-crystal', 'assets/crystals/crystal_orange4.png');

        //chest
        this.load.image('chest', 'assets/chest.png')
    }
    create(data: {questId?: string}): void {

        this.questManager = new QuestManager(this);
        this.mapManager = new MapManager(this);
        this.mapLoader = new MapLoader(this);
        this.objectHandler = new ObjectLayerHandler(this, this.mapManager);
        this.dialogueManager = new DialogueManager(this);
        
        AnimationManager.createFromConfig(this, PlayerConfig.ANIMATIONS);
        AnimationManager.createFromConfig(this, {SLIME: EnemyConfig.ANIMATIONS.SLIME});
        AnimationManager.createFromConfig(this, NPCConfig.ANIMATIONS.ARCHER);
        AnimationManager.createFromConfig(this, NPCConfig.ANIMATIONS.ENCHANTRESS);
        AnimationManager.createFromConfig(this, NPCConfig.ANIMATIONS.KNIGHT);
        AnimationManager.createFromConfig(this, NPCConfig.ANIMATIONS.MUSKETEER);
        AnimationManager.createFromConfig(this, NPCConfig.ANIMATIONS.SWORDSMAN);
        AnimationManager.createFromConfig(this, NPCConfig.ANIMATIONS.WIZARD);

        this.events.on('change-map', (data: any) => {
            this.changeMap(data);
        }, this);

        const questId = data?.questId ?? 'quest-1';

        const quest = QUESTS[questId];
        if (!quest) {
            console.error(`Quest ${questId} not found`);
            return;
        }

        this.questManager.startQuest(questId);

        this.events.once('map-loaded', () => {
            switch (questId) {
                case 'quest-3':
                    this.questController = new Quest3Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                case 'quest-4':
                    this.questController = new Quest4Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                case 'quest-5':
                    this.questController = new Quest5Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                case 'quest-6':
                    this.questController = new Quest6Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                case 'quest-7':
                    this.questController = new Quest7Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                case 'quest-8':
                    this.questController = new Quest8Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                case 'quest-9':
                    this.questController = new Quest9Controller(this, this.player, this.enemyManager, this.dialogueManager, this.questManager);
                    break;
                default:
                    this.dialogueManager.startDialogue(`${questId}-intro`);
            }
        });
        this.mapManager.loadMap(quest.maps[0], 'default');

        this.physics.world.createDebugGraphic();

        this.scene.launch('UIScene', { questManager: this.questManager });

        this.game.events.on('enemy-killed', () => {
            this.getQuestManager().incrementCount();
        });

        this.game.events.on('damage-repaired', () => {
            this.getQuestManager().incrementCount();
        });

        this.game.events.on('quest-completed', (questId: string) => {
            this.getQuestManager().handleQuestCompleteDialogue(questId);
        });
    }

    private changeMap(data: { mapConfig: any; spawnPoint: string }): void {
        this.mapLoader.changeMap(data.mapConfig, data.spawnPoint);
    }

    getPlayer(): Player {
        return this.player;
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    getEnemyManager(): EnemyManager {
        return this.enemyManager;
    }

    setEnemyManager(enemyManager: EnemyManager): void {
        this.enemyManager = enemyManager;
    }

    getMapLoader(): MapLoader {
        return this.mapLoader;
    }

    getObjectHandler(): ObjectLayerHandler {
        return this.objectHandler;
    }

    getDialogueManager(): DialogueManager {
        return this.dialogueManager;
    }

    getQuestManager(): QuestManager {
        return this.questManager;
    }

    getQuestController(): QuestController | undefined {
        return this.questController;
    }
      
    update(): void {
        if (this.player) {
            this.player.update();
        }

        if (this.enemyManager) {
            this.enemyManager.update();
        }
    }
}