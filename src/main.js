/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";
console.log("Base URL ::",import.meta.env.VITE_API_URL)
loadFonts()


// Create vue app
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use( Vue3Toasity,
    {
      autoClose: 3000,
    });

// Mount vue app
app.mount('#app')
