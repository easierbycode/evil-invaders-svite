import type Phaser from 'phaser'
import { writable, derived } from 'svelte/store'

export const score = writable(0)
export const lives = writable(3)
export const coins = writable(0)

export const currentLevel = writable(0)
export const enemiesDefeated = writable(false)
export const sceneRestarting = writable(false)
export let gamepad = writable<Partial<Phaser.Input.Gamepad.Gamepad>>({})

export const gameStatus = derived(
  [lives, enemiesDefeated],
  ([$lives, $enemiesDefeated]) => {
    if ($lives <= 0) {
      return 'gameover'
    }

    if ($enemiesDefeated) {
      return 'win'
    }

    return 'playing'
  }
)

export const reset = () => {
  score.set(0)
  lives.set(3)
}
