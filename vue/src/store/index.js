import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false
}
const store = new Vuex.Store({
  state: state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.loading = status
    }
  }
})

export default store

