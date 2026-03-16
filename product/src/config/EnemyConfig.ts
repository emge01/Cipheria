export const EnemyConfig = {
    SPEED: {
        DRONE: 120,
        SLIME: 20
    },
    FRAME_WIDTH: 64,
    FRAME_HEIGHT: 64,

    ANIMATIONS: {
        DRONE: {
            SOUTH_MOVE: {
                key: 'drone-south-move',
                action: 'drone-move',
                startFrame: 0,
                endFrame: 0,
                frameRate: 8
            },
            EAST_MOVE: {
                key: 'drone-east-move',
                action: 'drone-move',
                startFrame: 0,
                endFrame: 0,
                frameRate: 8
            },
            WEST_MOVE: {
                key: 'drone-west-move',
                action: 'drone-move',
                startFrame: 0,
                endFrame: 0,
                frameRate: 8
            },
            ATTACK: {
                key: 'drone-attack',
                action: 'drone-attack',
                startFrame: 0,
                endFrame: 2,
                frameRate: 10
            },
            EXPLOSION: {
                key: 'drone-death',
                action: 'drone-explosion',
                startFrame: 0,
                endFrame: 5,
                frameRate: 12
            }

        },
        SLIME: {
            MOVE: {
                key: 'slime-move',
                action: 'slime',
                startFrame: 0,
                endFrame: 7,
                frameRate: 8
            },
            ATTACK: {
                key: 'slime-attack',
                action: 'slime',
                startFrame: 8,
                endFrame: 15,
                frameRate: 8
            },
            DEATH: {
                key: 'slime-death',
                action: 'slime',
                startFrame: 16,
                endFrame: 21, 
                frameRate: 8
            }
        }
    },
    DETECTION_RANGE: 100,
    ATTACK_RANGE: {
        DRONE: 50,
        SLIME: 20
    },
    ATTACK_COOLDOWN: {
        DRONE: 3000,
        SLIME: 5000
    },
    HEALTH: {
        DRONE: 30,
        SLIME: 60
    },
    DAMAGE: {
        DRONE: 20,
        SLIME: 10
    },
    DRONE_ATTACK_SPEED: 100
} as const;

export type Direction = 'north' | 'south' | 'east' | 'west';
export type EnemyType = 'drone' | 'slime';
export type EnemyActionType = 'move' | 'attack' | 'death'