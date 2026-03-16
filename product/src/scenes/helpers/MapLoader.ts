import Phaser from "phaser";
import { Player } from "../../characters/Player";
import { type MapConfig } from "../../config/MapsConfig";
import { LayerManager } from "./LayerManager";
import { EnemyManager } from "../../characters/EnemyManager";

//handles loading and clearing maps
export class MapLoader {
    private scene: Phaser.Scene;
    private currentMap!: Phaser.Tilemaps.Tilemap;
    private layerManager: LayerManager;
    private collider: Phaser.Physics.Arcade.Collider | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.layerManager = new LayerManager();
    }

    changeMap(mapConfig: MapConfig, spawnPoint: string): void {
        //loading multiple maps error claude.ai
        this.scene.time.delayedCall(0, () => {
            this.clearCurrentMap();
            this.loadMap(mapConfig, spawnPoint);
        });
    }

    private clearCurrentMap(): void {
        if (this.collider) {
            this.collider.destroy();
            this.collider = null;
        }

        this.layerManager.clearLayers();
        if (this.currentMap) {
            this.currentMap.destroy();
        }

        const gameScene = this.scene as any;
        if (gameScene.getPlayer && gameScene.getPlayer()) {
            gameScene.getPlayer().destroy();
        }
        
        if (gameScene.getEnemyManager && gameScene.getEnemyManager()) {
            gameScene.getEnemyManager().destroy();
        }
    }

    private loadMap(mapConfig: MapConfig, spawnPoint: string): void {
        this.currentMap = this.scene.make.tilemap({key: mapConfig.key});

        const tilesets = mapConfig.tilesets.map(tileset => this.currentMap.addTilesetImage(tileset.name, tileset.imageKey)).filter(tileset => tileset !== null);

        const layers = this.layerManager.createLayers(this.currentMap, tilesets, mapConfig);

        const spawn = mapConfig.spawnPoints[spawnPoint] || mapConfig.spawnPoints.default;
        const player = new Player(this.scene, spawn.x, spawn.y);
        player.setDepth(this.layerManager.getGameObjectDepth());


        const gameScene = this.scene as any;
        if (gameScene.setPlayer) {
            gameScene.setPlayer(player);
        }

        let enemyManager: EnemyManager | undefined;
        
        if (layers.collision){
            enemyManager = new EnemyManager(this.scene, player, layers.collision);
        }
        if (gameScene.setEnemyManager) {
                gameScene.setEnemyManager(enemyManager);
            } else {
                console.error('setEnemyManager method does not exist on scene!');
            }

        this.setUpCollisions(player, layers.collision);

        this.setUpCamera(player);
        const layerConfig = mapConfig.layers?.[0];
        if (layerConfig?.objects) {
            const objectHandler = (this.scene as any).getObjectHandler();
            if (objectHandler) {
                objectHandler.processObjectLayers(this.currentMap, mapConfig);
            }
        }
        this.scene.events.emit('map-loaded', mapConfig.key);
    }

    private setUpCollisions(player: Player, collisionLayer: Phaser.Tilemaps.TilemapLayer | null) {
        if (collisionLayer) {
            this.collider = this.scene.physics.add.collider(player, collisionLayer);
        }
    }

    private setUpCamera(player: Player): void {
        const camera = this.scene.cameras.main;
        const width = this.currentMap.widthInPixels;
        const height = this.currentMap.heightInPixels;

        camera.stopFollow();
        camera.setScroll(0, 0);

        this.scene.physics.world.setBounds(0, 0, width, height);
        camera.setBounds(0, 0, width, height);

        camera.startFollow(player, true, 0.08, 0.08);

        player.setCollideWorldBounds(true);
    }

    getCurrentMap(): Phaser.Tilemaps.Tilemap {
        return this.currentMap;
    }

    getLayer(layerName: string): Phaser.Tilemaps.TilemapLayer | undefined {
        return this.layerManager.getLayer(layerName);
    }
}