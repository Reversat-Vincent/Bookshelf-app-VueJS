import { defineStore, acceptHMRUpdate } from 'pinia'

export const useInputStore = defineStore('input', {
  state: () => ({}),
  actions: {
    fullLabel(label) {
      return label.length ? `${label} : ` : `${label}`
    },
    length(value = '', isInput = false) {
      return String(!(value == undefined || value == null) ? value : '').length + (isInput ? 1 : 0)
    },
    maxSize(options) {
      if (options.length === 0) return 1
      let maxLength = 1
      options.forEach(function (option) {
        if (option.label.toString().length > maxLength) maxLength = option.label.toString().length
      })
      return maxLength + 1
    },
    labelLength(label) {
      return this.length(this.fullLabel(label))
    },
    labelStyle(label) {
      return { width: this.length(this.fullLabel(label)) + 'ch' }
    },
    inputStyle(label, value, labelOnTop = false) {
      const inputLength = this.length(value, true)
      const labelLength = this.labelLength(label)
      return {
        'max-width': `${inputLength}ch`,
        width: labelOnTop ? `${inputLength}ch` : `calc(100% - ${labelLength}ch)`,
      }
    },
    selectStyle(label, options, labelOnTop = false) {
      const selectLength = this.maxSize(options)
      const labelLength = this.labelLength(label)
      return {
        'max-width': `${selectLength}ch`,
        width: labelOnTop ? `${selectLength}ch` : `calc(100% - ${labelLength}ch)`,
      }
    },
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInputStore, import.meta.hot))
}
