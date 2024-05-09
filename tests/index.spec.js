import { describe, expect, it } from 'vitest'
import { createGenerator, presetUno } from 'unocss'
describe('lj preset', async () => {
  it('generate gradient css', async () => {
    const generator = createGenerator({
      presets: [presetUno()],
    })

    const target = ['lj-linear-direction-30'].join(' ')

    const { css } = await generator.generate(target, { preflights: false })
    expect(css).toMatchSnapshot()
  })
})
