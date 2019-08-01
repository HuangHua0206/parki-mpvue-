import Vue from 'vue'
import App from './App'
import Tips from './utils/tips'
import store from "store";
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$tip = Tips
Vue.prototype.$store = store;
const app = new Vue(App)
app.$mount()
