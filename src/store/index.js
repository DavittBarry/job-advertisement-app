import { createStore } from "vuex";
import { axios } from "axios";

const store = createStore({
  state() {
    const token = localStorage.getItem("token") || "";
    return {
      token: token,
      loggedIn: !!token,
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
      localStorage.setItem("userName", userName);
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
    googleLogin({ commit }, googleUser) {
      axios
        .post(`${process.env.VUE_APP_API_URL}/google-sign-in`, {
          idToken: googleUser.getAuthResponse().id_token,
        })
        .then((response) => {
          commit("SET_TOKEN", response.data.token);
          commit("SET_USER_NAME", response.data.username);
        })
        .catch((error) => {
          console.error("Error during Google Sign In:", error);
        });
    },
  },
});

export default store;
