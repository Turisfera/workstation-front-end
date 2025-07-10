import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router.js'
import i18n   from '@/i18n.js'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura     from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService        from 'primevue/toastservice'
import Button              from 'primevue/button'
import InputText           from 'primevue/inputtext'
import SelectButton        from 'primevue/selectbutton'
import MultiSelect         from 'primevue/multiselect'
import FileUpload          from 'primevue/fileupload'
import InputNumber         from 'primevue/inputnumber'
import Toast               from 'primevue/toast'

const app = createApp(App)

app.use(PrimeVue, {
    theme: { preset: Aura },
    ripple: true
})
app.use(ConfirmationService)
app.use(ToastService)

app.component('pv-button',        Button)
app.component('pv-input-text',    InputText)
app.component('pv-select-button', SelectButton)
app.component('pv-multi-select',  MultiSelect)
app.component('pv-file-upload',   FileUpload)
app.component('pv-input-number',  InputNumber)
app.component('pv-toast',         Toast)

app.use(i18n)
window.i18n = i18n
window.__VUE_I18N__ = i18n
app.use(router)
app.mount('#app')
