import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import axios from "axios";
import router from "./routes/index";
import store from "./store/index";
import { globalErrorMiddleware } from "./middleware/errorMiddleware";

const app = createApp(App);

// Sets the global error handler
app.config.errorHandler = globalErrorMiddleware;

axios.defaults.baseURL = "http://localhost:4000";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["auth-token"] = token;
  }
  return config;
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    globalErrorMiddleware(error);
    return Promise.reject(error);
  },
);

app.use(store);

app.use(router).mount("#app");
