import { MAPS, type MapConfig } from '../config/MapsConfig';

//handles different maps making sure that adding more maps in future is easier
export class MapManager {
    private currentMapKey: string | null = null;
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    loadMap(mapKey: string, spawnPoint: string = 'default'): void {
        const mapConfig = MAPS[mapKey];
        
        if (!mapConfig) {
            console.error(`Map ${mapKey} not found`);
            return;
        }

        this.currentMapKey = mapKey;

        this.scene.events.emit('change-map', {
            mapConfig,
            spawnPoint
        });
    }

    getCurrentMap(): string | null {
        return this.currentMapKey;
    }

    getCurrentMapLayers(): MapConfig['layers'] | undefined {
        if (!this.currentMapKey) return undefined;
        return MAPS[this.currentMapKey].layers;
    }

    getMapConfig(mapKey: string): MapConfig | undefined {
        return MAPS[mapKey];
    }

    handleDoorInteraction(doorId: string): void {
    
    if (!this.currentMapKey) {
        console.error('No current map set!');
        return;
    }

    const currentMap = MAPS[this.currentMapKey];
    
    const door = currentMap.connectedMaps?.find(d => String(d.doorId) === String(doorId));

    if (door) {
        this.loadMap(door.targetMap);
    } else {
        console.error('Door not found in current map config');
    }
}
}