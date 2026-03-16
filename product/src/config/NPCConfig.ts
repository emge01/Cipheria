export const NPCConfig = {
    FRAME_WIDTH: 128,
    FRAME_HEIGHT: 128,

    CITIZEN: {
        TEXTURE: 'citizen',
        SPEED: 50,
        CAN_ATTACK: false
    },

    BAD_GUY: {
        TEXTURE: 'bad_guy',
        SPEED: 60,
        CAN_ATTACK: true
    },

    ANIMATIONS: {
        ARCHER: {
            IDLE: {
                key: 'archer-idle',
                action: 'archer-idle',
                startFrame: 0,
                endFrame: 3,
                frameRate: 4
            },
            WALK: {
                key: 'archer-walk',
                action: 'archer-walk',
                startFrame: 0,
                endFrame: 7,
                frameRate: 8
            },
            ATTACK: {
                key: 'archer-attack',
                action: 'archer-attack',
                startFrame: 0,
                endFrame: 3,
                frameRate: 8
            }
        },
        ENCHANTRESS: {
            IDLE: {
                key: 'enchantress-idle',
                action: 'enchantress-idle',
                startFrame: 0,
                endFrame: 4,
                frameRate: 4
            },
            WALK: {
                key: 'enchantress-walk',
                action: 'enchantress-walk',
                startFrame: 0,
                endFrame: 3,
                frameRate: 8
            },
            ATTACK: {
                key: 'enchantress-attack',
                action: 'enchantress-attack',
                startFrame: 0,
                endFrame: 9,
                frameRate: 8
            }
        },
        KNIGHT: {
            IDLE: {
                key: 'knight-idle',
                action: 'knight-idle',
                startFrame: 0,
                endFrame: 5,
                frameRate: 4
            },
            WALK: {
                key: 'knight-walk',
                action: 'knight-walk',
                startFrame: 0,
                endFrame: 7,
                frameRate: 8
            },
            ATTACK: {
                key: 'knight-attack',
                action: 'knight-attack',
                startFrame: 0,
                endFrame: 4,
                frameRate: 8
            }
        },
        MUSKETEER: {
            IDLE: {
                key: 'musketeer-idle',
                action: 'musketeer-idle',
                startFrame: 0,
                endFrame: 4,
                frameRate: 4
            },
            WALK: {
                key: 'musketeer-walk',
                action: 'musketeer-walk',
                startFrame: 0,
                endFrame: 7,
                frameRate: 8
            },
            ATTACK: {
                key: 'musketeer-attack',
                action: 'musketeer-attack',
                startFrame: 0,
                endFrame: 5,
                frameRate: 8
            }
        },
        SWORDSMAN: {
            IDLE: {
                key: 'swordsman-idle',
                action: 'swordsman-idle',
                startFrame: 0,
                endFrame: 2,
                frameRate: 4
            },
            WALK: {
                key: 'swordsman-walk',
                action: 'swordsman-walk',
                startFrame: 0,
                endFrame: 7,
                frameRate: 8
            },
            ATTACK: {
                key: 'swordsman-attack',
                action: 'swordsman-attack',
                startFrame: 0,
                endFrame: 3,
                frameRate: 8
            }
        },
        WIZARD: {
            IDLE: {
                key: 'wizard-idle',
                action: 'wizard-idle',
                startFrame: 0,
                endFrame: 4,
                frameRate: 4
            },
            WALK: {
                key: 'wizard-walk',
                action: 'wizard-walk',
                startFrame: 0,
                endFrame: 6,
                frameRate: 8
            },
            ATTACK: {
                key: 'wizard-attack',
                action: 'wizard-attack',
                startFrame: 0,
                endFrame: 6,
                frameRate: 8
            }
        }
    }
}