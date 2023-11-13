import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import axios from "axios";
import router from "./routes/index";
import store from "./store/index";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:4000";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Axios request interceptor, token:", token);
  if (token) {
    config.headers["auth-token"] = token;
  }
  return config;
});

app.use(store);

store.watch(
  (state) => state.token,
  (newValue, oldValue) => {
    console.log("Token changed from", oldValue, "to", newValue);
  },
);

app.use(router).mount("#app");
