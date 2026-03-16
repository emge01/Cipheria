import Phaser from "phaser";
import { type MapConfig } from "../../config/MapsConfig";

//Handles the fact that some maps may have more or less layers and object layers
export class LayerManager {
    private layers: Map<string, Phaser.Tilemaps.TilemapLayer> = new Map();
    private gameObjectDepth: number = 10;

    createLayers(
        map: Phaser.Tilemaps.Tilemap,
        tilesets: Phaser.Tilemaps.Tileset[],
        mapConfig: MapConfig
    ): {
        background: Phaser.Tilemaps.TilemapLayer | null;
        middlegrounds: Phaser.Tilemaps.TilemapLayer[];
        collision: Phaser.Tilemaps.TilemapLayer | null;
        foreground: Phaser.Tilemaps.TilemapLayer | null;
    } {
        let depth = 0;
        const layers = {
            background: null as Phaser.Tilemaps.TilemapLayer | null,
            middlegrounds: [] as Phaser.Tilemaps.TilemapLayer[],
            collision: null as Phaser.Tilemaps.TilemapLayer | null,
            foreground: null as Phaser.Tilemaps.TilemapLayer | null,
        }

        const layerConfig = mapConfig.layers?.[0];

        if (layerConfig) {
            if (layerConfig.background) {
                layers.background = this.createSingleLayer(map, tilesets, layerConfig.background, depth, 'background');
                depth ++;
            }
            if (layerConfig.middlegrounds) {
                layers.middlegrounds = this.createMultipleLayers(map, tilesets,layerConfig.middlegrounds, depth, 'middlegrounds');
                depth += layers.middlegrounds.length;
            }
            if (layerConfig.foreground) {
                layers.foreground = this.createSingleLayer(map, tilesets, layerConfig.foreground, depth, 'foreground');
                depth ++;
            }
            if (layerConfig.collision) {
                layers.collision = this.createCollisionLayer(map, tilesets, layerConfig.collision, depth);
                depth ++;
            }

            this.gameObjectDepth = depth + 10;
            depth = this.gameObjectDepth + 10;
        }

        return layers;
    }
    
    private createSingleLayer(
        map: Phaser.Tilemaps.Tilemap,
        tilesets: Phaser.Tilemaps.Tileset[],
        layerName: string,
        depth: number,
        groupName: string
    ): Phaser.Tilemaps.TilemapLayer | null {
        const layer = map.createLayer(layerName, tilesets, 0, 0);
        if (layer) {
            layer.setDepth(depth);
            this.layers.set(layerName, layer);
            return layer;
        } else {
            console.warn(`${groupName} layer ${layerName} not found in tilemap`)
            return null;
        }
    }

    private createMultipleLayers(
        map: Phaser.Tilemaps.Tilemap,
        tilesets: Phaser.Tilemaps.Tileset[],
        layerNames: string[],
        startDepth: number,
        groupName: string
    ): Phaser.Tilemaps.TilemapLayer[] {
        const createdLayers: Phaser.Tilemaps.TilemapLayer[] = [];
        let depth = startDepth;

        layerNames.forEach(layerName => {
            const layer = map.createLayer(layerName, tilesets, 0, 0);
            if (layer) {
                layer.setDepth(depth++);
                this.layers.set(layerName, layer);
                createdLayers.push(layer);
            } else {
                console.warn(`${groupName} layer ${layerName} not found in tilemap`);
            }
        });
        return createdLayers;
    }

    private createCollisionLayer(
        map: Phaser.Tilemaps.Tilemap,
        tilesets: Phaser.Tilemaps.Tileset[],
        layerName: string,
        depth: number
    ): Phaser.Tilemaps.TilemapLayer | null {
        const layer = map.createLayer(layerName, tilesets, 0, 0);
        if (layer) {
            layer.setDepth(depth);
            layer.setCollisionByExclusion([-1, 0]);
            layer.setVisible(false);
            this.layers.set(layerName, layer);
            return layer;
        } else {
            console.warn('Collision lauyer not found.')
            return null
        }
        
    }

    getLayer(layerName: string): Phaser.Tilemaps.TilemapLayer | undefined {
        return this.layers.get(layerName);
    }

    getLayerNames(): string[] {
        return Array.from(this.layers.keys());
    }

    getGameObjectDepth(): number {
        return this.gameObjectDepth;
    }

    clearLayers(): void {
        this.layers.forEach(layer => {
            if (layer) layer.destroy();
        });
        this.layers.clear();
    }
}