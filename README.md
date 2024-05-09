# @ljtool/unocss-preset

<p>
  <a href="https://www.npmjs.com/package/@ljtool/unocss-preset" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/npm/v/@ljtool/unocss-preset" alt="npm version">
  </a>
  <a href="https://nodejs.org/en/about/releases/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/node/v/@ljtool/unocss-preset" alt="node version">
  </a>
</p>

> preset for UnoCSS

## Installation

```sh
npm i @ljtool/unocss-preset unocss --save-dev # with npm
yarn add @ljtool/unocss-preset unocss -D # with yarn
pnpm add @ljtool/unocss-preset unocss -D # with pnpm
```

## Usage

```js
// unocss.config.js
import { presetUno, defineConfig } from 'unocss'
import presetLj from '@ljtool/unocss-preset'

export default defineConfig({
  presets: [presetUno(), presetLj()],
})
```

## License

Apache-2.0
