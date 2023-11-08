import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isAuthenticated: false,
      token: '',
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  mutations: {
    SET_AUTH(state, { isAuthenticated, token }) {
      state.isAuthenticated = isAuthenticated;
      state.token = token;
    }
  },
  actions: {
    login({ commit }, token) {
      commit('SET_AUTH', { isAuthenticated: true, token });
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('SET_AUTH', { isAuthenticated: false, token: '' });
      localStorage.removeItem('token');
    }
  }
});
