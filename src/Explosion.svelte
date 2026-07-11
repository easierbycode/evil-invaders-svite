<script lang="ts">
  import { Sprite } from '5velte-ph4ser'

  interface Props {
    x: number
    y: number
    animation?: string
    onanimationcomplete?: () => void
  }

  let {
    x,
    y,
    animation = 'anims/enemy/explosion',
    onanimationcomplete,
  }: Props = $props()
</script>

<Sprite
  {x}
  {y}
  depth={30}
  animation={animation}
  scale={animation == 'anims/ufo/explosion' ? 1 : 0.75}
  {onanimationcomplete}
/>
