import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {

  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
