import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()],
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (type: string) => `index.${type === 'cjs' ? 'cjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['unocss'],
    },
  },
})
