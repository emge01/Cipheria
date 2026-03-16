export const PlayerConfig = {
    SPEED: 160,
    FRAME_WIDTH: 64,
    FRAME_HEIGHT: 64,

    ANIMATIONS: {
        //Idle animations
        NORTH_IDLE: {
            key: 'north-idle',
            action: 'player-idle',
            startFrame: 36,
            endFrame: 39,
            frameRate: 10
        },
        SOUTH_IDLE: {
            key: 'south-idle',
            action: 'player-idle',
            startFrame: 0,
            endFrame: 11,
            frameRate: 10
        },
        EAST_IDLE: {
            key: 'east-idle',
            action: 'player-idle',
            startFrame: 24,
            endFrame: 35,
            frameRate: 10
        },
        WEST_IDLE: {
            key: 'west-idle',
            action: 'player-idle',
            startFrame: 12,
            endFrame: 23,
            frameRate: 10
        },

        //Walk animations
        NORTH_WALK: {
            key: 'north-walk',
            action: 'player-walk',
            startFrame: 18,
            endFrame: 23,
            frameRate: 10
        },
        SOUTH_WALK: {
            key: 'south-walk',
            action: 'player-walk',
            startFrame: 0,
            endFrame: 5,
            frameRate: 10
        },
        EAST_WALK: {
            key: 'east-walk',
            action: 'player-walk',
            startFrame: 12,
            endFrame: 17,
            frameRate: 10
        },
        WEST_WALK: {
            key: 'west-walk',
            action: 'player-walk',
            startFrame: 6,
            endFrame: 11,
            frameRate: 10
        },

        //Attack animation
        NORTH_ATTACK: {
            key: 'north-attack',
            action: 'player-attack',
            startFrame: 24,
            endFrame: 31,
            frameRate: 10
        },
        SOUTH_ATTACK: {
            key: 'south-attack',
            action: 'player-attack',
            startFrame: 0,
            endFrame: 7,
            frameRate: 10
        },
        EAST_ATTACK: {
            key: 'east-attack',
            action: 'player-attack',
            startFrame: 16,
            endFrame: 23,
            frameRate: 10
        },
        WEST_ATTACK: {
            key: 'west-attack',
            action: 'player-attack',
            startFrame: 8,
            endFrame: 15,
            frameRate: 10
        }
    } 
} as const;

export type Direction = 'north' | 'south' | 'east' | 'west';
export type ActionType = 'idle' | 'walk' | 'attack';