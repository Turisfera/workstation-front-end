import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import i18n from "@/i18n.js";
import {SelectButton} from "primevue";
import '@fontsource/montserrat';
import 'primeicons/primeicons.css'
import router from '@/router.js'
import MultiSelect  from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import '/node_modules/primeflex/primeflex.css'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'

import Button from 'primevue/button'
import Lara from '@primeuix/themes/lara';

const app = createApp(App)

app.use(PrimeVue,
    {
    theme: {
        preset: Aura,
        options: {
            darkMode: true
        }
    }
});

app.component('pv-select-button', SelectButton)
app.component('pv-multi-select', MultiSelect)
app.component('pv-file-upload', FileUpload)
app.component('pv-input-number', InputNumber)
app.component('Toast', Toast)



app.use(i18n)
app.use(router)
app.mount('#app')