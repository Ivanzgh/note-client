import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
const store = new Vuex.Store({
  state : {
    userInfo : {
      avatar : '',
      email : '',
      username : ''
    },
    admin : false
  },
  mutations : {
    'CHANGE_USERINFO'(state,payload) {
      state.userInfo = payload
    },
    'CHANGE_ADMIN'(state,payload) {
      state.admin = payload
    }
  },
  actions : {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key),
      },
    }),
  ],
});

export default store;
