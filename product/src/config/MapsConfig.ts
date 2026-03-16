export interface DoorConfig {
    doorId: number;
    targetMap: string;
    isLocked?: boolean;
    requiredQuestToUnlock?: string;
}

export interface MapConfig {
    key: string;
    jsonPath: string;
    tilesets: {
        name: string;
        imageKey: string;
        imagePath: string;
    }[];
    layers?: {
        background: string,
        middlegrounds?: string[],
        foreground: string,
        collision: string,
        objects?: string[]
    }[];
    spawnPoints: {
        [key: string]: { x: number; y: number };
    };
    connectedMaps?: DoorConfig[];
    questIds?: string[];
}

export const MAPS: Record<string, MapConfig> = {
    //Cipheria town and alleys configuration

    'cipheria-town': {
        key: 'cipheria-town',
        jsonPath: 'assets/Maps/cipheria-town.json',
        tilesets: [
            {
                name: 'bg-1',
                imageKey: 'bg-1',
                imagePath: 'assets/Tilesets/bg-1.png'
            },
            {
                name: 'bg-2',
                imageKey: 'bg-2',
                imagePath: 'assets/Tilesets/bg-2.png'
            },
            {
                name: 'bg-3',
                imageKey: 'bg-3',
                imagePath: 'assets/Tilesets/bg-3.png'
            },
            {
                name: 'tileset',
                imageKey: 'tileset',
                imagePath: 'assets/Tilesets/tileset.png'
            },
            {
                name: 'neo_zero_tiles_and_buildings_01',
                imageKey: 'neo_zero_tiles_and_buildings_01',
                imagePath: 'assets/Tilesets/neo_zero_tiles_and_buildings_01.png'
            }
        ],
        layers: [{
            background: 'background',
            middlegrounds: ['foreground', 'foreground-1'],
            foreground: 'foreground-2',
            collision: 'collisions',
            objects: ['NPCZone']
        }],
        spawnPoints: {
            default: {x: 1500, y: 450}
        },
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'tower-entrance'
            },
            {
                doorId: 2,
                targetMap: 'dark-alley'
            },
            {
                doorId: 3,
                targetMap: 'dark-alley'
            },
            {
                doorId: 4,
                targetMap: 'fortress-entrance'
            }
        ],
        questIds: ['']
    },

    //Fortress maps configuration
    'fortress-entrance': {
        key: 'fortress-entrance',
        jsonPath: 'assets/Maps/fortress-entrance.json',
        tilesets: [
            {
                name: 'FaerieForest_PetricakeGamesPNG',
                imageKey: 'faerie-forest',
                imagePath: 'assets/Tilesets/FaerieForest_PetricakeGamesPNG.png'
            }
        ],
        spawnPoints: {
            default: {x: 700, y: 400}
        },
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors', 'Guard', 'Portal']
        }],
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'cipheria-town'
            },
            {
                doorId: 2,
                targetMap: 'fortress-outer-walls'
            },
            {
                doorId: 3,
                targetMap: 'null-domain'
            }
        ],
        questIds: ['5']
    },
    'fortress-outer-walls': {
        key: 'fortress-outer-walls',
        jsonPath: 'assets/Maps/fortress-outer-walls.json',
        tilesets: [
            {
                name: 'LollipopLabyrinth_basics_PetricakeGames',
                imageKey: 'LollipopLabyrinth_basics_PetricakeGames',
                imagePath: 'assets/Tilesets/LollipopLabyrinth_basics_PetricakeGames (1).png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors', 'Guard']
        }],
        spawnPoints: {
            default: {x: 400, y: 700}
        },
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'fortress-entrance'
            },
            {
                doorId: 2,
                targetMap: 'fortress-outer-walls-1'
            },
        ],
        questIds: ['5']
    },
    'fortress-outer-walls-1': {
        key: 'fortress-outer-walls',
        jsonPath: 'assets/Maps/fortress-outer-walls.json',
        tilesets: [
            {
                name: 'LollipopLabyrinth_basics_PetricakeGames',
                imageKey: 'LollipopLabyrinth_basics_PetricakeGames',
                imagePath: 'assets/Tilesets/LollipopLabyrinth_basics_PetricakeGames (1).png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors', 'Guard']
        }],
        spawnPoints: {
            default: {x: 400, y: 700}
        },
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'fortress-entrance'
            },
            {
                doorId: 2,
                targetMap: 'throne-room'
            },
        ],
        questIds: ['5']
    },
    'throne-room': {
        key: 'throne-room',
        jsonPath: 'assets/Maps/throne-room.json',
        tilesets: [
            {
                name: 'TangerineTavern_basics_PetricakeGames',
                imageKey: 'TangerineTavern_basics_PetricakeGames',
                imagePath: 'assets/Tilesets/TangerineTavern_basics_PetricakeGames.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors']
        }],
        spawnPoints: {
            default: {x: 800, y: 700}
        },
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'fortress-outer-walls'
            },
        ],
        questIds: ['']
    },
    
    //Tower map and Motherboard map configuration
    'tower-entrance': {
        key: 'tower-entrance',
        jsonPath: 'assets/Maps/quest-1/entrance.json',
        tilesets: [
            {
                name: 'FaerieForest_PetricakeGamesPNG',
                imageKey: 'faerie-forest',
                imagePath: 'assets/Tilesets/FaerieForest_PetricakeGamesPNG.png'
            },
            {
                name: 'HiddenJungle_PNG',
                imageKey: 'hidden-jungle',
                imagePath: 'assets/Tilesets/HiddenJungle_PNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors']
        }],
        spawnPoints: {
            default: {x: 400, y: 400}
        },
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'cipheria-town',
                isLocked: true,
                requiredQuestToUnlock: 'quest-2'
            },
            {
                doorId: 2,
                targetMap: 'tower-first-floor',
                isLocked: false
            }
        ],
        questIds: ['quest-1']
    },
    'tower-first-floor': {
        key: 'tower-first-floor',
        jsonPath: 'assets/Maps/quest-1/first_floor.json',
        tilesets: [
            {
                name: 'HiddenJungle_PNG',
                imageKey: 'hidden-jungle',
                imagePath: 'assets/Tilesets/HiddenJungle_PNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors', 'EnemyTrigger']
        }],
        spawnPoints: {default: {x: 72, y: 1305}},
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'tower-entrance',
                isLocked: false
            },
            {
                doorId: 2,
                targetMap: 'motherboard',
                isLocked: true,
                requiredQuestToUnlock: 'quest-1'
            }
        ],
        questIds: ['quest-1']
    },
    'tower-first-floor-quest-7': {
        key: 'tower-first-floor-quest-7',
        jsonPath: 'assets/Maps/first-floor-quest-7.json',
        tilesets: [
            {
                name: 'HiddenJungle_PNG',
                imageKey: 'hidden-jungle',
                imagePath: 'assets/Tilesets/HiddenJungle_PNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Doors', 'BuildZone']
        }],
        spawnPoints: {default: {x: 72, y: 1305}},
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'tower-entrance',
                isLocked: false
            },
            {
                doorId: 2,
                targetMap: 'motherboard',
                isLocked: true,
                requiredQuestToUnlock: 'quest-1'
            }
        ],
        questIds: ['quest-7']
    },           
    'motherboard': {
        key: 'motherboard',
        jsonPath: 'assets/Maps/quest-2/motherboard.json',
        tilesets: [
            {
                name: 'CosmicLegacy_PetricakeGamesPNG',
                imageKey: 'cosmic-legacy',
                imagePath: 'assets/Tilesets/CosmicLegacy_PetricakeGamesPNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            middlegrounds: ['damaged-middleground'],
            collision: 'collisions',
            objects: ['Doors', 'Crystals', 'Damage', 'Dialogue']
        }],
        spawnPoints: {default: {x: 100, y: 1100}},
        connectedMaps: [
            {
                doorId: 1,
                targetMap: 'tower-entrance',
                isLocked: true,
                requiredQuestToUnlock: 'quest-2'
            }
        ],
        questIds: ['quest-2']
    },

    'null-domain': {
        key: 'null-domain',
        jsonPath: 'assets/Maps/quest-3/null-domain.json',
        tilesets: [
            {
                name: 'RetroSpaceHell_PNG',
                imageKey: 'retro-space-hell',
                imagePath: 'assets/Tilesets/RetroSpaceHell_PNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions'
        }],
        spawnPoints: {default: {x: 402, y: 372}}
    },

    'motherboard-fixed': {
        key: 'motherboard-fixed',
        jsonPath: 'assets/Maps/motherboard-fixed.json',
        tilesets: [
            {
                name: 'CosmicLegacy_PetricakeGamesPNG',
                imageKey: 'cosmic-legacy',
                imagePath: 'assets/Tilesets/CosmicLegacy_PetricakeGamesPNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['Crystals']
        }],
        spawnPoints: {default: {x: 1280, y: 200}}
    },
    'mac-kingdom': {
        key: 'mac',
        jsonPath: 'assets/Maps/mac.json',
        tilesets: [
            {
                name: 'HiddenJungle_PNG',
                imageKey: 'hidden-jungle',
                imagePath: 'assets/Tilesets/HiddenJungle_PNG.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['NPCZone']
        }],
        spawnPoints: {default: {x: 400, y: 600}}
    },
    'linux-kingdom': {
        key: 'linux',
        jsonPath: 'assets/Maps/linux.json',
        tilesets: [
            {
                name: 'CosmicLilac_Tiles',
                imageKey: 'cosmic-lilac',
                imagePath: 'assets/Tilesets/CosmicLilac_Tiles.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['NPCZone']
        }],
        spawnPoints: {default: {x: 400, y: 600}}
    },
    'windows-kingdom': {
        key: 'windows',
        jsonPath: 'assets/Maps/windows.json',
        tilesets: [
            {
                name: 'GBDungeon',
                imageKey: 'green-dungeon',
                imagePath: 'assets/Tilesets/GBDungeon.png'
            }
        ],
        layers: [{
            background: 'background',
            foreground: 'foreground',
            collision: 'collisions',
            objects: ['NPCZone']
        }],
        spawnPoints: {default: {x: 400, y: 600}}
    },
}