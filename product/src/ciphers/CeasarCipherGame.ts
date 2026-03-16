import Phaser from "phaser";
import type { CipherConfig } from "./CipherManager";

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const OUTER_R = 160;
const INNER_R = 110;
const HUB_R = 40;
const DEPTH = 2000;

export class CaesarCipherGame {
    private scene: Phaser.Scene;
    private config: CipherConfig;
    private allObjects: Phaser.GameObjects.GameObject[] = [];
    private outerGraphics!: Phaser.GameObjects.Graphics;
    private innerGraphics!: Phaser.GameObjects.Graphics;
    private hubGraphics!: Phaser.GameObjects.Graphics;
    private outerLabels: Phaser.GameObjects.Text[] = [];
    private innerLabels: Phaser.GameObjects.Text[] = [];
    private hubText!: Phaser.GameObjects.Text;
    private decodedText!: Phaser.GameObjects.Text;
    private feedbackText!: Phaser.GameObjects.Text;

    private outerAngle = 0;
    private isDragging = false;
    private lastPointerAngle = 0;
    private cx = 0;
    private cy = 0;

    constructor(scene: Phaser.Scene, config: CipherConfig) {
        this.scene = scene;
        this.config = config;
    }

    start(): void {
        const { width, height } = this.scene.scale;
        this.cx = width / 2;
        this.cy = height / 2 - 50;

        const overlay = this.scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.80)
            .setScrollFactor(0).setDepth(DEPTH - 1).setInteractive();
        this.allObjects.push(overlay);

        this.add(this.scene.add.text(width / 2, 28, 'Caesar Cipher Wheel', {
            fontSize: '20px', color: '#ccccff', fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH));

        this.add(this.scene.add.text(width / 2, 58, 'Drag the outer ring to rotate. Match the shift until the message decodes.', {
            fontSize: '13px', color: '#888888'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH));

        this.add(this.scene.add.text(width / 2, 82, `Encoded: ${this.config.encoded}`, {
            fontSize: '14px', color: '#aaaaaa', fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH));

        // Prompt: How do I make two overlapping rings, with the outer ring being rotated by the user like a ceasar cipher, for the player to be able to decode a message
        this.innerGraphics = this.scene.add.graphics().setScrollFactor(0).setDepth(DEPTH);
        this.outerGraphics = this.scene.add.graphics().setScrollFactor(0).setDepth(DEPTH);
        this.hubGraphics = this.scene.add.graphics().setScrollFactor(0).setDepth(DEPTH + 1);
        this.allObjects.push(this.innerGraphics, this.outerGraphics, this.hubGraphics);

        for (let i = 0; i < 26; i++) {
            const angle = (i / 26) * Math.PI * 2 - Math.PI / 2 + Math.PI / 26;
            const t = this.scene.add.text(
                this.cx + (INNER_R - 22) * Math.cos(angle),
                this.cy + (INNER_R - 22) * Math.sin(angle),
                ALPHA[i],
                { fontSize: '12px', color: '#888888' }
            ).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH + 1);
            this.innerLabels.push(t);
            this.allObjects.push(t);
        }

        for (let i = 0; i < 26; i++) {
            const t = this.scene.add.text(0, 0, ALPHA[i], {
                fontSize: '13px', color: '#ccccff', fontStyle: 'bold'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH + 1);
            this.outerLabels.push(t);
            this.allObjects.push(t);
        }

        this.hubText = this.scene.add.text(this.cx, this.cy, '0', {
            fontSize: '22px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH + 2);
        this.allObjects.push(this.hubText);

        this.add(this.scene.add.text(width / 2, this.cy + OUTER_R + 40, 'Decoded:', {
            fontSize: '13px', color: '#666666'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH));

        this.decodedText = this.scene.add.text(width / 2, this.cy + OUTER_R + 62, '—', {
            fontSize: '16px', color: '#ffffff', fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH);
        this.allObjects.push(this.decodedText);

        
        const submitBtn = this.scene.add.text(width / 2, this.cy + OUTER_R + 98, '[ Submit Answer ]', {
            fontSize: '15px', color: '#aaaaff',
            backgroundColor: '#1a1a4e',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH).setInteractive({ useHandCursor: true });
        submitBtn.on('pointerover', () => submitBtn.setColor('#ffffff'));
        submitBtn.on('pointerout', () => submitBtn.setColor('#aaaaff'));
        submitBtn.on('pointerdown', () => this.onSubmit());
        this.allObjects.push(submitBtn);
        //end of prompt

        this.feedbackText = this.scene.add.text(width / 2, this.cy + OUTER_R + 135, '', {
            fontSize: '13px', color: '#00ff88'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH);
        this.allObjects.push(this.feedbackText);

        const closeBtn = this.scene.add.text(width - 30, 22, '✕', {
            fontSize: '18px', color: '#666666'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => {
            this.scene.events.emit('cipher-failed', { type: 'caesar' });
            this.destroy();
        });
        this.allObjects.push(closeBtn);

        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);

        this.redraw();
    }

    private redraw(): void {
        this.drawRings();
        this.updateOuterLabels();
        const shift = this.getShift();
        this.hubText.setText(String(shift));
        this.decodedText.setText(this.decode(shift));
    }

    private drawRings(): void {
        this.innerGraphics.clear();
        this.outerGraphics.clear();
        this.hubGraphics.clear();

        for (let i = 0; i < 26; i++) {
            const a0 = this.outerAngle + (i / 26) * Math.PI * 2 - Math.PI / 2;
            const a1 = this.outerAngle + ((i + 1) / 26) * Math.PI * 2 - Math.PI / 2;
            this.outerGraphics.fillStyle(0x26215c, 1);
            this.outerGraphics.beginPath();
            this.outerGraphics.moveTo(this.cx, this.cy);
            this.outerGraphics.arc(this.cx, this.cy, OUTER_R, a0, a1);
            this.outerGraphics.closePath();
            this.outerGraphics.fillPath();
            this.outerGraphics.lineStyle(0.5, 0x7f77dd, 1);
            this.outerGraphics.strokePath();
        }

        for (let i = 0; i < 26; i++) {
            const a0 = (i / 26) * Math.PI * 2 - Math.PI / 2;
            const a1 = ((i + 1) / 26) * Math.PI * 2 - Math.PI / 2;
            this.innerGraphics.fillStyle(0x2c2c2a, 1);
            this.innerGraphics.beginPath();
            this.innerGraphics.moveTo(this.cx, this.cy);
            this.innerGraphics.arc(this.cx, this.cy, INNER_R, a0, a1);
            this.innerGraphics.closePath();
            this.innerGraphics.fillPath();
            this.innerGraphics.lineStyle(0.5, 0x534ab7, 0.6);
            this.innerGraphics.strokePath();
        }

        this.hubGraphics.fillStyle(0x3c3489, 1);
        this.hubGraphics.beginPath();
        this.hubGraphics.arc(this.cx, this.cy, HUB_R, 0, Math.PI * 2);
        this.hubGraphics.fillPath();

        this.outerGraphics.fillStyle(0x7f77dd, 1);
        this.outerGraphics.fillTriangle(
            this.cx, this.cy - OUTER_R - 4,
            this.cx - 7, this.cy - OUTER_R + 12,
            this.cx + 7, this.cy - OUTER_R + 12
        );
    }

    private updateOuterLabels(): void {
        for (let i = 0; i < 26; i++) {
            const angle = this.outerAngle + (i / 26) * Math.PI * 2 - Math.PI / 2 + Math.PI / 26;
            this.outerLabels[i].setPosition(
                this.cx + (OUTER_R - 22) * Math.cos(angle),
                this.cy + (OUTER_R - 22) * Math.sin(angle)
            );
        }
    }

    private getShift(): number {
        const deg = ((this.outerAngle * 180 / Math.PI) % 360 + 360) % 360;
        return Math.round(deg / (360 / 26)) % 26;
    }

    private decode(shift: number): string {
        return this.config.encoded.split('').map(c => {
            if (c === ' ') return ' ';
            const idx = ALPHA.indexOf(c.toUpperCase());
            if (idx === -1) return c;
            return ALPHA[(idx - shift + 26) % 26];
        }).join('');
    }

    private getPointerAngle(pointer: Phaser.Input.Pointer): number {
        return Math.atan2(pointer.y - this.cy, pointer.x - this.cx);
    }

    private isOnOuterRing(pointer: Phaser.Input.Pointer): boolean {
        const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.cx, this.cy);
        return dist >= INNER_R && dist <= OUTER_R;
    }

    private onPointerDown(pointer: Phaser.Input.Pointer): void {
        if (!this.isOnOuterRing(pointer)) return;
        this.isDragging = true;
        this.lastPointerAngle = this.getPointerAngle(pointer);
    }

    private onPointerMove(pointer: Phaser.Input.Pointer): void {
        if (!this.isDragging) return;
        const angle = this.getPointerAngle(pointer);
        this.outerAngle += angle - this.lastPointerAngle;
        this.lastPointerAngle = angle;
        this.redraw();
    }

    private onPointerUp(): void {
        this.isDragging = false;
    }

    private onSubmit(): void {
        const shift = this.getShift();
        const decoded = this.decode(shift);
        if (decoded.trim() === this.config.answer.trim()) {
            this.feedbackText.setText('Correct! Message decoded.').setColor('#00ff88');
            this.scene.time.delayedCall(1500, () => {
                this.scene.events.emit('cipher-complete', { type: 'caesar', decoded });
                this.destroy();
            });
        } else {
            this.feedbackText.setText('Not quite — keep rotating the outer ring.').setColor('#ff4444');
        }
    }

    private add(obj: Phaser.GameObjects.GameObject): void {
        this.allObjects.push(obj);
    }

    destroy(): void {
        this.scene.input.off('pointerdown', this.onPointerDown, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.allObjects.forEach(o => o.destroy());
        this.allObjects = [];
        this.outerLabels = [];
        this.innerLabels = [];
    }
}