import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loginPwd: false
  },

  mutations: {
    loginPwd (state, obj) {
      state.loginPwd = obj
    }
  },
  actions: {},
  getters: {
    loginPwd: state => {
      return state.loginPwd
    }
  }
})
