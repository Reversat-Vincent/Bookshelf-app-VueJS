<script>
import TimeClock from './components/TimeClock.vue'
import { colors } from 'quasar'
import { getCssVar } from 'quasar'
export default {
  name: 'HomePage',
  components: {
    TimeClock,
  },
  data() {
    return {
      primary: [],
      secondary: [],
      success: [],
      error: [],
      white: [],
      black1: [],
      black2: [],
      black3: [],
      black4: [],
      black5: [],
    }
  },
  mounted() {
    this.primary = Object.values(colors.hexToRgb(getCssVar('primary')))
    this.secondary = Object.values(colors.hexToRgb(getCssVar('secondary')))
    this.success = Object.values(colors.hexToRgb(getCssVar('success')))
    this.error = Object.values(colors.hexToRgb(getCssVar('error')))
    this.white = Object.values(colors.hexToRgb(getCssVar('white')))
    this.black1 = Object.values(colors.hexToRgb(getCssVar('black-1')))
    this.black2 = Object.values(colors.hexToRgb(getCssVar('black-2')))
    this.black3 = Object.values(colors.hexToRgb(getCssVar('black-3')))
    this.black4 = Object.values(colors.hexToRgb(getCssVar('black-4')))
    this.black5 = Object.values(colors.hexToRgb(getCssVar('black-5')))
  },
  methods: {
    luminance(r, g, b) {
      var a = [r, g, b].map((v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      })
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
    },
    contrast(rgb1, rgb2) {
      var lum1 = this.luminance(...rgb1)
      var lum2 = this.luminance(...rgb2)
      var brightest = Math.max(lum1, lum2)
      var darkest = Math.min(lum1, lum2)
      return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100
    },
  },
}
</script>

<template>
  <section id="home">
    <div>
      <TimeClock></TimeClock>
    </div>
    <div>
      <div id="color-test">
        <div class="color-test bg-primary text-white">
          primary:
          {{ this.contrast(white, primary) }}
          / header, btn, badge
        </div>
        <div class="color-test bg-black-1 text-white">
          <span class="text-white">black-1: {{ this.contrast(white, black1) }}</span>
          /
          <span class="text-success">{{ this.contrast(success, black1) }}</span>
          /
          <span class="text-secondary">{{ this.contrast(secondary, black1) }}</span>
          /
          <span class="text-error">{{ this.contrast(error, black1) }}</span>
          / nav, notify
        </div>
        <div class="color-test bg-black-2 text-white">
          <span class="text-white">black-2: {{ this.contrast(white, black2) }}</span>
          /
          <span class="text-success">{{ this.contrast(success, black2) }}</span>
          /
          <span class="text-secondary">{{ this.contrast(secondary, black2) }}</span>
          /
          <span class="text-error">{{ this.contrast(error, black2) }}</span>
          / main, hover nav
        </div>
        <div class="color-test bg-black-3 text-white">
          <span class="text-white">black-3: {{ this.contrast(white, black3) }}</span>
          /
          <span class="text-success">{{ this.contrast(success, black3) }}</span>
          /
          <span class="text-secondary">{{ this.contrast(secondary, black3) }}</span>
          /
          <span class="text-error">{{ this.contrast(error, black3) }}</span>
          / footer, hover main
        </div>
        <div class="color-test bg-black-4 text-white">
          <span class="text-white">black-4: {{ this.contrast(white, black4) }}</span>
          /
          <span class="text-success">{{ this.contrast(success, black4) }}</span>
          /
          <span class="text-secondary">{{ this.contrast(secondary, black4) }}</span>
          /
          <span class="text-error">{{ this.contrast(error, black4) }}</span>
          / tooltip, hover footer
        </div>
        <div class="color-test bg-black-5 text-white">
          <span class="text-white">black-5: {{ this.contrast(white, black5) }}</span>
          /
          <span class="text-success">{{ this.contrast(success, black5) }}</span>
          /
          <span class="text-secondary">{{ this.contrast(secondary, black5) }}</span>
          /
          <span class="text-error">{{ this.contrast(error, black5) }}</span>
          /
        </div>
      </div>
      <br />
      AA : 4.5
      <br />
      AAA : 7
      <br />
      <br />
    </div>
  </section>
</template>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
#home > div {
  display: inline-block;
  width: 100%;
}
#color-test {
  display: flex;
  align-items: start;
  flex-direction: column;
}
.color-test {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  justify-content: center;
}
</style>
