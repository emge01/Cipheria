import Phaser from "phaser";
import { type MapConfig } from "../../config/MapsConfig";
import { MapManager } from "../../maps/MapManager";
import { Enemy } from "../../characters/Enemy";
import { BadGuy } from "../../characters/BadGuy";
import { Citizen } from "../../characters/Citizen";


//handles the different types of object layers
export class ObjectLayerHandler {
    private scene: Phaser.Scene;
    private mapManager: MapManager;

    constructor(scene: Phaser.Scene, mapManager: MapManager) {
        this.scene = scene;
        this.mapManager = mapManager;
    }

    processObjectLayers(map: Phaser.Tilemaps.Tilemap, mapConfig: MapConfig): void {
        const objects = mapConfig.layers?.[0]?.objects;
        if (!objects) return;

        objects.forEach(layerName => {
            const objectLayer = map.getObjectLayer(layerName);
            if (!objectLayer) {
                console.warn(`Object layer ${layerName} not found`);
                return;
            }
            objectLayer.objects.forEach(object => {
                this.processObject(object, layerName, map);
            });
        });
    }

    private processObject(object: Phaser.Types.Tilemaps.TiledObject, layerName: string, map: Phaser.Tilemaps.Tilemap): void {
        if (layerName == 'Doors') {
            this.createDoorTrigger(object);
        } else if ( layerName === 'Damage') {
            this.createDamageZone(object, map);
        } else if (layerName === 'Crystals') {
            this.createCrystal(object);
        } else if (layerName === 'EnemyTrigger') {
            this.createEnemyTrigger(object);
        } else if (layerName === 'Dialogue') {
            this.createDialogueTrigger(object);
        } else if (layerName === 'NPCZone') {
            this.createNPCZone(object);
        } else if (layerName === 'BuildZone') {
            this.createBuildZone(object);
        } else if (layerName === 'Portal') {
            this.createPortalZone(object);
        }
       
    }

    private createDoorTrigger(door: Phaser.Types.Tilemaps.TiledObject): void {
        if (!this.checkIfUndefined(door)) {
            return;
        }
        const doorZone = this.scene.add.zone(door.x, door.y, door.width, door.height);
        this.scene.physics.world.enable(doorZone);
        (doorZone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        const player = (this.scene as any).getPlayer();
        if (!player) return;

        const doorIdProperties = door.properties?.find((p: any) => p.name === 'id');
        const doorId = doorIdProperties?.value;

        const doorTypes = door.properties?.find((p: any) => p.name === 'door_type');
        let doorType = doorTypes?.value;
        const lockIcon = doorType === 'LOCKED'? this.scene.add.text(
            door.x + door.width / 2,
            door.y - 30,
            '🔒',
            { fontSize: '32px' }
        ).setOrigin(0.5).setDepth(100): null;
        
        this.scene.game.events.on('quest-completed', () => {
            doorType = 'UNLOCKED';
            lockIcon?.destroy();
    });

        this.scene.physics.add.overlap(player, doorZone, () => {
            if (doorType !== 'LOCKED') {
                this.mapManager.handleDoorInteraction(String(doorId));
            }
        })
    }

    private createDamageZone(damage: Phaser.Types.Tilemaps.TiledObject, map: Phaser.Tilemaps.Tilemap): void {
        if (!this.checkIfUndefined(damage)) {
            return;
        }

        const zone = this.scene.add.zone(
            damage.x,
            damage.y,
            damage.width,
            damage.height
        ).setOrigin(0,0).setInteractive();

        const indicator = this.scene.add.graphics();
        indicator.lineStyle(2, 0xff0000, 0.5);
        indicator.strokeRect(damage.x, damage.y, damage.width, damage.height);
        indicator.setDepth(15);

        let repaired = false;

        const invasionTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(10000, 30000),
            callback: () => {
                if (!repaired) {
                    this.startInvasion(damage);
                }
            }
        })

        zone.on('pointerdown', () => {
            repaired = true
            invasionTimer.remove(false)
            this.repairDamage(damage, map, zone, indicator);
        })
    }

    private startInvasion(damage: Phaser.Types.Tilemaps.TiledObject): void {
        const enemyManager = (this.scene as any).getEnemyManager();
        if (!enemyManager) return;

        
        const x = damage.x! + Phaser.Math.Between(0, damage.width!);
        const y = damage.y! + Phaser.Math.Between(0, damage.height!);

        enemyManager.spawnSlime(x, y);
    }

    private repairDamage(damage: Phaser.Types.Tilemaps.TiledObject, map: Phaser.Tilemaps.Tilemap, zone: Phaser.GameObjects.Zone, indicator: Phaser.GameObjects.Graphics): void {
        if (!this.checkIfUndefined(damage)) {
            return;
        }
        const mapLoader = (this.scene as any).getMapLoader();
        const damagedLayer = mapLoader?.getLayer('damaged-middleground');

        const tileX = map.worldToTileX(damage.x);
        const tileY = map.worldToTileY(damage.y);
        const tileWidth = Math.ceil(damage.width / map.tileWidth);
        const tileHeight = Math.ceil(damage.height / map.tileHeight);

        if (tileX !== null && tileY !== null) {
            for (let x = tileX; x < tileX+tileWidth; x++) {
                for (let y = tileY; y < tileY+tileHeight; y++) {
                    damagedLayer.removeTileAt(x, y);
                }
            }
        }

        zone.destroy();
        indicator.destroy();

        this.scene.game.events.emit('damage-repaired', zone);
    }

    private createCrystal(object: Phaser.Types.Tilemaps.TiledObject): void {
        if (!this.checkIfUndefined(object)) return;

        const x = object.x + object.width / 2;
        const y = object.y - object.height / 2;

        const crystalType = object.properties?.find((p: any) => p.name === 'type')?.value;
        if (!crystalType) {
            console.warn('Crystal object type not found');
            return;
        }

        const questManager = (this.scene as any).getQuestManager();
        const isQuest4Active = questManager?.isQuestActive('quest-4');
        const isQuest9Active = questManager?.isQuestActive('quest-9');
        
        if (isQuest9Active) {
            const crystal = this.scene.add.image(x, y, crystalType).setDepth(100);
            this.scene.physics.add.existing(crystal, true);
            const player = (this.scene as any).getPlayer();
            if (!player) return;
            this.scene.physics.add.overlap(player, crystal, () => {
                const controller = (this.scene as any).getQuestController();
                controller?.onCrystalInteract();
            });
            return;
        }

        if (isQuest4Active) {
            if (crystalType === 'integrity-crystal') {
                let crystal = this.scene.add.image(x, y, 'corrupted-crystal').setDepth(100).setInteractive({ useHandCursor: true });

                crystal.on('pointerdown', () => {
                    const quest4Controller = (this.scene as any).getQuestController();
                    quest4Controller?.onCrystalClicked();
                });

                this.scene.events.on('crystal-restored', () => {
                    crystal.destroy();
                    crystal = this.scene.add.image(x, y, crystalType);
                });

                return;
            }
        } else {
            this.scene.add.image(x, y, crystalType).setDepth(100).setInteractive({ useHandCursor: true });
        }
    }

    private createEnemyTrigger(object: Phaser.Types.Tilemaps.TiledObject): void {
        if (!this.checkIfUndefined(object)) {
            console.log("no enemies");
            return;
        }
    
        const triggerZone = this.scene.add.zone(object.x, object.y, object.width, object.height);
        this.scene.physics.world.enable(triggerZone);

        const player = (this.scene as any).getPlayer();
        if (!player) return;

        let triggered = false;

        const enemyType = object.properties?.find((p: any) => p.name === 'enemyType')?.value;
        const enemyCount = object.properties?.find((p: any) => p.name === 'enemyCount')?.value;
        const enemyDelay = object.properties?.find((p: any) => p.name === 'spawnDelay')?.value;

        if (!enemyType || enemyCount == null || enemyDelay == null) {
            console.warn("Missing enemy properties");
            return;
        }

        this.scene.physics.add.overlap(player, triggerZone, () => {
            if (triggered) return;
            triggered = true;

            const enemyManager = (this.scene as any).getEnemyManager();

            if (enemyManager) {
                Enemy.spawn(this.scene, object, enemyType, enemyCount, enemyDelay, enemyManager);
            } else {
                console.log('enemy manager not found');
            }

            triggerZone.destroy();
        });
    }

    private createDialogueTrigger(object: Phaser.Types.Tilemaps.TiledObject): void {
        if (!this.checkIfUndefined(object)) {
            return;
        }

        const triggerZone = this.scene.add.zone(object.x, object.y, object.width, object.height);
        this.scene.physics.world.enable(triggerZone);

        const player = (this.scene as any).getPlayer();
        if (!player) return;

        let triggered = false;

        this.scene.physics.add.overlap(player, triggerZone, () => {
            if (!triggered) {
                triggered = true;

                const dialogueManager = (this.scene as any).getDialogueManager();
                const dialogueId = object.properties?.find((p: { name: string; }) => p.name === 'id')?.value;
                dialogueManager.startDialogue(dialogueId);
            }
        })
    }

    private createNPCZone(object: Phaser.Types.Tilemaps.TiledObject) {
        if (!this.checkIfUndefined(object)) return;
        
        const x = object.x;
        const y = object.y;
        const width = object.width;
        const height = object.height;

        const characters = ['archer', 'enchantress', 'knight', 'musketeer', 'swordsman', 'wizard'];
        const player = (this.scene as any).getPlayer();

        const spawnX = Phaser.Math.Between(x, x + width);
        const spawnY = Phaser.Math.Between(y, y + height);
        const character = Phaser.Utils.Array.GetRandom(characters);
        const isBadGuy = Phaser.Math.Between(0, 1) === 1;

        const npc = isBadGuy
            ? new BadGuy(this.scene, spawnX, spawnY, character)
            : new Citizen(this.scene, spawnX, spawnY, character);

        let triggered = false;
        this.scene.physics.add.overlap(player, npc, () => {
            if (triggered) return;
            triggered = true;
            const controller = (this.scene as any).getQuestController()
            controller?.onPlayerNPCCollision(npc);
            controller?.registerNPC(npc);
            })
    }

    private createBuildZone(object: Phaser.Types.Tilemaps.TiledObject): void {
        if (!this.checkIfUndefined(object)) return;

        const x = object.x + object.width / 2;
        const y = object.y - object.height / 2;
        const zoneId = object.properties?.find((p: any) => p.name === 'buildStage')?.value;

        if (!zoneId) {
            console.warn('BuildZone missing buildStage property');
            return;
        }

        const chest = this.scene.add.image(x, y, 'chest').setScale(0.25).setDepth(100);
        this.scene.physics.add.existing(chest, true); // true = static body

        const player = (this.scene as any).getPlayer();
        if (!player) return;

        let triggered = false;
        this.scene.physics.add.overlap(player, chest, () => {
            if (triggered) return;
            triggered = true;
            const controller = (this.scene as any).getQuestController();
            controller?.onBuildZoneInteract(zoneId);
        });
    }

    private createPortalZone(object: Phaser.Types.Tilemaps.TiledObject): void {
        if (!this.checkIfUndefined(object)) return;

        const zone = this.scene.add.zone(object.x, object.y, object.width, object.height);
        this.scene.physics.world.enable(zone);
        const player = (this.scene as any).getPlayer();
        if (!player) return;
        this.scene.physics.add.overlap(player, zone, () => {
            const controller = (this.scene as any).getQuestController();
            controller?.onPortalEntered();
        });
    }


    private checkIfUndefined(object: Phaser.Types.Tilemaps.TiledObject): object is Phaser.Types.Tilemaps.TiledObject & {x: number, y: number, width: number, height:number} {
        return object.x !== undefined && object.y !== undefined && object.width !== undefined && object.height !== undefined;
    }

}