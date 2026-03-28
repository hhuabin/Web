import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')

