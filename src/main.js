import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import axios from "axios";
import router from "./routes/index";
import store from "./store/index";
import { globalErrorMiddleware } from "./middleware/errorMiddleware";
import GAuth from "vue-google-oauth2";
import { loadGapiInsideDOM } from "gapi-script";

const app = createApp(App);

const googleOAuthID = process.env.VUE_APP_GOOGLE_CLIENT_ID;

// Initialize Google API Client
let gAuthInitialized = false;

loadGapiInsideDOM()
  .then(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: googleOAuthID,
          scope: "profile email",
        })
        .then(() => {
          if (!gAuthInitialized) {
            app.use(GAuth, gauthOption);
            gAuthInitialized = true; // Set the flag to true after initializing
          }

          app.use(store);
          app.use(router);
          app.mount("#app");
        });
    });
  })
  .catch((error) => {
    console.error("Error loading Google API Client:", error);
  });

// Configure Google OAuth2
const gauthOption = {
  clientId: googleOAuthID,
  scope: "profile email",
  prompt: "select_account",
};

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
app.use(router);

app.use(GAuth, gauthOption);

app.use(router).mount("#app");
