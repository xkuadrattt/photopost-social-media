import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axiosInit from './api'
import Cookies from 'js-cookie'

const app = createApp(App)

axiosInit.interceptors.request.use(
  config=>{
    const auth = Cookies.get("userdata")
    config.headers.Authorization = `Bearer ${auth}`
    return config
  },
  error=>Promise.reject(error)
)
app.config.globalProperties.$axios = {...axiosInit}

app.use(createPinia())
app.use(router)

app.mount('#app')
