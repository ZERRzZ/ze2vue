import Vue from 'vue'

import ElementUI from 'element-ui'
import '@/assets/styles/element-variables.scss'

import App from './App.vue'

import '@/assets/styles/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small'})

new Vue({
  render: h => h(App)
}).$mount('#app')
