import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      token: localStorage.getItem("token") || "",
      loggedIn: false,
      userName: localStorage.getItem("userName") || "",
    };
  },
  getters: {
    isAuthenticated: (state) => state.loggedIn,
    userName: (state) => state.userName,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.loggedIn = !!token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
      if (userName) {
        localStorage.setItem("userName", userName);
      } else {
        localStorage.removeItem("userName");
      }
    },
  },
  actions: {
    login({ commit }, { token, userName }) {
      commit("SET_TOKEN", token);
      commit("SET_USER_NAME", userName);
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_USER_NAME", "");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
  },
});

export default store;
