// uno.config.ts
import { defineConfig, presetUno, toEscapedSelector as e } from 'unocss'
import presetLj from './src/index'
export default defineConfig({
  presets: [presetUno(), presetLj()],
})
