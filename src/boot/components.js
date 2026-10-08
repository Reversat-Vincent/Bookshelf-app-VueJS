import { defineBoot } from '#q-app'

// App
import AppBtn from '../components/AppBtn.vue'
import AppError from '../components/AppError.vue'
import AppLoading from '../components/AppLoading.vue'
import AppTooltip from '../components/AppTooltip.vue'
import ImgLoader from '../components/ImgLoader.vue'

// Dialog
import DialogBox from '../components/dialog/DialogBox.vue'
import DialogClose from '../components/dialog/DialogClose.vue'

// Input
import InputCheckbox from '../components/input/InputCheckbox.vue'
import InputNumber from '../components/input/InputNumber.vue'
import InputRating from '../components/input/InputRating.vue'
import InputSelect from '../components/input/InputSelect.vue'
import InputText from '../components/input/InputText.vue'

export default defineBoot(({ app }) => {
  // App
  app.component('AppBtn', AppBtn)
  app.component('AppError', AppError)
  app.component('AppLoading', AppLoading)
  app.component('AppTooltip', AppTooltip)
  app.component('ImgLoader', ImgLoader)

  // Dialog
  app.component('DialogBox', DialogBox)
  app.component('DialogClose', DialogClose)

  // Input
  app.component('InputCheckbox', InputCheckbox)
  app.component('InputNumber', InputNumber)
  app.component('InputRating', InputRating)
  app.component('InputSelect', InputSelect)
  app.component('InputText', InputText)
})
