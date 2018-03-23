// import Vuex from 'vuex'
// import Vue from 'vue'
// Vue.use(Vuex);

import Vue from 'vue'
import Vuex from 'vuex'
if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
}

import state from './states'
import actions from './actions'
import mutations from './mutations'
const store = new Vuex.Store({
  state,
  actions,
  mutations
});
export default store;
