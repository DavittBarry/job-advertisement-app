<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="rounded-xl p-8 bg-brand-nav-bg-light container max-w-md w-full shadow-md"
    >
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-dark">
          Google Sign-In
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in quickly and securely with your Google account.
        </p>
      </div>
      <div class="mt-8">
        <button
          @click="signInWithGoogle"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-dark-txt bg-brand-blue-500 hover:bg-brand-green-500"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { globalErrorMiddleware } from "../middleware/errorMiddleware";

export default {
  setup() {
    const router = useRouter();

    const signInWithGoogle = () => {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn().then((googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        axios
          .post(`${process.env.VUE_APP_API_URL}/google-sign-in`, {
            idToken: id_token,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            router.push({ name: "Home" });
          })
          .catch((error) => {
            console.error("Error during Google Sign In:", error);
            globalErrorMiddleware(error);
          });
      });
    };

    return {
      signInWithGoogle,
    };
  },
};
</script>
