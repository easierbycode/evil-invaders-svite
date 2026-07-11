<script lang="ts">
  import type Phaser from 'phaser'
  import { onMount } from 'svelte'
  import {
    Sprite,
    ArcadePhysics,
    ArcadeCollider,
    getScene,
  } from '5velte-ph4ser'
  import Explosion from './Explosion.svelte'

  interface Props {
    name: string
    target: string
    texture: string
    depth?: number
    x: number
    y: number
    velocityX?: number
    velocityY?: number
    onDestroy: () => void
  }

  let {
    name,
    target,
    texture,
    depth = 10,
    x,
    y,
    velocityX = 0,
    velocityY = 0,
    onDestroy,
  }: Props = $props()

  let instance: Phaser.GameObjects.Sprite | undefined = $state()
  let destroyed = $state(false)
  let destroyedPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 })
  let explosionAnimation = $state('')

  const scene = getScene()

  let destroyTimer = scene.time.addEvent({
    callback: () => {
      if (!destroyed) {
        onDestroy()
      }
    },
    delay: 3000,
  })

  onMount(() => () => destroyTimer.destroy())
</script>

{#if destroyed}
  <Explosion
    animation={explosionAnimation}
    x={destroyedPosition.x}
    y={destroyedPosition.y - 32}
    onanimationcomplete={() => onDestroy()}
  />
{:else}
  <Sprite
    animation={name === 'enemyBullet' ? 'anims/enemyBullet/default' : name === 'flirtyGirlBullet' ? 'anims/kissBullet/default' : 'anims/bullet/default'}
    bind:instance
    {depth}
    {name}
    {texture}
    {x}
    {y}
    scale={name === 'flirtyGirlBullet' ? 0.5 : 1}
  >
    <ArcadeCollider
      with={target}
      overlapOnly
      oncollide={({ other }) => {

        const destroyedEnemyType = (other as Phaser.GameObjects.Sprite).texture.key

        if ( destroyedEnemyType === 'textures/flirty-girl' )  return onDestroy();

        destroyed = true
        explosionAnimation = destroyedEnemyType.replace( 'textures', 'anims' ) + '/explosion'
        destroyedPosition = { x: instance!.x, y: instance!.y }
      }}
    />
    <ArcadePhysics {velocityY} {velocityX} />
  </Sprite>
{/if}
