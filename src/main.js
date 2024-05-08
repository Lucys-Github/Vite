import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './components/CoronaChart.vue'
import AboutPage from './components/About.vue'


const app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        component: HomePage,
        path: '/'
      },
      {
        component: AboutPage,
        path: '/about'
      }
    ],
  })


app.use(router)
app.mount('#app')
