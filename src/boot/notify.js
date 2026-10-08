import { Notify } from 'quasar'

Notify.setDefaults({
  group: false,
  position: 'top-right',
  progress: true,
  timeout: 3000,
})

Notify.registerType('primary', {
  textColor: 'primary',
  classes: 'app-notify-primary',
})

Notify.registerType('warning', {
  textColor: 'secondary',
  classes: 'app-notify-secondary',
})

Notify.registerType('success', {
  textColor: 'success',
  classes: 'app-notify-success',
})

Notify.registerType('error', {
  textColor: 'error',
  classes: 'app-notify-error',
})
