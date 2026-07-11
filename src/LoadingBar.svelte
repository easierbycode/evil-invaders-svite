<script lang="ts">
  import Phaser from 'phaser'
  import { Rectangle, Container } from '5velte-ph4ser'
  import { Tween } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const barWidth = 400

  interface Props {
    x: number
    y: number
    progress?: number
    [key: string]: any
  }

  let { x, y, progress = 0, ...rest }: Props = $props()

  const tweenedProgress = Tween.of(() => progress, {
    duration: 200,
    easing: cubicOut,
  })
</script>

<Container {x} {y} width={barWidth} height={50}>
  <!-- outer bar -->
  <Rectangle
    width={barWidth}
    height={50}
    fillColor={0x777777}
    {...rest}
  />
  <!-- inner bar -->
  <Rectangle
    x={-barWidth / 2}
    originX={0}
    originY={0.5}
    width={Phaser.Math.Clamp(barWidth * tweenedProgress.current, 10, barWidth)}
    height={50}
    fillColor={0xbbbbbb}
  />
</Container>
