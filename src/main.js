import Vue from 'vue'
import App from './App'
import Tips from './utils/tips'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$tip = Tips
const app = new Vue(App)
app.$mount()
