import Vue from 'vue'
import Vuex from 'vuex'
import { myIntegralService } from 'services/collect'
import storage from 'utils/storage'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		integral: 0
	},
	mutations: {
		changeIntegral(state, integral) {
			state.integral = integral
		}
	},
	actions: {
		async getIntergral({ commit, state }, ) {
			const userinfo = storage.getStorage('userinfo') || {}
			const resultData = await myIntegralService({
				openid: userinfo.openid
			})
			if (resultData && resultData.integral) {
				commit('changeIntegral', resultData.integral)
			}
		}
	}
})

export default store
