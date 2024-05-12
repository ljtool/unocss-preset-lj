# @ljtool/unocss-preset

[![npm](https://img.shields.io/npm/v/@ljtool/unocss-preset)](https://www.npmjs.com/package/@ljtool/unocss-preset)
[![node](https://img.shields.io/node/v/@ljtool/unocss-preset)](https://nodejs.org/en/about/releases/)
[![license](https://img.shields.io/github/license/ljtool/unocss-preset-lj?style=flat-square)](https://en.wikipedia.org/wiki/Apache_License#Version_2.0)
[![stars](https://img.shields.io/github/stars/ljtool/unocss-preset-lj?style=flat-square&logo=GitHub)](https://github.com/ljtool/unocss-preset-lj)
[![release](https://img.shields.io/github/v/release/ljtool/unocss-preset-lj?style=flat-square)](https://github.com/ljtool/unocss-preset-lj/releases)

> preset for UnoCSS

## Features

- [ ] add document website

## Installation

```sh
npm i @ljtool/unocss-preset unocss --save-dev
yarn add @ljtool/unocss-preset unocss -D
pnpm add @ljtool/unocss-preset unocss -D
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
