import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      token: "",
    };
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    SET_AUTH(state, { isAuthenticated, token }) {
      console.log(`Mutation: Setting isAuthenticated to ${isAuthenticated}`);
      state.isAuthenticated = isAuthenticated;
      state.token = token;
    },
  },
  actions: {
    login({ commit }, token) {
      console.log("Action: Logging in");
      commit("SET_AUTH", { isAuthenticated: true, token });
      localStorage.setItem("token", token);
    },
    logout({ commit }) {
      console.log("Action: Logging out");
      commit("SET_AUTH", { isAuthenticated: false, token: "" });
      localStorage.removeItem("token");
    },
  },
});

export default store;
