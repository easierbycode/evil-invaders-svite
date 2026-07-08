import type Phaser from 'phaser'

/**
 * phaserJuice scene plugin (https://github.com/RetroVX/phaserJuice).
 * Registered via the game config and mapped onto scenes as `scene.juice`.
 */
export default class phaserJuice extends Phaser.Plugins.ScenePlugin {
  add(target: Phaser.GameObjects.GameObject): this
  shake(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  shakeY(target?: Phaser.GameObjects.GameObject): void
  wobble(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  scaleUp(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  scaleDown(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  pulse(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  flash(target?: Phaser.GameObjects.GameObject, duration?: number, color?: string): this
  rotate(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  bounce(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  fadeIn(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  fadeOut(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  fadeInOut(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  flipX(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  flipY(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  spinX(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  spinY(target?: Phaser.GameObjects.GameObject, config?: object, destroy?: boolean): this
  reset(target?: Phaser.GameObjects.GameObject): this
}
