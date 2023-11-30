<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="rounded-xl p-4 bg-brand-nav-bg-light container max-w-md w-full">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-dark">
          Login
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              v-model="username"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-dark text-dark rounded-t-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm"
              placeholder="Username"
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
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-dark-txt bg-brand-blue-500 hover:bg-brand-green-500"
          >
            Login
          </button>
        </div>
      </form>
      <button
        v-if="!isAuthenticated"
        @click="signInWithGoogle"
        class="group relative w-full flex justify-center py-2 px-4 mt-6 border border-transparent text-sm font-medium rounded-md text-black hover:text-white bg-white hover:bg-brand-blue-500"
      >
        <img
          src="@/assets/Google__G__logo.svg"
          alt="Google logo"
          class="mr-2 h-6"
        />
        Log in with Google
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { globalErrorMiddleware } from "../middleware/errorMiddleware";
import { handleLoginSuccess } from "../middleware/successHandlers";

const apiURL = process.env.VUE_APP_API_URL;

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const response = await axios.post(`${apiURL}/login`, {
          username: username.value,
          password: password.value,
        });

        handleLoginSuccess(response);
        await store.dispatch("login", response.data);

        if (router.currentRoute.value.query.redirect) {
          router.push(router.currentRoute.value.query.redirect.toString());
        } else {
          router.push({ name: "Home" });
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        globalErrorMiddleware(error);
      }
    };

    return {
      username,
      password,
      login,
    };
  },
  methods: {
    signInWithGoogle() {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn().then((googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;

        axios
          .post(`${process.env.VUE_APP_API_URL}/google-sign-in`, {
            idToken: id_token,
          })
          .then((response) => {
            const token = response.data.token;
            this.$store.dispatch("login", token).then(() => {
              handleLoginSuccess();
              this.$router.push({ name: "Home" });
            });
          })
          .catch((error) => {
            console.error("Error during Google Sign In:", error);
            globalErrorMiddleware(error);
          });
      });
    },
  },
};
</script>
