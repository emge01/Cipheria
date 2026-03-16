import Phaser from "phaser";

type AnimationConfig = {
    key: string;
    action: string;
    startFrame: number;
    endFrame: number;
    frameRate: number;
}

//Handles animations
export class AnimationManager {
    static createFromConfig(scene: Phaser.Scene, config: any): void {
        const animations = this.flattenAnimations(config);

        animations.forEach(anim => {
            if (!scene.anims.exists(anim.key)) {
                scene.anims.create({
                    key: anim.key,
                    frames: scene.anims.generateFrameNumbers(anim.action, {
                        start: anim.startFrame,
                        end: anim.endFrame
                    }),
                    frameRate: anim.frameRate,
                    repeat: anim.key.includes('attack') || anim.key.includes('death') ? 0 : -1
                });
            }
        });
    }

    private static flattenAnimations(config: any): AnimationConfig[] {
        const results: AnimationConfig[] = [];

        const recurse = (obj: any) => {
            Object.values(obj).forEach(value => {
                if (value && typeof value === "object") {
                    if ("key" in value) {
                        results.push(value as AnimationConfig);
                    } else {
                        recurse(value);
                    }
                }
            });
        };

        recurse(config);
        return results;
    }

    static play(sprite:Phaser.Physics.Arcade.Sprite, key:string): void {
        sprite.play(key, true);
    }

    static stopOnFirstFrame(sprite:Phaser.Physics.Arcade.Sprite): void {
        sprite.anims.stop();
        const currentAnim = sprite.anims.currentAnim;
        if (currentAnim) {
            sprite.setFrame(currentAnim.frames[0].frame.name);
        }
    }
}