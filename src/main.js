import Vue from 'vue'
import App from './App'
import Toast from './utils/Toast'

Vue.config.productionTip = false
App.mpType = 'app'
// Vue.prototype.$store = store
Vue.prototype.$toast = Toast

const app = new Vue(App)
console.log(process.argv)
app.$mount()
