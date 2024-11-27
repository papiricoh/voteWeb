import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import HighchartsVue from 'highcharts-vue'

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const app = createApp(App)

app.use(HighchartsVue)
app.use(router).use(Vue3ColorPicker)

app.mount('#app')
