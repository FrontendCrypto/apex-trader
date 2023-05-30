import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'

const app = createApp(App)

app.config.debug = true
app.config.devtools = true

app.use(createPinia())
app.use(store)
app.mount('#app')
