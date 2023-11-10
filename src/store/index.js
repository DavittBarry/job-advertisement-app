import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      token: localStorage.getItem("token") || "",
    };
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, token) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", token);
        localStorage.setItem("token", token);
        resolve();
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        localStorage.removeItem("token");
        resolve();
      });
    },
  },
});

export default store;
