<script lang="ts">
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { getScene, onGameEvent, Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'
  import Coin from './Coin.svelte'

  const scene = getScene()

  interface Props {
    animation: string
    x: number
    y: number
    velocityX: number
    onDie: (score?: number) => void
  }

  let { animation, x, y, velocityX, onDie }: Props = $props()

  let instance: Phaser.GameObjects.Sprite | undefined = $state()

  let destroyed = $state(false)

  const explodeConfig = (
    overrides: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {}
  ): Phaser.Types.GameObjects.Particles.ParticleEmitterConfig => ({
    frequency: -1,
    blendMode: Phaser.BlendModes.ADD,
    gravityY: 600,
    alpha: {
      start: 1,
      end: 0,
      ease: 'Cubic.easeIn',
    },
    lifespan: 500,
    angle: {
      min: -180,
      max: 180,
    },
    speed: {
      min: 0,
      max: 2400,
    },
    scale: {
      min: 0.4,
      max: 0.6,
    },
    frame: [0, 1, 2],
    ...overrides,
  })

  // enemy explosion particle emitters (Phaser 4: scene.add.particles returns
  // the emitter directly; frequency -1 makes it explode-only)
  const emitter = scene.add.particles(0, 0, 'textures/enemy/particles', explodeConfig())
  const emitterSilver = scene.add.particles(0, 0, 'textures/enemy-silver/particles', explodeConfig())

  const emitterFlirtyGirl = scene.add.particles(0, 0, 'textures/flirty-girl/particles', explodeConfig({
    speed: { min: 0, max: 600 },
    scale: undefined,
    frame: [0],
  }))

  const emitterFlirtyGirl2 = scene.add.particles(0, 0, 'textures/flirty-girl/particles', explodeConfig({
    speed: { min: 0, max: 600 },
    scale: undefined,
    frame: [1],
  }))

  onMount(() => () => {
    emitter.destroy()
    emitterSilver.destroy()
    emitterFlirtyGirl.destroy()
    emitterFlirtyGirl2.destroy()
  })

  onGameEvent('step', () => {
      if (instance && instance.y > 600) {
          onDie( 0 )
      }
  })

  const getWidth = ( anim: string ) => {
    switch( anim ) {
      case 'anims/flyBrain/fly':
        return 32;
      case 'anims/enemy/fly':
      case 'anims/enemySilver/fly':
        return 33;
      case 'anims/flirtyGirl/default':
        return 26;
      case 'anims/ufo/fly':
        return 32;
      default:
        return 26;
    }
  }

  const getHeight = ( anim: string ) => {
    switch( anim ) {
      case 'anims/flyBrain/fly':
        return 32;
      case 'anims/enemy/fly':
      case 'anims/enemySilver/fly':
        return 24;
      case 'anims/flirtyGirl/default':
        return 24;
      case 'anims/ufo/fly':
        return 24;
      default:
        return 24;
    }
  }

  const getOffsetX = ( anim: string ) => {
    switch( anim ) {
      case 'anims/flyBrain/fly':
        return 0;
      case 'anims/enemy/fly':
      case 'anims/enemySilver/fly':
        return 23;
      case 'anims/flirtyGirl/default':
        return 4;
      case 'anims/ufo/fly':
        return 0;
      default:
        return 0;
    }
  }

  const getOffsetY = ( anim: string ) => {
    switch( anim ) {
      case 'anims/flyBrain/fly':
        return 0;
      case 'anims/enemy/fly':
      case 'anims/enemySilver/fly':
        return 21;
      case 'anims/flirtyGirl/default':
        return 15;
      case 'anims/ufo/fly':
        return 0;
      default:
        return 0;
    }
  }

</script>

{#if destroyed}
  <Coin x={instance!.x} y={instance!.y} onCoinCollected={() => {
    onDie()
  }} />
{:else}
<Sprite bind:instance name="enemy" {x} {y} animation={animation}>
  <ArcadePhysics
    width={getWidth( animation )}
    height={getHeight( animation )}
    offsetX={getOffsetX( animation )}
    offsetY={getOffsetY( animation )}
    {velocityX}
    bounce={1}
    collideWorldBounds
  />
  <ArcadeCollider with="playerBullet" overlapOnly oncollide={
    () => {
      destroyed = true;

      const { x: enemyX, y: enemyY } = instance!

      if (['anims/enemy/fly', 'anims/flyBrain/fly'].includes( animation )) {
        emitter.explode(100, enemyX, enemyY)
      }

      if (animation == 'anims/enemySilver/fly') {
        emitterSilver.explode(100, enemyX, enemyY)
      }

      if (animation == 'anims/flirtyGirl/default' || animation == 'anims/flirtyGirl/attack') {
        emitterFlirtyGirl.explode(1, enemyX, enemyY)
        emitterFlirtyGirl2.explode(1, enemyX, enemyY)
      }
    }
  } />
</Sprite>
{/if}
