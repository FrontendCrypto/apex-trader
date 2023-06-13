import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import store from './store'
import './assets/base.scss'

const vuetify = createVuetify({
    components,
    directives
})
const pinia = createPinia()
const app = createApp(App)

app.config.debug = true
app.config.devtools = true

app.use(pinia)
app.use(store)
app.use(vuetify)
app.mount('#app')
