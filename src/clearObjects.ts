import type Phaser from 'phaser'

export function clearObjects(
    scene: Phaser.Scene
) {

    // Loop from the end
    let i = scene.children.length - 1
    while (i >= 0) {
        // Get child
        let child = scene.children.list[i]

        // Check for image or sprite
        if (
            child.type === 'Image' ||
            child.type === 'ParticleEmitter' ||
            child.type === 'Sprite' ||
            child.type === 'Text' ||
            child.type === 'TileSprite'
        ) {
            // Remove child
            child.destroy()
            // Remove all its tweens
            scene.tweens.killTweensOf(child)
        }
        // Decrement
        i--
    }
}
