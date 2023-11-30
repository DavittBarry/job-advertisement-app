import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import axios from "axios";
import router from "./routes/index";
import store from "./store/index";
import { globalErrorMiddleware } from "./middleware/errorMiddleware";
import GAuth from "vue3-google-oauth2";

const googleOAuthID = process.env.VUE_APP_GOOGLE_CLIENT_ID;

// Configures Google OAuth2
const gauthOption = {
  clientId: googleOAuthID,
  scope: "profile email",
  prompt: "select_account",
};

const app = createApp(App);

// Sets the global error handler
app.config.errorHandler = globalErrorMiddleware;

// Axios configuration
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

app.use(GAuth, gauthOption);
app.use(store);
app.use(router);

app.mount("#app");
