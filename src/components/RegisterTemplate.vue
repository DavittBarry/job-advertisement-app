<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="p-4 bg-brand-nav-bg-light container max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-dark">
          Register
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              v-model="username"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-dark text-dark rounded-t-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-dark text-dark focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-dark text-dark rounded-b-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            :disabled="isSubmitting"
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-dark-txt bg-brand-blue-500 hover:bg-brand-green-500"
          >
            Register
          </button>
        </div>
      </form>
      <!--<button
        v-if="!isAuthenticated"
        @click="signInWithGoogle"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black hover:text-white bg-white hover:bg-brand-blue-500"
      >
        <img
          src="@/assets/Google__G__logo.svg"
          alt="Google logo"
          class="mr-2 h-6"
        />
        Register with Google
      </button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import { handleRegisterSuccess } from "../middleware/successHandlers";
import { globalErrorMiddleware } from "../middleware/errorMiddleware";

const apiURL = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isSubmitting: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => !!state.token,
    }),
  },
  methods: {
    ...mapActions(["login"]),
    async register() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      this.errorMessage = "";

      try {
        const response = await axios.post(`${apiURL}/register`, {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.login({
          token: response.data.token,
          userName: response.data.username,
        });

        handleRegisterSuccess(response);

        this.$router.push({ name: "Home" });

        this.isSubmitting = false;
      } catch (error) {
        console.error("Error in POST request:", error);
        globalErrorMiddleware(error);
        this.isSubmitting = false;
        if (error.response) {
          this.errorMessage =
            error.response.data.message ||
            "An error occurred during registration.";
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    },
    signInWithGoogle() {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn().then((googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;

        axios
          .post(`${apiURL}/google-sign-in`, {
            idToken: id_token,
          })
          .then((response) => {
            this.login({
              token: response.data.token,
              userName: response.data.username,
            });
            this.$router.push({ name: "Home" });
          })
          .catch((error) => {
            console.error("Error during Google Sign In:", error);
          });
      });
    },
  },
};
</script>
