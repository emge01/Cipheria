export interface DialogueData {
    id: string,
    character?: string,
    texts: string[],
    type: DialogueType,
    connectedDialogue?: string,
    questToActivate?: string,
    objectiveToComplete?: string,
    questIdForObjective?: string,
    choices?: {label: string, correct: boolean, response: string}[]
}

//Got some inspiration on how to write the dialogues from various sources including dialogue styles in games and generative ai (ChatGPT/Claude ai)
export const DIALOGUE: Record<string, DialogueData> = {
    //teching and feedback dialogues
    'quest-1-intro' : {
        id: 'quest-1-intro',
        character: 'Elder',
        texts: ['Welcome, young apprentice, to Cipheria, a world unlike any other. Do you see that magnificent Tower piercing the clouds before us?',
            'That is the Tower of the Motherboard, the heart of our entire civilisation. At its peak lies the Motherboard itself, powered by three sacred crystals. It sustains all life here, preserves every memory, and connects every citizen. It is our most valuable asset',
            'But dark forces have discovered our world. They seek to steal the Motherboards crystals, for whoever controls them controls all of Cipheria. Right now, waves of enemy robots and drones are attempting to breach the Tower.',
            'This is your first lesson as a Guardian: Cybersecurity is about protecting what matters most from those who would do harm.',
            'The Motherboard is our asset. The enemies are our threats. And you... you must become its defender',
            'Climb the Tower. Fight through the waves of attackers. Reach the Motherboard chamber. Show me you understand what it means to protect something precious'
        ],
        type: 'introduction',
        questToActivate: 'quest-1'
    },

    'quest-1-wrapup' : {
        id: 'quest-1-wrapup',
        character: 'Elder',
        texts: ['You did it! The attackers have been repelled, and the Motherboard remains secure, for now.',
            'Cybersecurity is not just about technology or fancy tools, it is about protecting valuable assets from threats.',
            'In our world, that asset is the Motherboard. In your world beyond Cipheria, it could be personal data, financial information, private communications, or entire computer systems',
            'The drones you fought? They represent the endless threats that seek to steal, damage, or corrupt valuable information. Every day, in every digital system, these battles are fought',
            'Remember this: wherever there is something valuable, there will be those who try to take it. A Guardians purpose is to stand between the asset and the threat. That is the essence of cybersecurity',
            'But defending the outside is not enough. Come, we must venture deeper into the Motherboard itself.'
        ],
        type: 'completion',
    },

    'quest-2-intro' : {
        id: 'quest-2-intro',
        character: 'Elder',
        texts: ['Now that you have protected the Tower from external attacks, you must learn a harder truth: sometimes the greatest dangers come from within',
            'The Motherboard has been damaged. There are cracks in its structure, vulnerabilities. And through those cracks, enemies are finding ways to cause harm...we call those exploits',
            'The enemies themselves? Those are threats. And somewhere out there is a mastermind coordinating these attacks—a threat actor',
            'As you explore the Motherboards inner systems, you will see a percentage next to each damaged area. That number represents risk, the likelihood that an enemy will break through if we do not repair it in time',
            'Your task is to navigate through the Motherboard, find the vulnerabilities, stop the exploits, and repair the damage before the risk becomes reality.'
        ],
        type: 'introduction',
        connectedDialogue: 'threat-actor-quest-2',
        questToActivate: 'quest-2'
    },

    'quest-2-wrapup' : {
        id: 'quest-2-wrapup',
        character: 'Elder',
        texts: ['You have done well, apprentice. The Motherboards most critical vulnerabilities have been sealed',
            'Let us review what you learned today:',
            'Vulnerabilities are weaknesses in a system—like cracks in the Motherboards structure',
            'Exploits are the methods attackers use to take advantage of those weaknesses',
            'Threats are the actual dangers, the enemies trying to cause harm',
            'Threat actors are the masterminds behind the attacks, coordinating and planning',
            'Risk is the likelihood that a threat will successfully exploit a vulnerability',
            'I must ask you to travel all the way to the fortress entrance...for your next task'
        ],
        type: "completion",
    },

    'quest-3-intro': {
        id: 'quest-3-intro',
        character: 'Elder',
        texts: ['You have proven yourself capable of defense, apprentice. But to truly protect Cipheria, you must learn to recognize the enemy in all its forms',
            'I am sending you to the Null Domain, a realm of chaos and corruption where the most dangerous cyber threats roam freely. It is there that you will learn what every Guardian must know: how to identify common cyber attacks',
            'These threats are cunning. They disguise themselves, change their appearance, adapt their tactics. A true Guardian recognizes them not by how they look, but by how they behave and what they intend to do',
            'Go to the portal between the crystals...it will take you there...Good luck'
        ],
        type: 'introduction',
        questToActivate: 'quest-3'
    },

    'npc-phishing-dialogue-citizen-1': {
        id: 'npc-phishing-dialogue-citizen-1',
        character: 'citizen',
        texts: ["Have you seen my cat? She wandered off near the market again..."],
        type: 'interaction'
    },

    'npc-phishing-dialogue-citizen-2': {
        id: 'npc-phishing-dialogue-citizen-2',
        character: 'citizen',
        texts: ["I heard the blacksmith is offering discounts. Might be worth a look!"],
        type: 'interaction'
    },

    'npc-phishing-dialogue-citizen-3': {
        id: 'npc-phishing-dialogue-citizen-3',
        character: 'citizen',
        texts: ["Beautiful day isn't it? I love the breeze coming off the hills."],
        type: 'interaction'
    },

    'npc-phishing-dialogue-citizen-4': {
        id: 'npc-phishing-dialogue-citizen-4',
        character: 'citizen',
        texts: ["My son just started training at the academy. Proud father I am!"],
        type: 'interaction'
    },

    'npc-phishing-dialogue-citizen-5': {
        id: 'npc-phishing-dialogue-citizen-5',
        character: 'citizen',
        texts: ["Stay safe out there, traveller. Strange things afoot lately."],
        type: 'interaction'
    },

    'npc-phishing-dialogue-citizen-6': {
        id: 'npc-phishing-dialogue-citizen-6',
        character: 'citizen',
        texts: ["The harvest festival is coming up! I've been baking all week."],
        type: 'interaction'
    },

    'npc-phishing-dialogue-impostor': {
        id: 'npc-phishing-dialogue-impostor',
        character: 'badguy',
        texts: ["Ah, brave warrior. I am Elder Aldric. I have been looking for you urgently.",
            "The Motherboard is in grave danger. We have no time to waste — you must act NOW before it is too late.",
            "Give me the Tower Keys immediately. I will ensure they reach the right hands. You can trust me — I am the Elder after all.",
            "Why do you hesitate? Every second you delay puts us all at risk. Hand over the keys and I will handle the rest."
        ],
        type: 'interaction'
    },

    'quest-3-phishing-complete': {
    id: 'quest-3-phishing-complete',
    character: 'Elder',
    texts: [
        'You saw through the deception! That was no Elder — it was an impostor trying to steal the Tower Keys.',
        'This is exactly how phishing works. An attacker disguises themselves as someone you trust, then creates urgency to pressure you into handing over something valuable.',
        'Remember: real authority never demands keys, passwords, or access under pressure. Always verify before you trust.'
    ],
    type: 'interaction',
    objectiveToComplete: 'obj-3-1',
    questIdForObjective: 'quest-3'
},

'quest-3-phishing-fail': {
    id: 'quest-3-phishing-fail',
    character: 'Elder',
    texts: [
        'That was one of our own citizens! The real impostor is still out there.',
        'Look more carefully this time. Who seemed overly urgent? Who asked for something they should not need?',
        'The impostor will try to rush you — do not let them.'
    ],
    type: 'interaction'
},

'quest-3-ddos-intro': {
    id: 'quest-3-ddos-intro',
    character: 'Elder',
    texts: [
        'Well done apprentice. But there is no time to rest — our sensors are detecting an incoming wave of drones heading straight for the Tower.',
        'This is a DDoS attack — a Distributed Denial of Service. No single drone is particularly dangerous, but together they overwhelm our defences by sheer volume.',
        'Like a flood breaking through a dam, if too many get through at once, our systems will collapse under the pressure.',
        'Defeat every last drone before they breach the Tower. Do not let them overwhelm you!'
    ],
    type: 'interaction'
},
    'quest-3-ddos-complete': {
    id: 'quest-3-ddos-complete',
    character: 'Elder',
    texts: [
        'Outstanding work apprentice! The drone wave has been repelled.',
        'What you just experienced is a DDoS attack — a Distributed Denial of Service.',
        'No single drone was a serious threat. But hundreds arriving all at once? That is the point. The goal is never to fight fairly — it is to overwhelm.',
        'In the digital world, attackers flood a server with so much traffic that it cannot respond to real users. Websites crash. Services go offline. Entire systems grind to a halt.',
        'The defence? Preparation, redundancy, and the ability to filter out malicious traffic before it reaches its target.',
        'But there is no rest for a Guardian. Something far more insidious approaches...'
    ],
    type: 'interaction',
    objectiveToComplete: 'obj-3-2',
    questIdForObjective: 'quest-3'
},

    'quest-3-malware-intro': {
        id: 'quest-3-malware-intro',
        character: 'Elder',
        texts: [
            'The drones have been defeated, but something strange is emerging from the corruption...',
            'Do you see those slime creatures? They seem harmless enough.',
            'Approach one and see what happens. A Guardian must understand a threat before they can fight it.'
        ],
        type: 'interaction'
    },

    'quest-3-malware-complete': {
        id: 'quest-3-malware-complete',
        character: 'Elder',
        texts: [
            'Now you see the true nature of malware!',
            'A single slime seems manageable. But touch it, and it spreads. Each new slime spawns another, and another — until the entire system is overwhelmed with infection.',
            'This is exactly how malware behaves in the digital world. It infiltrates a system, replicates itself, and spreads to every corner it can reach.',
            'Viruses, worms, trojans — they all follow the same principle. One infected file becomes ten, ten becomes a thousand.',
            'The lesson? Never execute something you do not trust. One careless click is all it takes to unleash an infection that can bring down an entire network.',
            'Now steel yourself apprentice. The final threat is the most personal one yet...'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-3-3',
        questIdForObjective: 'quest-3'
    },

    'quest-3-ransomware-intro': {
        id: 'quest-3-ransomware-intro',
        character: 'Elder',
        texts: [
            'Apprentice! A ransomware agent has infiltrated the Tower!',
            'It has stolen your sword and locked it away behind an encrypted barrier.',
            'It is demanding the Tower Keys in exchange for your weapon. Do NOT give them up — that would give it access to the Motherboard itself.',
            'There is another way. The encryption can be cracked — but you must match the correct sequence of symbols to break through.',
            'Solve the cipher and reclaim your sword. The keys must never leave your hands.'
        ],
        type: 'interaction'
    },

    'quest-3-ransomware-fail': {
        id: 'quest-3-ransomware-fail',
        character: 'Elder',
        texts: [
            'No! You surrendered the keys!',
            'This is exactly what ransomware attackers count on — panic, pressure, and the belief that paying is the only option.',
            'In the real world, paying a ransom rarely guarantees you get your data back. It only encourages more attacks.',
            'The keys have been recovered, but at great cost. Try again — and this time, trust the cipher.'
        ],
        type: 'interaction'
    },

    'quest-3-ransomware-complete': {
        id: 'quest-3-ransomware-complete',
        character: 'Elder',
        texts: [
            'You cracked the encryption and reclaimed your sword without surrendering a thing!',
            'This is ransomware — attackers encrypt your valuable data and demand payment to restore it.',
            'Businesses, hospitals, governments — all have fallen victim to this exact attack.',
            'The defence? Regular backups, strong access controls, and never paying the ransom.',
            'You have now faced all four of the most dangerous cyber threats. You are ready for what comes next...'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-3-4',
        questIdForObjective: 'quest-3'
    },

    'quest-3-wrapup': {
        id: 'quest-3-wrapup',
        character: 'Elder',
        texts: ['Let us review what you encountered:',
            'Phishing is about deception—tricking you into giving away something valuable, often by impersonating someone you trust. In the Null Domain, it was a false version of me asking for the Tower keys. In your world, it might be a fake email from your bank asking for your password',
            'Malware spreads and corrupts. Those slime creatures that multiplied when touched? That is exactly how malicious software behaves—infecting one system, then spreading to others, causing damage wherever it goes',
            'DDoS attacks overwhelm through volume. Those endless waves of small drones were not individually dangerous, but together they could crush any defense by consuming all available resources. In digital systems, this means flooding a server with so much traffic it can not function',
            'Ransomware holds your assets hostage. When that cyborg stole your sword and demanded payment, you experienced what millions face in your world—attackers encrypting valuable data and demanding ransom to return it',
            'The countermeasures? Awareness, vigilance, and preparation'
        ],
        type: 'completion',
        connectedDialogue: 'quest-5-intro'
    },

    'quest-4-intro': {
        id: 'quest-4-intro',
        character: 'Elder',
        texts: [
            'Apprentice, something terrible has happened. The three crystals that power the Motherboard have been corrupted, stolen, or hidden.',
            'These crystals represent the CIA Triad — the three pillars of cybersecurity: Confidentiality, Integrity, and Availability.',
            'Without all three, the Motherboard cannot function. You must find and restore each one.',
            'Begin here in the Motherboard chamber. One crystal remains — but it has been corrupted.'
        ],
        type: 'introduction',
        questToActivate: 'quest-4'
    },

    // INTEGRITY CRYSTAL
    'quest-4-integrity-intro': {
        id: 'quest-4-integrity-intro',
        character: 'Elder',
        texts: [
            'This is the Integrity Crystal — but something has corrupted it.',
            'Integrity means data can only be modified by those authorised to do so. This crystal has been tampered with.',
            'You must solve the cipher to purify it and restore its integrity.'
        ],
        type: 'interaction'
    },

    'quest-4-integrity-riddle': {
        id: 'quest-4-integrity-riddle',
        character: 'Elder',
        texts: ['The crystal pulses with corrupted energy. Answer this to purify it:',
                'I am broken when someone changes what should stay the same. I am kept when data remains accurate and untampered. What am I?'],
        type: 'interaction',
        choices: [
            { label: 'Integrity', correct: true, response: 'Correct! Integrity ensures data remains accurate and unaltered by unauthorised parties.' },
            { label: 'Confidentiality', correct: false, response: 'Not quite. Confidentiality is about keeping data private, not accurate.' },
            { label: 'Availability', correct: false, response: 'Not quite. Availability ensures systems are accessible, not that data is accurate.' },
            { label: 'Authentication', correct: false, response: 'Not quite. Authentication verifies identity — not data accuracy.' },
        ]
    },

    'quest-4-integrity-complete': {
        id: 'quest-4-integrity-complete',
        character: 'Elder',
        texts: [
            'The Integrity Crystal has been restored!',
            'Integrity is one of the three pillars of cybersecurity. It ensures that data remains accurate and unaltered.',
            'When data integrity is compromised, systems make decisions based on false information — with potentially devastating consequences.',
            'Now find the Confidentiality Crystal. I have heard rumours it was hidden somewhere in Cipheria town.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-4-1',
        questIdForObjective: 'quest-4'
    },

    'quest-4-confidentiality-intro': {
        id: 'quest-4-confidentiality-intro',
        character: 'Elder',
        texts: [
            'Interact with the people of Cipheria to get clues on where the confidentiality crystal',
            'People may ask you to show documentation to prove your identity before revealing the confidential clues',
            'Beware, some of the people may be impostors in disguise',
            'Once you have interacted with all the people of cipheria you will be asked where the crystal is, your task is to gather information and select the right location'
        ],
        type: 'interaction'
    },

    // CONFIDENTIALITY CRYSTAL
    'quest-4-confidentiality-citizen-1': {
        id: 'quest-4-confidentiality-citizen-1',
        character: 'citizen',
        texts: ['I heard something strange near the old market fountain... someone was seen hiding something glowing.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-citizen-2': {
        id: 'quest-4-confidentiality-citizen-2',
        character: 'citizen',
        texts: ['The blacksmith mentioned seeing a violet light near the fountain square last night.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-citizen-3': {
        id: 'quest-4-confidentiality-citizen-3',
        character: 'citizen',
        texts: ['I saw cloaked figures near the fountain. They seemed to be burying something.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-citizen-4': {
        id: 'quest-4-confidentiality-citizen-4',
        character: 'citizen',
        texts: ['Strange lights near the fountain square at midnight. Something is hidden there, I am sure of it.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-citizen-5': {
        id: 'quest-4-confidentiality-citizen-5',
        character: 'citizen',
        texts: ['Everyone is talking about it — whatever was hidden, it is near the fountain. I would start there.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-badguy-1': {
        id: 'quest-4-confidentiality-badguy-1',
        character: 'badguy',
        texts: ['The crystal? I heard it was near the old tower gate. Definitely not the fountain...', 'Trust me.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-badguy-2': {
        id: 'quest-4-confidentiality-badguy-2',
        character: 'badguy',
        texts: ['Someone told me it was buried in the dark alley. Far from the town centre.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-badguy-3': {
        id: 'quest-4-confidentiality-badguy-3',
        character: 'badguy',
        texts: ['The crystal is on the other side of the map, near the fortress walls. I saw it myself.'],
        type: 'interaction'
    },
    'quest-4-confidentiality-quiz' : {
        id: 'quest-4-confidentiality-quiz',
        character: 'Elder',
        texts: [
            'Where is the confidentiality crystal?'
        ],
        type: 'interaction',
        choices: [
            { label: 'Dark alley', correct: true, response: 'Correct! Integrity ensures data remains accurate and unaltered by unauthorised parties.' },
            { label: 'Fountain', correct: false, response: 'Not quite. Confidentiality is about keeping data private, not accurate.' },
            { label: 'Cipheria Tower', correct: false, response: 'Not quite. Availability ensures systems are accessible, not that data is accurate.' },
        ]
    },
    'quest-4-confidentiality-found': {
        id: 'quest-4-confidentiality-found',
        character: 'Elder',
        texts: [
            'The Confidentiality Crystal! You found it!',
            'Confidentiality ensures that information is only accessible to those authorised to see it.',
            'When confidentiality is breached, private data falls into the wrong hands — passwords, financial records, personal communications.',
            'One crystal remains. Head to the Null Domain — the Availability Crystal is there, but it is guarded.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-4-2',
        questIdForObjective: 'quest-4'
    },

    // AVAILABILITY CRYSTAL
    'quest-4-availability-intro': {
        id: 'quest-4-availability-intro',
        character: 'Elder',
        texts: [
            'The Availability Crystal is here — but a swarm of drones is blocking access to it.',
            'Availability means systems and data must be accessible when needed. These drones are attempting a denial of service.',
            'Defeat every drone. Only then will the crystal be freed.'
        ],
        type: 'interaction'
    },
    'quest-4-availability-complete': {
        id: 'quest-4-availability-complete',
        character: 'Elder',
        texts: [
            'The Availability Crystal is yours!',
            'Availability is the third pillar — ensuring systems remain operational when they are needed most.',
            'Now return to the Motherboard. All three crystals must be restored.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-4-3',
        questIdForObjective: 'quest-4'
    },

    // WRAPUP
    'quest-4-wrapup': {
        id: 'quest-4-wrapup',
        character: 'Elder',
        texts: [
            'All three crystals have been restored. The Motherboard lives again.',
            'You have now experienced the CIA Triad firsthand.',
            'Confidentiality — keeping information private and accessible only to those authorised.',
            'Integrity — ensuring data remains accurate and unaltered by unauthorised parties.',
            'Availability — guaranteeing that systems and data are accessible when needed.',
            'These three principles underpin every security decision in Cipheria — and in your world beyond it.',
            'A true Guardian never sacrifices one for another. All three must be maintained together.'
        ],
        type: 'completion'
    },

    'quest-5-intro': {
        id: 'quest-5-intro',
        character: 'Elder',
        texts: ['Guardian apprentice, by decree of the Rulers of Cipheria, you are hereby invited to the Royal Fortress to be honored for your heroic service',
            'This is a great honor, apprentice, but also a practical lesson. The Royal Fortress is the most secure location in all of Cipheria, protected by three walls representing the IAAA framework: **Identification, Authentication, Authorization, and Accountability',
            'Here is your Cyber Seal—a unique encrypted symbol—and your official invitation. You will need both to gain entry.',
            'Good luck and enjoy meeting the rulers of Cipheria!'
        ],
        type: 'introduction',
        questToActivate: 'quest-5'
    },

    'quest-5-guard1-greeting': {
        id: 'quest-5-guard1-greeting',
        character: 'Guard',
        texts: [
            'Halt! This is the outer gate of the Royal Fortress.',
            'Entry is restricted. State your name for the record.'
        ],
        type: 'interaction'
    },

    'quest-5-player-name': {
        id: 'quest-5-player-name',
        character: 'Player',
        texts: ['I am the Guardian Apprentice of Cipheria, summoned by Elder Aldric.'],
        type: 'interaction'
    },

    'quest-5-guard1-verified': {
        id: 'quest-5-guard1-verified',
        character: 'Guard',
        texts: [
            'Guardian Apprentice... yes, your name is on the official visitors list.',
            'Identification confirmed. You may proceed to the second gate.'
        ],
        type: 'interaction'
    },

    'quest-5-guard2-greeting': {
        id: 'quest-5-guard2-greeting',
        character: 'Guard',
        texts: [
            'Welcome to the second gate.',
            'Knowing your name is not enough — you must prove you are who you claim to be.',
            'Present your Cyber Seal for verification.'
        ],
        type: 'interaction',
        choices: [
            { label: 'Present Cyber Seal', correct: true, response: 'The guard examines the seal and nods. It matches the record exactly.' },
            { label: 'Refuse to show it', correct: false, response: 'The guard blocks your path. Verification is not optional.' }
        ]
    },
    'quest-5-guard2-verified': {
        id: 'quest-5-guard2-verified',
        character: 'Guard',
        texts: [
            'Seal verified. It matches our records exactly.',
            'Authentication confirmed. You are who you claim to be.',
            'Proceed to the inner gate.'
        ],
        type: 'interaction'
    },

    'quest-5-guard2-fail': {
        id: 'quest-5-guard2-fail',
        character: 'Guard',
        texts: [
            'That seal does not match our records.',
            'Anyone can claim an identity — authentication exists precisely to catch imposters.',
            'You must show your cyber seal.'
        ],
        type: 'interaction'
    },

    'quest-5-guard3-greeting': {
        id: 'quest-5-guard3-greeting',
        character: 'Guard',
        texts: [
            'This is the innermost gate of the Royal Fortress.',
            'Identification and authentication are not enough here.',
            'You must be explicitly authorised to enter. Present your official invitation.'
        ],
        type: 'interaction'
    },

    'quest-5-invitation-choice': {
        id: 'quest-5-invitation-choice',
        character: 'Player',
        texts: ['I have my official invitation, issued by Elder Aldric himself.'],
        type: 'interaction',
        choices: [
            { label: 'Present Invitation', correct: true, response: 'The guard examines the seal on the invitation and nods slowly.' },
            { label: 'Refuse to show it', correct: false, response: 'The guard does not move. Authorisation must be proven — not assumed.' }
        ]
    },

    'quest-5-guard3-verified': {
        id: 'quest-5-guard3-verified',
        character: 'Guard',
        texts: [
            'Invitation confirmed. You are identified, authenticated, and authorised.',
            'Welcome to the Royal Fortress, Guardian Apprentice.',
            'The Rulers of Cipheria are expecting you.'
        ],
        type: 'interaction'
    },

    'quest-5-wrapup': {
        id: 'quest-5-wrapup',
        character: 'Elder',
        texts: ['How did it feel to pass through the most secure location in Cipheria?',
            'Good security should feel thorough without being burdensome. Now, let us review the IAAA framework you just experienced:',
            'Identification is the first step—claiming an identity. At the outer wall, you gave your name. In digital systems, this is entering a username or email address. It is simply saying, "I am this person."',
            'Authentication is proving that claim is true. Your Cyber Seal confirmed you were really you—just like a password, fingerprint, or security token proves you are who you claim to be. Identity claims are easy to fake; authentication makes them trustworthy.',
            'Authorization determines what you are allowed to do once verified. Your invitation granted you permission to enter the inner fortress. In computer systems, this controls what files you can access, what actions you can perform. Just because you are authenticated does not mean you have access to everything',
            'Accountability** creates a trail of who did what. That Scribe recording your actions? That is audit logs, activity monitoring, and forensic evidence. If something goes wrong, accountability helps determine what happened and who was responsible.',
            'Together, these four principles answer critical questions:',
            'WHO are you?',
            'Can you PROVE it?',
            'What are you ALLOWED to do?',
            'What DID you do?',
            'Now, return to the Town. The citizens of Cipheria need your guidance.'
        ],
        type: 'completion'
    },
    //NPC dialogues

    'threat-actor-quest-2' : {
        id: 'threat-actor-quest-2',
        texts: ['Go my minions, secure the crystals...we will take over the Motherboard!'],
        type: 'interaction'
    },

    'quest-5-interaction': {
        id: 'quest-5-interaction',
        texts: ['Good day apprentice, what brings you here?',
            'May I ask for your name',
            'Let me verify your name is on the official visitors list',
            'All confirmed, you are good to proceed to the outer walls of the fortress'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-5-1',
        questIdForObjective: 'quest-5'
    },

    'quest-5-interaction-part2': {
        id: 'quest-5-interaction',
        texts: ['Present your Cyber seal',
            'Thank you, let us verify it',
            'Present your invitation letter, to prove you have authorized entry into the fortress',
            'Perfect thank you, you may enter the fortress. Enjoy your visit!'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-5-2',
        questIdForObjective: 'quest-5'
    },

    //ransomware riddles
    'riddle-1': {
        id: 'riddle-1',
        character: 'badguy',
        texts: ["I pretend to be your friend, I wear a trusted face. I ask for what is precious, then vanish without a trace. What am I?"],
        type: 'interaction',
        choices: [
            { label: 'DDos', correct: false, response: 'No - DDoS overwhelms the system' },
            { label: 'Phishing', correct: true, response: 'Correct! Phishing disguises itself as something trusted to steal from you.' },
            { label: 'Malware', correct: false, response: 'No — encryption protects data, it does not steal it.' },
        ]
    },
    'riddle-2': {
        id: 'riddle-2',
        character: 'badguy',
        texts: ["I multiply when touched, I spread without a sound. One becomes a thousand, corruption all around. What am I?"],
        type: 'interaction',
        choices: [
            { label: 'DDoS', correct: false, response: 'No — DDoS overwhelms with volume, it does not replicate.' },
            { label: 'Ransomware', correct: false, response: 'Close, but ransomware locks — it does not spread like this.' },
            { label: 'Malware', correct: true, response: 'Correct! Malware replicates and spreads through systems.' },
        ]
    },
    'riddle-3': {
        id: 'riddle-3',
        character: 'badguy',
        texts: ["I flood your gates with numbers, not one but millions strong. I ask for nothing back — I just want things to go wrong. What am I?"],
        type: 'interaction',
        choices: [
            { label: 'Phishing', correct: false, response: 'No — phishing deceives individuals, it does not flood systems.' },
            { label: 'DDoS', correct: true, response: 'Correct! A DDoS attack floods systems with traffic to overwhelm them.' },
            { label: 'Trojan', correct: false, response: 'Not quite. A trojan hides inside something else.' },
        ]
    },
    'riddle-4': {
        id: 'riddle-4',
        character: 'badguy',
        texts: ["I lock away your valuables and hold them for a price. Pay me what I am asking — though my word is never nice. What am I?"],
        type: 'interaction',
        choices: [
            { label: 'Spyware', correct: false, response: 'No — spyware steals quietly, it does not hold things hostage.' },
            { label: 'Firewall', correct: false, response: 'No — a firewall protects, it does not extort.' },
            { label: 'Ransomware', correct: true, response: 'Correct! Ransomware encrypts your data and demands payment.' },
        ]
    },

    // ─── QUEST 6 ─────────────────────────────────────────────────────────────────
// Theme: Social Engineering & Password Security

    'quest-6-intro': {
        id: 'quest-6-intro',
        character: 'Elder',
        texts: [
            'You have defended Cipheria from drones, malware, and impostors. But the most dangerous threat of all does not carry a weapon.',
            'It carries words.',
            'Social engineering is the art of manipulating people into giving away information they should protect. No firewall stops a convincing lie.',
            'The citizens of Cipheria need your help. Some genuinely need guidance — their home passkeys are weak, and they need a Guardian to help them craft stronger ones.',
            'But others are not citizens at all. They are tricksters in disguise, using charm and urgency to steal passkeys or your Cyber Seal.',
            'Trust carefully. Help wisely. Not everyone who asks deserves an answer.'
        ],
        type: 'introduction',
        questToActivate: 'quest-6'
    },

    // ─── GENUINE CITIZENS (need password help) ───────────────────────────────────

    'quest-6-genuine-1': {
        id: 'quest-6-genuine-1',
        character: 'citizen',
        texts: [
            'Guardian! Thank goodness. My home passkey is just my name... I know, I know.',
            'Can you help me choose something stronger? I never know what makes a passkey secure.'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Use "Cipheria123"',
                correct: false,
                response: 'A common word followed by simple numbers is one of the first combinations attackers try. This is not secure.'
            },
            {
                label: 'Use "T!g3r$un-42Kw"',
                correct: true,
                response: 'A strong passkey — long, mixed characters, no obvious words. This is exactly what a Guardian would recommend.'
            },
            {
                label: 'Use your pet\'s name',
                correct: false,
                response: 'Personal information like pet names is easy to guess, especially by someone who knows you. Never use it.'
            },
            {
                label: 'Use "password"',
                correct: false,
                response: '"Password" is the most commonly used passkey in existence. It offers no protection whatsoever.'
            }
        ]
    },

    'quest-6-genuine-2': {
        id: 'quest-6-genuine-2',
        character: 'citizen',
        texts: [
            'Apprentice, I keep forgetting my passkey so I use the same one for everything — my home, the market vault, the archive.',
            'Is that a problem?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'It is fine, easier to remember',
                correct: false,
                response: 'If one lock is picked, every door is open. Reusing passkeys means one breach compromises everything.'
            },
            {
                label: 'Each lock needs its own unique passkey',
                correct: true,
                response: 'Exactly right. Unique passkeys mean a breach in one place cannot cascade into others. Use a passkey keeper if needed.'
            },
            {
                label: 'Just write them all down somewhere',
                correct: false,
                response: 'Writing passkeys in plain sight defeats their purpose entirely. A passkey keeper is far safer.'
            }
        ]
    },

    'quest-6-genuine-3': {
        id: 'quest-6-genuine-3',
        character: 'citizen',
        texts: [
            'Guardian, how long does a passkey really need to be? Mine is four characters — is that not enough?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Four is plenty if it is random',
                correct: false,
                response: 'Length matters enormously. A four-character passkey can be cracked in seconds by modern methods.'
            },
            {
                label: 'At least twelve characters, mixed symbols',
                correct: true,
                response: 'Correct. Length is one of the strongest defences. Twelve or more characters, mixing letters, numbers and symbols, makes brute force attacks impractical.'
            },
            {
                label: 'The longer the harder to remember — keep it short',
                correct: false,
                response: 'A passkey keeper solves the memory problem. Never sacrifice length for convenience.'
            }
        ]
    },

    'quest-6-genuine-4': {
        id: 'quest-6-genuine-4',
        character: 'citizen',
        texts: [
            'Someone told me a passkey phrase — several random words strung together — is actually stronger than a jumble of symbols.',
            'Is that true?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'No — symbols are always stronger',
                correct: false,
                response: 'Not necessarily. A long passphrase like "crimson-anvil-thunder-gate" has enormous entropy and is far easier to remember than a short symbol string.'
            },
            {
                label: 'Yes — length and randomness matter most',
                correct: true,
                response: 'Exactly. A passphrase of four or more unrelated words is both strong and memorable — length beats complexity every time.'
            },
            {
                label: 'Only if the words are technical terms',
                correct: false,
                response: 'The words should be random and unrelated, not technical. Predictable word choices reduce the strength significantly.'
            }
        ]
    },

    // ─── TRICKSTERS (social engineering attempts) ─────────────────────────────────

    'quest-6-trickster-1': {
        id: 'quest-6-trickster-1',
        character: 'badguy',
        texts: [
            'Guardian! I am so relieved to find you.',
            'There has been a terrible mistake at the archive. My passkey was reset and I am locked out of my own records.',
            'The archivist said only a Guardian can verify my identity. Could you share your Cyber Seal so they can cross-reference it with my file? Just for a moment.'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Share your Cyber Seal',
                correct: false,
                response: 'The moment you handed it over, it was copied. Your Cyber Seal must never be shared — not with anyone, for any reason. This was a social engineering attack.'
            },
            {
                label: 'Refuse — send them to the archivist directly',
                correct: true,
                response: 'The right call. No legitimate process requires a Guardian to hand over their Cyber Seal. When in doubt, redirect to official channels.'
            },
            {
                label: 'Ask them to prove their identity first',
                correct: true,
                response: 'Good instinct. Requesting verification before acting is exactly what a Guardian should do. They could not provide it — because they were never who they claimed.'
            }
        ]
    },

    'quest-6-trickster-2': {
        id: 'quest-6-trickster-2',
        character: 'badguy',
        texts: [
            'Psst — Guardian. I am a neighbour of old Maren on the east road.',
            'She asked me to collect her home passkey on her behalf. She is unwell and cannot come herself.',
            'You have access to the passkey records, yes? Just this once — she is counting on me.'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Hand over Maren\'s passkey',
                correct: false,
                response: 'A passkey should never be shared with a third party. This is a classic social engineering trick — urgency and a sympathetic story to bypass your judgement.'
            },
            {
                label: 'Decline and offer to visit Maren directly',
                correct: true,
                response: 'Correct. If Maren truly needs help, she can be assisted directly. Never hand sensitive information to someone acting as a middleman.'
            },
            {
                label: 'Ask for proof they know Maren',
                correct: true,
                response: 'Sensible. They provided vague details anyone could guess. No real connection was demonstrated — and a real neighbour would understand why you had to check.'
            }
        ]
    },

    'quest-6-trickster-3': {
        id: 'quest-6-trickster-3',
        character: 'badguy',
        texts: [
            'Guardian, I work for the Tower security office. We are running a routine audit.',
            'We need to verify that your passkey hash matches our records. Please confirm your current passkey so we can validate it.',
            'This is standard procedure — all Guardians are required to comply.'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Confirm your passkey',
                correct: false,
                response: 'No legitimate security audit ever asks for your passkey. Real systems verify hashes without ever needing the passkey itself. You were deceived.'
            },
            {
                label: 'Refuse — security offices never ask for passkeys',
                correct: true,
                response: 'Exactly right. This is a textbook impersonation attack. Real security processes never require you to reveal a passkey — that would defeat the entire purpose.'
            },
            {
                label: 'Ask for written authorisation first',
                correct: true,
                response: 'Good instinct. Requesting official documentation put them on the back foot immediately. They had none — because no such audit existed.'
            }
        ]
    },

    'quest-6-trickster-4': {
        id: 'quest-6-trickster-4',
        character: 'badguy',
        texts: [
            'Oh Guardian, I am so embarrassed to ask...',
            'I set up a passkey for my home using your advice last week — but I wrote it down and lost the paper.',
            'I remember you helped me choose it. Could you just remind me what it was? You were there.'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Try to recall and tell them',
                correct: false,
                response: 'You were never there. This is a fabricated shared memory — a manipulation technique to make you feel obligated to help with something you never did.'
            },
            {
                label: 'You have no record of this — decline',
                correct: true,
                response: 'Correct. Fabricating a shared history is a known manipulation tactic. Guardians do not store passkeys — and even if they did, sharing one is never appropriate.'
            },
            {
                label: 'Direct them to reset it through official channels',
                correct: true,
                response: 'The right answer. A proper reset process exists precisely for this situation — no Guardian needs to be involved.'
            }
        ]
    },

    // ─── OUTCOME DIALOGUES ────────────────────────────────────────────────────────

    'quest-6-trickster-caught': {
        id: 'quest-6-trickster-caught',
        character: 'Elder',
        texts: [
            'Well handled. That was no ordinary citizen.',
            'Social engineering relies on pressure, sympathy, and urgency to bypass your better judgement.',
            'The moment someone asks for credentials, passkeys, or your Cyber Seal — stop. Verify. Redirect.',
            'A locked door is useless if you hand the key to the wrong person.'
        ],
        type: 'interaction'
    },

    'quest-6-trickster-failed': {
        id: 'quest-6-trickster-failed',
        character: 'Elder',
        texts: [
            'You were deceived. That was a trickster — and they walked away with exactly what they came for.',
            'Social engineers do not break down doors. They knock politely and wait for you to open them.',
            'Remember: urgency, sympathy, and authority are their tools. When you feel rushed or guilty — that is precisely when to slow down.',
            'Stay alert. There are more of them out there.'
        ],
        type: 'interaction'
    },

    'quest-6-password-correct': {
        id: 'quest-6-password-correct',
        character: 'Elder',
        texts: [
            'Good guidance. That citizen now has a passkey worth keeping.',
            'A strong passkey is long, random, and unique. It is the first line of defence for everything we protect.'
        ],
        type: 'interaction'
    },

    'quest-6-password-incorrect': {
        id: 'quest-6-password-incorrect',
        character: 'Elder',
        texts: [
            'That advice left the citizen vulnerable.',
            'Weak passkeys are one of the most common causes of breaches — not because of clever attacks, but because of predictable choices.',
            'Length, randomness, and uniqueness. Those are the three rules. Try again.'
        ],
        type: 'interaction'
    },

    // ─── WRAPUP ───────────────────────────────────────────────────────────────────

    'quest-6-wrapup': {
        id: 'quest-6-wrapup',
        character: 'Elder',
        texts: [
            'You have navigated one of the most treacherous lessons a Guardian can face — the human element.',
            'No encryption is unbreakable if someone simply asks nicely enough. Social engineering exploits trust, urgency, and goodwill.',
            'The tricksters you faced used classic techniques: impersonation, fabricated emergencies, false authority, and manufactured sympathy.',
            'And the citizens you helped taught you something equally important: strong passkeys are not complicated — they are long, random, and never reused.',
            'A passkey like "T!g3r$un-42Kw" takes centuries to crack by force. A passkey like "john1990" takes seconds.',
            'The final lesson of a Guardian is this: technology can only protect what people choose to protect.',
            'You are ready.'
        ],
        type: 'completion'
    },

    'quest-7-intro': {
        id: 'quest-7-intro',
        character: 'Elder',
        texts: [
            'You have fought threats from the outside, unmasked deception from within, and restored the CIA Triad. But Cipheria is still vulnerable.',
            'Reacting to attacks is not enough. A true Guardian builds defences that work even when they are not watching.',
            'The Tower needs four protections: a Firewall, an Antivirus, Encryption on the Motherboard door, and an Intrusion Detection System.',
            'Each must be crafted carefully. The wrong choices will leave gaps that enemies will find.',
            'Begin at the outer wall. Build wisely.'
        ],
        type: 'introduction',
        questToActivate: 'quest-7'
    },

    // ─── FIREWALL ─────────────────────────────────────────────────────────────────

    'quest-7-firewall-intro': {
        id: 'quest-7-firewall-intro',
        character: 'Elder',
        texts: [
            'The outer wall of the Tower is exposed. Any drone or robot can approach freely.',
            'A Firewall is a barrier that monitors everything trying to enter or leave. It permits trusted entities and blocks everything else.',
            'Think of it as a gatekeeper — not a wall that keeps everyone out, but one that checks credentials before letting anyone through.',
            'You must choose what rules the Firewall enforces. Choose carefully — too strict and allies cannot enter, too loose and enemies slip through.'
        ],
        type: 'interaction'
    },

    'quest-7-firewall-riddle': {
        id: 'quest-7-firewall-riddle',
        character: 'Elder',
        texts: [
            'A patrol of drones approaches the Tower. Some carry the Guardian sigil — the trusted mark. Others do not.',
            'What rule should the Firewall follow?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Block all drones, no exceptions',
                correct: false,
                response: 'Too restrictive. Blocking all traffic — even trusted allies — defeats the purpose. A firewall should filter, not seal.'
            },
            {
                label: 'Allow only those bearing the Guardian sigil',
                correct: true,
                response: 'Correct. A firewall permits known, trusted traffic and denies everything else. Rules based on identity and authorisation are the foundation of good firewall design.'
            },
            {
                label: 'Allow all drones through — inspect them inside',
                correct: false,
                response: 'Dangerous. Letting threats inside before inspecting them is exactly what a firewall is designed to prevent. Defence starts at the perimeter.'
            },
            {
                label: 'Block drones only at night',
                correct: false,
                response: 'Threats do not keep a schedule. A firewall must be active and consistent at all times, not conditionally enforced.'
            }
        ]
    },

    'quest-7-firewall-complete': {
        id: 'quest-7-firewall-complete',
        character: 'Elder',
        texts: [
            'The Firewall stands. Watch as it filters the approaching drones — trusted ones pass, the rest are turned away.',
            'In the digital world, firewalls examine every packet of data entering or leaving a network. They enforce rules about what is permitted.',
            'Without one, your network is an open gate. With one, only what you trust can enter.',
            'But the Firewall only guards the entrance. We need something to patrol inside.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-7-1',
        questIdForObjective: 'quest-7'
    },

    // ─── ANTIVIRUS ────────────────────────────────────────────────────────────────

    'quest-7-antivirus-intro': {
        id: 'quest-7-antivirus-intro',
        character: 'Elder',
        texts: [
            'Even the strongest Firewall cannot catch everything. Some threats slip through disguised as trusted entities.',
            'That is where the Antivirus comes in — a maintenance robot that roams the Tower\'s interior, scanning for corruption and cleansing anything it finds.',
            'It works by recognising the patterns of known threats — signatures — and flagging anything that matches.',
            'But it must be kept up to date. An Antivirus that does not know the latest threats is only half a defence.'
        ],
        type: 'interaction'
    },

    'quest-7-antivirus-riddle': {
        id: 'quest-7-antivirus-riddle',
        character: 'Elder',
        texts: [
            'A slime creature has infiltrated the Tower interior. It is spreading slowly, corrupting the walls.',
            'The Antivirus robot detects a pattern matching a known infection. What should it do?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Quarantine the slime and alert the Guardian',
                correct: true,
                response: 'Exactly right. Quarantine isolates the threat before it spreads further, and alerting the Guardian ensures a human can make the final decision on removal.'
            },
            {
                label: 'Ignore it — wait to see if it spreads',
                correct: false,
                response: 'Waiting is precisely what malware counts on. One slime becomes ten. Act immediately on confirmed threats.'
            },
            {
                label: 'Delete everything in the area to be safe',
                correct: false,
                response: 'Indiscriminate deletion causes as much damage as the infection. Precision matters — target the threat, preserve everything else.'
            },
            {
                label: 'Shut down the entire Tower',
                correct: false,
                response: 'Shutting down the Tower denies availability to everyone. That is trading one problem for another. Quarantine and remove — do not shut down.'
            }
        ]
    },

    'quest-7-antivirus-complete': {
        id: 'quest-7-antivirus-complete',
        character: 'Elder',
        texts: [
            'The Antivirus robot is active. Watch it patrol the corridors, scanning and cleansing as it goes.',
            'Antivirus software works the same way — it scans files and processes, compares them against known threat signatures, and removes or quarantines matches.',
            'But remember: it only knows threats it has been taught. New threats require updated definitions. A neglected Antivirus is a false sense of security.',
            'Two defences built. Now we must protect the Motherboard itself.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-7-2',
        questIdForObjective: 'quest-7'
    },

    // ─── ENCRYPTION ───────────────────────────────────────────────────────────────

    'quest-7-encryption-intro': {
        id: 'quest-7-encryption-intro',
        character: 'Elder',
        texts: [
            'The door to the Motherboard chamber is the most critical point in the entire Tower.',
            'We will hide it entirely — it will only reveal itself when the correct sequence of characters is entered.',
            'This is Encryption. The door is the data. The sequence is the key. Without the key, the door does not exist.',
            'You must choose the strongest possible key. The Motherboard depends on it.'
        ],
        type: 'interaction'
    },

    'quest-7-encryption-riddle': {
        id: 'quest-7-encryption-riddle',
        character: 'Elder',
        texts: [
            'Four sequences are offered to seal the Motherboard door. Only one provides true protection.',
            'Which sequence should be used as the encryption key?'
        ],
        type: 'interaction',
        choices: [
            {
                label: '"motherboard" — easy to remember',
                correct: false,
                response: 'A predictable word is the first thing an attacker tries. Easy to remember means easy to guess. Encryption keys must be complex and unpredictable.'
            },
            {
                label: '"1234-5678" — short and structured',
                correct: false,
                response: 'Sequential and structured patterns are trivial to crack. An encryption key must be random — structure is a weakness.'
            },
            {
                label: '"Xq7#mK2@pL9!vR4" — long and random',
                correct: true,
                response: 'Correct. A long, random sequence of mixed characters is the foundation of strong encryption. Unpredictability is the key\'s greatest strength.'
            },
            {
                label: '"tower2024" — includes the year',
                correct: false,
                response: 'Adding a year to a common word is a predictable pattern. Attackers know this trick. Avoid anything that follows a guessable structure.'
            }
        ]
    },

    'quest-7-encryption-complete': {
        id: 'quest-7-encryption-complete',
        character: 'Elder',
        texts: [
            'The Motherboard door has vanished. Only those who hold the sequence will ever know it exists.',
            'Encryption transforms readable data into an unreadable form — without the key, it is meaningless noise.',
            'It protects data at rest, data in transit, and access to critical systems. It is one of the most powerful tools a Guardian has.',
            'One defence remains. We need something that watches for what slips past everything else.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-7-3',
        questIdForObjective: 'quest-7'
    },

    // ─── IDS ──────────────────────────────────────────────────────────────────────

    'quest-7-ids-intro': {
        id: 'quest-7-ids-intro',
        character: 'Elder',
        texts: [
            'Even with a Firewall, an Antivirus, and Encryption — something may still get through.',
            'That is why we need an Intrusion Detection System. A small radio creature that monitors everything happening inside the Tower.',
            'It does not block threats directly. It watches, listens, and raises the alarm the moment something suspicious is detected.',
            'Speed of detection is speed of response. The faster we know, the less damage is done.'
        ],
        type: 'interaction'
    },

    'quest-7-ids-riddle': {
        id: 'quest-7-ids-riddle',
        character: 'Elder',
        texts: [
            'The IDS detects unusual behaviour — an entity moving through areas it has never accessed before, at a time it has never been active.',
            'The Firewall let it through. The Antivirus found no known signature. What should the IDS do?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Do nothing — the Firewall already cleared it',
                correct: false,
                response: 'The Firewall checks entry credentials, not behaviour over time. Suspicious patterns after entry are exactly what the IDS exists to catch.'
            },
            {
                label: 'Raise the alarm and flag the behaviour for review',
                correct: true,
                response: 'Correct. The IDS raises the alert immediately. A Guardian can then investigate — the IDS detects, humans decide. That is the right division of responsibility.'
            },
            {
                label: 'Automatically destroy the entity',
                correct: false,
                response: 'An IDS detects — it does not act. Automatic destruction risks false positives and collateral damage. Detection and response are separate responsibilities.'
            },
            {
                label: 'Wait for more evidence before alerting anyone',
                correct: false,
                response: 'Waiting allows damage to accumulate. An IDS should alert on suspicion, not certainty. Speed of detection is speed of response.'
            }
        ]
    },

    'quest-7-ids-complete': {
        id: 'quest-7-ids-complete',
        character: 'Elder',
        texts: [
            'The IDS is active. Listen — it monitors every corridor, every access point, every movement.',
            'An Intrusion Detection System analyses behaviour and patterns, looking for anomalies that other defences might miss.',
            'It is the Tower\'s early warning system. The moment something unusual happens, you will know.',
            'All four defences are in place. Come — let us see what we have built.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-7-4',
        questIdForObjective: 'quest-7'
    },

    // ─── WRAPUP ───────────────────────────────────────────────────────────────────

    'quest-7-wrapup': {
        id: 'quest-7-wrapup',
        character: 'Elder',
        texts: [
            'Look at the Tower now. Four layers of defence, each one covering what the others cannot.',
            'The Firewall stands at the perimeter — filtering what enters and what leaves based on trusted rules.',
            'The Antivirus patrols the interior — scanning for known threats and quarantining anything it recognises.',
            'Encryption seals the Motherboard door — without the key, it does not exist to an attacker.',
            'And the IDS watches everything — raising the alarm the moment behaviour becomes suspicious.',
            'No single defence is enough. A firewall can be bypassed. An antivirus only knows old threats. Encryption can be stolen. An IDS can be fooled.',
            'But together — layered — they force an attacker to defeat every one of them in sequence. That is defence in depth.',
            'You are no longer an apprentice. You are a Guardian of Cipheria.'
        ],
        type: 'completion'
    },

    'quest-8-intro': {
        id: 'quest-8-intro',
        character: 'Elder',
        texts: [
            'Guardian — an encrypted transmission has been intercepted. It was sent to us deliberately. A taunt.',
            'The sender calls themselves the Architect. They claim to have already infiltrated Cipheria\'s three kingdoms and embedded their plan within each one.',
            'The message is split into three fragments, each written in a different kingdom\'s language. You will not be able to read them here.',
            'You must travel to each kingdom — the Purple, the Green, and the Yellow — and decode the fragments where their language becomes readable.',
            'Once all three are decoded, we can trace the signal back to its source and find the Architect.',
            'Be careful. This feels like an invitation. And invitations from enemies are rarely generous.'
        ],
        type: 'introduction',
        questToActivate: 'quest-8'
    },

    'quest-8-transmission': {
        id: 'quest-8-transmission',
        character: 'Elder',
        texts: [
            'Here is what was intercepted. Three fragments, each unreadable until you stand in the right kingdom.',
            'Fragment one carries the mark of the Purple Kingdom — Linux.',
            'Fragment two bears the Green Kingdom\'s seal — Windows.',
            'Fragment three is signed in the Yellow Kingdom\'s tongue — Mac.',
            'Travel to each. Decode what they have hidden. Then return to me.'
        ],
        type: 'interaction'
    },

    // ─── PURPLE KINGDOM — LINUX ───────────────────────────────────────────────────

    'quest-8-linux-arrival': {
        id: 'quest-8-linux-arrival',
        character: 'Elder',
        texts: [
            'You have entered the Purple Kingdom — the realm of Linux.',
            'Linux is the language of open systems. Transparent, powerful, and built on commands rather than clicks.',
            'Everything here is controlled through a terminal — a direct line to the kingdom\'s core.',
            'The fragment is readable now. Decode it.'
        ],
        type: 'interaction'
    },

    'quest-8-linux-puzzle-1': {
        id: 'quest-8-linux-puzzle-1',
        character: 'Elder',
        texts: [
            'The fragment reads: "The first step of my plan begins where all Linux journeys start."',
            'In Linux, every file path begins from a single point. What is it?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'The root directory — /',
                correct: true,
                response: 'Correct. In Linux, all file paths begin from /, the root. Everything in the system lives beneath it.'
            },
            {
                label: 'The home folder — /home',
                correct: false,
                response: 'Close, but /home is where user files live — not where all paths begin. The true root is /.'
            },
            {
                label: 'The desktop',
                correct: false,
                response: 'Linux does not organise around a desktop by default. Everything flows from the root directory — /.'
            },
            {
                label: 'The terminal window',
                correct: false,
                response: 'The terminal is how you interact with Linux — but the root of the file system is /. That is where all paths originate.'
            }
        ]
    },

    'quest-8-linux-puzzle-2': {
        id: 'quest-8-linux-puzzle-2',
        character: 'Elder',
        texts: [
            'The second line of the fragment: "I moved through the system silently — using the command that lists what hides in plain sight."',
            'What Linux command reveals hidden files?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'ls -a',
                correct: true,
                response: 'Correct. ls lists files, and the -a flag includes hidden files — those beginning with a dot. A common technique for concealing data.'
            },
            {
                label: 'ls',
                correct: false,
                response: 'ls lists visible files — but hidden files, those starting with a dot, are not shown without the -a flag.'
            },
            {
                label: 'find --hidden',
                correct: false,
                response: 'Not a standard Linux command. The correct tool for revealing hidden files in a directory is ls -a.'
            },
            {
                label: 'show -hidden',
                correct: false,
                response: 'This command does not exist in Linux. Hidden files are revealed with ls -a.'
            }
        ]
    },

    'quest-8-linux-puzzle-3': {
        id: 'quest-8-linux-puzzle-3',
        character: 'Elder',
        texts: [
            'The final line of the Linux fragment: "I granted myself the highest privilege — the one that lets me do anything."',
            'What is the highest privilege level in Linux called?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Root',
                correct: true,
                response: 'Correct. The root user in Linux has unrestricted access to every file, command, and system process. It is the most powerful account — and the most dangerous if compromised.'
            },
            {
                label: 'Admin',
                correct: false,
                response: 'Admin is a Windows concept. In Linux, the superuser is called root.'
            },
            {
                label: 'Sudo',
                correct: false,
                response: 'Sudo is a command that lets a permitted user run commands as root — but root is the privilege level itself, not sudo.'
            },
            {
                label: 'Superuser',
                correct: false,
                response: 'Superuser is another name for root — but in Linux the account itself is specifically called root. Close, but not precise enough.'
            }
        ]
    },

    'quest-8-linux-complete': {
        id: 'quest-8-linux-complete',
        character: 'Elder',
        texts: [
            'The Linux fragment is decoded. The Architect entered through the root, concealed files using hidden directories, and escalated their own privileges.',
            'This is a classic privilege escalation attack — gaining root access where it was never intended.',
            'In Linux, root access is powerful precisely because it is unrestricted. That is why it must be protected fiercely.',
            'Two fragments remain. Head to the Green Kingdom.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-8-1',
        questIdForObjective: 'quest-8'
    },

    // ─── GREEN KINGDOM — WINDOWS ──────────────────────────────────────────────────

    'quest-8-windows-arrival': {
        id: 'quest-8-windows-arrival',
        character: 'Elder',
        texts: [
            'Welcome to the Green Kingdom — the realm of Windows.',
            'Windows is built around graphical interfaces and a registry — a vast record of every setting, permission, and configuration in the kingdom.',
            'It is the most widely used system in Cipheria — which makes it the most frequently targeted.',
            'The fragment is readable here. Let us see what the Architect left behind.'
        ],
        type: 'interaction'
    },

    'quest-8-windows-puzzle-1': {
        id: 'quest-8-windows-puzzle-1',
        character: 'Elder',
        texts: [
            'The fragment reads: "In the Green Kingdom, I found the record of everything — and rewrote it to suit my needs."',
            'What is the central database of settings and configurations in Windows called?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'The Registry',
                correct: true,
                response: 'Correct. The Windows Registry stores configuration settings for the operating system, hardware, and applications. Attackers who manipulate it can persist across restarts and alter system behaviour invisibly.'
            },
            {
                label: 'The Control Panel',
                correct: false,
                response: 'The Control Panel is a graphical interface for settings — but the underlying data lives in the Registry.'
            },
            {
                label: 'The Task Manager',
                correct: false,
                response: 'Task Manager monitors running processes — it does not store configurations. The Registry is the central record.'
            },
            {
                label: 'System32',
                correct: false,
                response: 'System32 is a folder containing core Windows files — not the configuration database. That is the Registry.'
            }
        ]
    },

    'quest-8-windows-puzzle-2': {
        id: 'quest-8-windows-puzzle-2',
        character: 'Elder',
        texts: [
            'The second line: "I watched every process the kingdom was running — and hid mine among them."',
            'What Windows tool shows all currently running processes?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Task Manager',
                correct: true,
                response: 'Correct. Task Manager shows every running process, its resource usage, and allows termination. Attackers often disguise malicious processes with names similar to legitimate ones.'
            },
            {
                label: 'File Explorer',
                correct: false,
                response: 'File Explorer navigates files and folders — it does not show running processes. That is Task Manager.'
            },
            {
                label: 'The Registry Editor',
                correct: false,
                response: 'The Registry Editor manages configuration data — not live processes. Task Manager is the right tool.'
            },
            {
                label: 'Windows Defender',
                correct: false,
                response: 'Windows Defender is a security tool — it monitors for threats, but Task Manager shows the full list of running processes.'
            }
        ]
    },

    'quest-8-windows-puzzle-3': {
        id: 'quest-8-windows-puzzle-3',
        character: 'Elder',
        texts: [
            'The final Windows line: "I escalated my access using the kingdom\'s own permission system — without triggering a single alert."',
            'What is the Windows feature that prompts users before allowing system-level changes?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'User Account Control — UAC',
                correct: true,
                response: 'Correct. UAC prompts users to confirm before any action that requires elevated privileges. Attackers who bypass or disable UAC can make system changes silently.'
            },
            {
                label: 'Windows Firewall',
                correct: false,
                response: 'The Windows Firewall controls network traffic — not system-level permission prompts. That is UAC.'
            },
            {
                label: 'BitLocker',
                correct: false,
                response: 'BitLocker is Windows\'s disk encryption tool — not the permission system. UAC handles privilege escalation prompts.'
            },
            {
                label: 'Windows Update',
                correct: false,
                response: 'Windows Update manages system patches — not permissions. The Architect bypassed UAC to escalate silently.'
            }
        ]
    },

    'quest-8-windows-complete': {
        id: 'quest-8-windows-complete',
        character: 'Elder',
        texts: [
            'The Windows fragment is decoded. The Architect manipulated the Registry, disguised their processes among legitimate ones, and bypassed UAC to escalate silently.',
            'Windows is the most widely used system precisely because it is familiar — and attackers exploit that familiarity.',
            'Registry manipulation is particularly dangerous because changes can persist across restarts, making the infection extremely difficult to remove.',
            'One fragment remains. The Yellow Kingdom awaits.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-8-2',
        questIdForObjective: 'quest-8'
    },

    // ─── YELLOW KINGDOM — MAC ─────────────────────────────────────────────────────

    'quest-8-mac-arrival': {
        id: 'quest-8-mac-arrival',
        character: 'Elder',
        texts: [
            'The Yellow Kingdom — the realm of Mac.',
            'Mac shares roots with Linux — both are built on Unix. But Mac wraps that power in a polished surface, leading many to believe it is immune to attack.',
            'It is not. No system is.',
            'The final fragment is readable here. Decode it.'
        ],
        type: 'interaction'
    },

    'quest-8-mac-puzzle-1': {
        id: 'quest-8-mac-puzzle-1',
        character: 'Elder',
        texts: [
            'The fragment reads: "The Yellow Kingdom\'s citizens believe their walls are unbreakable. That belief was my greatest advantage."',
            'Why is the assumption that Mac cannot be attacked considered a security risk?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'It leads to less cautious behaviour and fewer defences',
                correct: true,
                response: 'Correct. Overconfidence is a vulnerability in itself. Users who believe they are immune are less likely to update software, question suspicious links, or install security tools — making them easier targets.'
            },
            {
                label: 'Mac is actually less secure than Windows',
                correct: false,
                response: 'Neither is inherently more secure — both have vulnerabilities. The real risk is the false belief that either is immune.'
            },
            {
                label: 'Mac has no security features at all',
                correct: false,
                response: 'Mac has strong built-in security features — Gatekeeper, XProtect, and sandboxing among them. The risk is assuming those features make attack impossible.'
            },
            {
                label: 'It is not a risk — Mac genuinely cannot be hacked',
                correct: false,
                response: 'No system is unhackable. Mac has been successfully targeted many times. The belief that it cannot be is precisely what makes users vulnerable.'
            }
        ]
    },

    'quest-8-mac-puzzle-2': {
        id: 'quest-8-mac-puzzle-2',
        character: 'Elder',
        texts: [
            'The second line: "I entered through a trusted application — one the kingdom had granted permission to run freely."',
            'What Mac security feature is designed to prevent unauthorised applications from running?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Gatekeeper',
                correct: true,
                response: 'Correct. Gatekeeper checks that applications are from identified developers and have not been tampered with. The Architect bypassed it by disguising their tool as a trusted app.'
            },
            {
                label: 'Spotlight',
                correct: false,
                response: 'Spotlight is Mac\'s search feature — not a security gate. Gatekeeper controls which applications are permitted to run.'
            },
            {
                label: 'Time Machine',
                correct: false,
                response: 'Time Machine is Mac\'s backup tool. Application permission control belongs to Gatekeeper.'
            },
            {
                label: 'Finder',
                correct: false,
                response: 'Finder is the file navigation interface — not a security control. Gatekeeper is the feature that governs application trust.'
            }
        ]
    },

    'quest-8-mac-puzzle-3': {
        id: 'quest-8-mac-puzzle-3',
        character: 'Elder',
        texts: [
            'The final line: "I left a trace — buried in the place where Mac records everything that happens."',
            'Where does Mac store system and application logs?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Console — the system log viewer',
                correct: true,
                response: 'Correct. The Console app reads system logs generated by macOS and applications. Forensic investigators use logs to trace exactly what happened and when — including what the Architect left behind.'
            },
            {
                label: 'The Trash',
                correct: false,
                response: 'The Trash holds deleted files — not system logs. Logs are accessible through the Console application.'
            },
            {
                label: 'System Preferences',
                correct: false,
                response: 'System Preferences manages settings — not logs. The Console app is where system events are recorded.'
            },
            {
                label: 'Activity Monitor',
                correct: false,
                response: 'Activity Monitor shows live resource usage — not a record of past events. System logs live in the Console.'
            }
        ]
    },

    'quest-8-mac-complete': {
        id: 'quest-8-mac-complete',
        character: 'Elder',
        texts: [
            'The final fragment is decoded. The Architect exploited misplaced trust, bypassed Gatekeeper with a disguised application, and left traces in the system logs.',
            'The logs are our key. They recorded the signal — every system does, if you know where to look.',
            'All three fragments are decoded. Return to me. We can trace the Architect now.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-8-3',
        questIdForObjective: 'quest-8'
    },

    // ─── TRACE & CONFRONTATION ────────────────────────────────────────────────────

    'quest-8-trace-intro': {
        id: 'quest-8-trace-intro',
        character: 'Elder',
        texts: [
            'All three fragments together reveal a pattern — a sequence of commands, a method, and most importantly, a location.',
            'The Architect left a return signal embedded in each message. They wanted to be found.',
            'The signal traces back to the Null Domain — the same corrupted realm where we faced the first attacks.',
            'They are waiting for you. This was always their intention.',
            'Go. But remember everything you have learned. This will not be a simple confrontation.'
        ],
        type: 'interaction'
    },

    'quest-8-architect-confrontation': {
        id: 'quest-8-architect-confrontation',
        character: 'badguy',
        texts: [
            'So. You decoded my fragments. I am almost impressed.',
            'I wanted you to find me. I wanted you to see exactly what I did — and realise you still cannot stop me.',
            'I know every kingdom\'s language. I know every weakness. I have been inside your systems since before you became a Guardian.',
            'And you still do not know the most important thing: I am not alone.',
            'Catch me if you can.'
        ],
        type: 'interaction'
    },

    'quest-8-architect-riddle': {
        id: 'quest-8-architect-riddle',
        character: 'badguy',
        texts: [
            'Before you try to stop me — answer me this.',
            'I moved through three kingdoms, spoke three languages, hid in plain sight, and escalated my own privileges. What single principle, if followed, would have slowed me down the most?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'Principle of Least Privilege',
                correct: true,
                response: 'Correct. If every user and process had only the minimum access needed — nothing more — privilege escalation becomes far harder. Most of my path depended on permissions that should never have existed.'
            },
            {
                label: 'Using stronger passwords',
                correct: false,
                response: 'Passwords matter — but I never needed yours. I escalated through system vulnerabilities and misconfigurations. Least privilege would have stopped me far earlier.'
            },
            {
                label: 'Installing more antivirus software',
                correct: false,
                response: 'I disguised my processes among legitimate ones. More antivirus helps — but without restricting what I could access in the first place, it only slows me down.'
            },
            {
                label: 'Shutting down all three kingdoms',
                correct: false,
                response: 'Availability is one of the CIA Triad. Shutting everything down is not defence — it is surrender. Least privilege would have contained me without that cost.'
            }
        ]
    },

    'quest-8-architect-caught': {
        id: 'quest-8-architect-caught',
        character: 'Elder',
        texts: [
            'The Architect is cornered. But listen to what they said — they are not alone.',
            'This was one thread of a larger web. Cipheria\'s work is not finished.',
            'But today — you tracked an attacker across three kingdoms, decoded their methods, and identified the principle that would have stopped them.',
            'That is not the work of an apprentice. That is the work of a Guardian.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-8-4',
        questIdForObjective: 'quest-8'
    },

    // ─── WRAPUP ───────────────────────────────────────────────────────────────────

    'quest-8-wrapup': {
        id: 'quest-8-wrapup',
        character: 'Elder',
        texts: [
            'Three kingdoms. Three languages. One attacker who knew them all.',
            'Linux — the open system, powerful and transparent, where the root user commands everything and hidden files conceal secrets.',
            'Windows — the most widely used realm, where the Registry holds every configuration and UAC stands between a user and full system control.',
            'Mac — the polished surface over Unix foundations, protected by Gatekeeper, but vulnerable to the belief that it needs no protection at all.',
            'The Architect exploited each one differently — because each has its own strengths, its own weaknesses, and its own language.',
            'A Guardian must speak all of them.',
            'And the principle that underpins them all — Least Privilege. Give no account, no process, no application more access than it needs. Ever.',
            'The Architect is contained. But they were right about one thing — they are not alone. Cipheria\'s fight continues.'
        ],
        type: 'completion'
    },

        // ─── QUEST 9 ─────────────────────────────────────────────────────────────────

    'quest-9-intro': {
        id: 'quest-9-intro',
        character: 'Elder',
        texts: [
            'Something has appeared on the Motherboard — a distress signal, but written in a way none of us can read.',
            'I believe it may come from one of the missing Guardians who travelled into the Null Domain to pursue Cipheria\'s most dangerous criminals.',
            'They were never seen again. Until now.',
            'We must decode this message. If the Guardian is alive, we need to find them — and fast.',
            'Approach the Motherboard terminal. The signal is strongest there.'
        ],
        type: 'introduction',
        questToActivate: 'quest-9'
    },

    // ─── EXCHANGE 1 — CAESAR (shift 3) ───────────────────────────────────────────

    'quest-9-exchange-1-intro': {
        id: 'quest-9-exchange-1-intro',
        character: 'Elder',
        texts: [
            'The first message has appeared on the terminal. It is scrambled — each letter shifted from its original position.',
            'This is a Caesar cipher. The sender has shifted every letter by a fixed number of places in the alphabet.',
            'Rotate the cipher wheel until the message becomes readable. When the shift is correct, the decoded message will appear.',
            'Encoded message: WKH JXDUGLDQ LV DOLYH'
        ],
        type: 'interaction'
    },

    'quest-9-exchange-1-reveal': {
        id: 'quest-9-exchange-1-reveal',
        character: 'Elder',
        texts: [
            'THE GUARDIAN IS ALIVE.',
            'They are out there. The signal is confirmed — this is no forgery.',
            'But alive does not mean safe. We need to know where they are.',
            'A second message is forming on the terminal. This one looks different — dots and dashes.'
        ],
        type: 'interaction'
    },

    // ─── EXCHANGE 2 — MORSE ───────────────────────────────────────────────────────

    'quest-9-exchange-2-intro': {
        id: 'quest-9-exchange-2-intro',
        character: 'Elder',
        texts: [
            'The second message uses Morse code — a system of dots and dashes representing letters.',
            'Use the reference panel on screen to decode each symbol sequence.',
            'Encoded message: .. / .- -- / .. -. / - .... . / -. ..- .-.. .-.. / -.. --- -- .- .. -.',
            'Each group separated by a slash represents one letter. A double slash marks a space between words.'
        ],
        type: 'interaction'
    },

    'quest-9-morse-choice': {
        id: 'quest-9-morse-choice',
        character: 'Elder',
        texts: [
            'Using the Morse reference on screen, what does the message decode to?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'I AM IN THE NULL DOMAIN',
                correct: true,
                response: 'Correct. The Guardian is inside the Null Domain — the most corrupted region in Cipheria. We must reach them before the criminals do.'
            },
            {
                label: 'THEY HAVE FOUND MY LOCATION',
                correct: false,
                response: 'That is not right — work through each symbol group carefully using the reference.'
            },
            {
                label: 'THE CRYSTAL HAS BEEN TAKEN',
                correct: false,
                response: 'Not quite — re-check the dot and dash sequences against the Morse alphabet.'
            }
        ]
    },

    'quest-9-exchange-2-reveal': {
        id: 'quest-9-exchange-2-reveal',
        character: 'Elder',
        texts: [
            'The Null Domain. Of course.',
            'That is where the final criminals retreated after the Architect was captured. They know the terrain — the Guardian would have followed them in.',
            'We know they are alive. We know where they are. But we still do not know who is holding them.',
            'A third message is arriving. This one is unlike anything I have seen before — ones and zeros.'
        ],
        type: 'interaction'
    },

    // ─── EXCHANGE 3 — BINARY ──────────────────────────────────────────────────────

    'quest-9-exchange-3-intro': {
        id: 'quest-9-exchange-3-intro',
        character: 'Elder',
        texts: [
            'The third message is written in binary — the base language of all digital systems.',
            'Each group of eight digits represents one letter. Match each group to its character using the ASCII reference on screen.',
            'Encoded message: 01000011 01001111 01010010 01000101',
            'Four groups. Four letters. Take your time.'
        ],
        type: 'interaction'
    },

    'quest-9-binary-choice': {
        id: 'quest-9-binary-choice',
        character: 'Elder',
        texts: [
            'Using the ASCII reference on screen, what do the four binary groups decode to?'
        ],
        type: 'interaction',
        choices: [
            {
                label: 'CORE',
                correct: true,
                response: 'Correct. CORE — the corrupted heart of the Null Domain. That is where the Guardian is being held.'
            },
            {
                label: 'CODE',
                correct: false,
                response: 'Close — but check the third group again. 01010010 maps to R, not D.'
            },
            {
                label: 'DOOR',
                correct: false,
                response: 'Not quite — work through each 8-bit group against the ASCII table carefully.'
            }
        ]
    },

    'quest-9-exchange-3-reveal': {
        id: 'quest-9-exchange-3-reveal',
        character: 'Elder',
        texts: [
            'The CORE. The deepest, most unstable part of the Null Domain.',
            'No Guardian has ever returned from the Core. That is where the final criminals made their stronghold.',
            'One more message is forming. The Guardian is sending us something final — the names of who is holding them.',
            'This last cipher is the most complex. A harder Caesar shift. They are making sure only someone who truly understands cryptography can read it.'
        ],
        type: 'interaction'
    },

    // ─── EXCHANGE 4 — CAESAR (shift 13, ROT13) ───────────────────────────────────

    'quest-9-exchange-4-intro': {
        id: 'quest-9-exchange-4-intro',
        character: 'Elder',
        texts: [
            'The final message. Another Caesar cipher — but this time the shift is different.',
            'The Guardian is being careful. If this message is intercepted, it must not be easy to read.',
            'Rotate the wheel until the message decodes. The shift will not be the same as before.',
            'Encoded message: ABEGJ GBJRE'
        ],
        type: 'interaction'
    },

    'quest-9-exchange-4-reveal': {
        id: 'quest-9-exchange-4-reveal',
        character: 'Elder',
        texts: [
            'NORTH TOWER.',
            'That is the location within the Core where the Guardian is being held.',
            'Now we have everything — they are alive, they are in the Null Domain, in the Core, at the North Tower.',
            'Prepare yourself. What awaits there will be unlike anything you have faced.',
            'The Guardian waited for someone capable enough to decode their messages. You proved you are that person.',
            'Go. Bring them home.'
        ],
        type: 'interaction',
        objectiveToComplete: 'obj-10-4',
        questIdForObjective: 'quest-10'
    },

    // ─── WRAPUP ───────────────────────────────────────────────────────────────────

    'quest-9-wrapup': {
        id: 'quest-9-wrapup',
        character: 'Elder',
        texts: [
            'You decoded four messages across four different cipher systems — and each one brought us closer to the Guardian.',
            'The Caesar cipher shifts every letter by a fixed number. Simple — but effective if the receiver knows the key.',
            'Morse code translates letters into sequences of dots and dashes — a communication standard used for over a century, and still the basis of many encoding concepts today.',
            'Binary is the foundation of all digital communication. Every piece of data your computer processes begins as ones and zeros.',
            'Cryptography is not just a technical tool — it is the language of secure communication. Every time you log in, send a message, or make a payment, encryption is working on your behalf.',
            'The Guardian is safe. The final criminals know you are coming.',
            'Cipheria\'s last battle is ahead.'
        ],
        type: 'completion'
    },
}

export type DialogueType = 'introduction' | 'completion' | 'tutorial' | 'interaction'