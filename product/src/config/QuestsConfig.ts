export interface QuestObjective {
    id: string;
    description: string;
    type: 'reach' | 'kill' | 'talk' | 'interact' | 'fix' | 'identify';
    target?: string;
    count?: number;
    currentCount?: number;
    completed: boolean;
}

export interface QuestData {
    id: string;
    name: string;
    description: string;
    objectives: QuestObjective[];
    prerequisiteQuests?: string[];
    maps: string[];
}

export const QUESTS: Record<string, QuestData> = {
    'quest-1': {
        id: 'quest-1',
        name: 'What is cybersecurity',
        description: 'Climb up the tower and defeat enemies trying to reach the Motherboard',
        objectives: [
            {
                id: 'obj-1-1',
                description: 'Defend the first floor from enemy drones',
                type: 'kill',
                count: 100,
                currentCount: 0,
                completed: false
            }
        ],
        maps: ['tower-entrance', 'tower-first-floor']
    },
    'quest-2': {
        id: 'quest-2',
        name: 'Understanding cyber risk',
        description: 'Look around the room and fix any damage and kill any introuders',
        objectives: [
            {
                id: 'obj-2-1',
                description: 'Fix damage',
                type: 'fix',
                count: 23,
                currentCount: 0,
                completed: false
            }
        ],
        prerequisiteQuests: ['quest-1'],
        maps: ['motherboard']
    },
    'quest-3': {
        id: 'quest-3',
        name: 'Common cyber threats',
        description: 'Faces a series of encounters that represent real-world cyberattacks',
        objectives: [
            {
                id: 'obj-3-1',
                description: 'Phishing',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-3-2',
                description: 'DDoS',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-3-3',
                description: 'Malware',
                count: 5,
                currentCount: 0,
                type: 'kill',
                completed: false
            },
            {
                id: 'obj-3-4',
                description: 'Ransomware',
                type: 'interact',
                completed: false
            }
        ],
        maps: ['null-domain'] 
    },
    'quest-4': {
        id: 'quest-4',
        name: 'The CIA triad',
        description: 'Find and fix all 3 crystals that power Cipheria that represent the CIA triad',
        objectives: [
            {
                id: 'obj-4-1',
                description: 'Integrity',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-4-2',
                description: 'Confidentiality',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-4-3',
                description: 'Availability',
                type: 'kill',
                completed: false
            }
        ],
        prerequisiteQuests: [],
        maps: ['motherboard-fixed', 'cipheria-town', 'null-domain']
    },
    'quest-5': {
        id: 'quest-5',
        name: 'IAAA principles',
        description: '',
        objectives: [
            {
                id: 'obj-5-1',
                description: 'Identification',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-5-2',
                description: 'Authenication and Authorization',
                type: 'interact',
                completed: false
            },
        ],
        maps: ['fortress-entrance', 'fortress-outer-walls', 'fortress-outer-walls', 'fortress-outer-walls-1', 'throne-room']
    },
    'quest-6': {
        id: 'quest-6',
        name: 'People and security',
        description: '',
        objectives: [
            {
                id: 'obj-6-1',
                description: 'interact with the people of cipheria',
                type: 'interact',
                count: 8,
                currentCount: 0,
                completed: false
            },
            {
                id: 'obj-6-2',
                description: 'identify any tricksters diguising as the citizens of Cipheria',
                type: 'identify',
                count: 3,
                currentCount: 0,
                completed: false
            }
        ],
        prerequisiteQuests: [],
        maps: ['cipheria-town']
    },
    'quest-7': {
        id: 'quest-7',
        name: 'Defensive Mechanisms',
        description: '',
        objectives: [
            {
                id: 'obj-7-1',
                description: 'Firewall',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-7-2',
                description: 'Antivirus',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-7-3',
                description: 'Encryption',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-7-4',
                description: 'IDS',
                type: 'interact',
                completed: false
            }
        ],
        prerequisiteQuests: [],
        maps: ['tower-first-floor-quest-7']
    },
    'quest-8': {
        id: 'quest-8',
        name: 'Operating Systems',
        description: '',
        objectives: [
            {
                id: 'obj-8-1',
                description: 'Linux',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-8-2',
                description: 'Windows',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-8-3',
                description: 'Mac',
                type: 'interact',
                completed: false
            },
        ],
        prerequisiteQuests: [],
        maps: ['fortress-entrance', 'linux-kingdom', 'windows-kingdom', 'mac-kingdom']
    },
    'quest-9': {
        id: 'quest-9',
        name: 'Cryptography basics',
        description: 'Decode a series of encrypted messages from a missing Guardian to locate them in the Null Domain',
        objectives: [
            {
                id: 'obj-9-1',
                description: 'Decode the first message — Caesar cipher',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-9-2',
                description: 'Decode the second message — Morse code',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-9-3',
                description: 'Decode the third message — Binary',
                type: 'interact',
                completed: false
            },
            {
                id: 'obj-9-4',
                description: 'Decode the final message and locate the Guardian',
                type: 'interact',
                completed: false
            }
        ],
        maps: ['motherboard-fixed']
    }

}