# Evil Invaders

A Space Invaders style game built with **Svelte 5** and **Phaser 4**, wired
together by the [`svelte-phaser`](packages/svelte-phaser/README.md) library
that lives in this repo as a workspace package.

## Run it

```shell
npm install
npm run dev
```

Other scripts:

- `npm run validate` — type-checks the app and the library with svelte-check
- `npm run build` — production build (served from `docs/` on GitHub Pages)

> Vite 8 wants Node 20.19+ / 22.12+; it currently runs on 22.5 with a warning,
> but upgrading Node is recommended.

## svelte-phaser

`packages/svelte-phaser` is a Svelte 5 + Phaser 4 rewrite of the original
[svelte-phaser](https://github.com/mattjennings/svelte-phaser) (this game was
originally its `examples/invaders` demo). It has two layers:

- **Components** (`<Game>`, `<Scene>`, `<Sprite>`, `<ArcadeCollider>`, …) —
  what this game uses, consumed as source through the npm workspace.
- **Core** — a compiler-free, pure-TypeScript API published to JSR as
  [`@easierbycode/svelte-phaser`](https://jsr.io/@easierbycode/svelte-phaser)
  (JSR does not accept `.svelte` files). Publish with `deno publish` from the
  package directory.

Assets were taken from the official [Phaser 2 example](http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders)
