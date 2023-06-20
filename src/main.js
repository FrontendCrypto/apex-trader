import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'
import './assets/base.scss'

const pinia = createPinia()
const app = createApp(App)

app.config.debug = true
app.config.devtools = true

app.use(pinia)
app.use(store)
app.mount('#app')
