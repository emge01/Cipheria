import Phaser from "phaser";

const DEPTH = 1500;

const MORSE_MAP: Record<string, string> = {
    A: '.-',   B: '-...', C: '-.-.', D: '-..',  E: '.',
    F: '..-.', G: '--.',  H: '....', I: '..',   J: '.---',
    K: '-.-',  L: '.-..', M: '--',   N: '-.',   O: '---',
    P: '.--.', Q: '--.-', R: '.-.',  S: '...',  T: '-',
    U: '..-',  V: '...-', W: '.--',  X: '-..-', Y: '-.--',
    Z: '--..'
};

const ASCII_ROWS = [
    'A=01000001  B=01000010  C=01000011  D=01000100  E=01000101',
    'F=01000110  G=01000111  H=01001000  I=01001001  J=01001010',
    'K=01001011  L=01001100  M=01001101  N=01001110  O=01001111',
    'P=01010000  Q=01010001  R=01010010  S=01010011  T=01010100',
    'U=01010101  V=01010110  W=01010111  X=01011000  Y=01011001',
    'Z=01011010',
];

export type ReferenceType = 'morse' | 'binary';

export class ReferencePanel {
    private scene: Phaser.Scene;
    private objects: Phaser.GameObjects.GameObject[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    show(type: ReferenceType): void {
        this.hide();
        type === 'morse' ? this.buildMorse() : this.buildBinary();
    }

    private buildMorse(): void {
        const entries = Object.entries(MORSE_MAP);
        const cols = 3;
        const colH = Math.ceil(entries.length / cols);
        const colW = 110;
        const padding = 12;
        const rowH = 18;
        const panelW = cols * colW + padding * 2;
        const panelH = colH * rowH + 44;

        const { width } = this.scene.scale;
        const x = width - panelW - 10;
        const y = 10;

        this.addPanel(x, y, panelW, panelH);

        this.add(this.scene.add.text(x + padding, y + padding, 'Morse reference', {
            fontSize: '12px', color: '#7f77dd'
        }).setScrollFactor(0).setDepth(DEPTH + 1));

        entries.forEach(([letter, code], i) => {
            const col = Math.floor(i / colH);
            const row = i % colH;
            this.add(this.scene.add.text(
                x + padding + col * colW,
                y + 28 + row * rowH,
                `${letter}: ${code}`,
                { fontSize: '11px', color: '#9999bb', fontFamily: 'monospace' }
            ).setScrollFactor(0).setDepth(DEPTH + 1));
        });
    }

    private buildBinary(): void {
        const padding = 12;
        const rowH = 20;
        const panelW = 380;
        const panelH = ASCII_ROWS.length * rowH + 44;

        const { width } = this.scene.scale;
        const x = width - panelW - 10;
        const y = 10;

        this.addPanel(x, y, panelW, panelH);

        this.add(this.scene.add.text(x + padding, y + padding, 'ASCII reference (8-bit)', {
            fontSize: '12px', color: '#7f77dd'
        }).setScrollFactor(0).setDepth(DEPTH + 1));

        ASCII_ROWS.forEach((row, i) => {
            this.add(this.scene.add.text(
                x + padding,
                y + 28 + i * rowH,
                row,
                { fontSize: '11px', color: '#9999bb', fontFamily: 'monospace' }
            ).setScrollFactor(0).setDepth(DEPTH + 1));
        });
    }

    private addPanel(x: number, y: number, w: number, h: number): void {
        this.add(
            this.scene.add.rectangle(x + w / 2, y + h / 2, w, h, 0x0d0d1a, 0.93)
                .setStrokeStyle(0.5, 0x534ab7)
                .setScrollFactor(0).setDepth(DEPTH)
        );
    }

    private add(obj: Phaser.GameObjects.GameObject): void {
        this.objects.push(obj);
    }

    hide(): void {
        this.objects.forEach(o => o.destroy());
        this.objects = [];
    }
}