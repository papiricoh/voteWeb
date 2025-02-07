import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import HighchartsVue from 'highcharts-vue'

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCheckToSlot, faNewspaper, faEnvelopesBulk, faHouse, faScaleUnbalanced, faLandmarkFlag, faHandshakeAngle, faFilePen, faLineChart, faMagnifyingGlass, faEnvelopeOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCheckToSlot, faNewspaper, faEnvelopesBulk, faHouse, faScaleUnbalanced, faLandmarkFlag, faHandshakeAngle, faFilePen, faLineChart, faMagnifyingGlass, faEnvelopeOpen, faEnvelope)

const app = createApp(App)

app.use(HighchartsVue)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).use(store).use(Vue3ColorPicker)

app.mount('#app')
