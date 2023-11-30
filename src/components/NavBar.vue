<template>
  <nav class="bg-brand-nav-bg-light">
    <!-- Desktop view -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link
            to="/"
            class="flex-shrink-0 flex items-center space-x-2 rounded-lg hover:bg-brand-nav-bg-light transition"
            active-class="bg-brand-nav-bg-light"
            @click="closeMenu"
          >
            <img
              src="@/assets/logo.png"
              alt="Job Finder Logo"
              class="w-10 h-10"
            />
            <h1 class="text-2xl font-semibold text-gray-600">Job Finder</h1>
          </router-link>
        </div>
        <div class="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
          <router-link
            to="/job-listings"
            class="px-4 py-2 text-sm font-medium text-gray-800 transition duration-150 ease-in-out rounded-md hover:bg-brand-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-600"
            active-class="bg-brand-blue-500 text-white"
          >
            Job listings
          </router-link>
        </div>
        <div class="lg:hidden flex items-center">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isOpen"
              class="block h-8 w-8 transition duration-300 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              v-else
              class="block h-8 w-8 transition duration-300 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="hidden lg:block">
          <div class="lg:flex lg:items-center lg:space-x-4">
            <button
              v-if="!isAuthenticated"
              @click="signInWithGoogle"
              class="bg-white hover:bg-brand-blue-600 hover:text-white text-black font-bold py-2 px-4 rounded transition inline-flex items-center"
            >
              <img
                src="@/assets/Google__G__logo.svg"
                alt="Google logo"
                class="mr-2 h-6"
              />
              Sign in with Google
            </button>
            <router-link to="/login" v-if="!isAuthenticated">
              <button
                class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring min-w-[80px] focus:ring-brand-blue-200 transition"
              >
                Login
              </button>
            </router-link>
            <router-link to="/register" v-if="!isAuthenticated">
              <button
                class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
              >
                Register
              </button>
            </router-link>
            <div class="flex justify-center my-4">
              <button
                v-if="isAuthenticated"
                @click="navigateToJobSubmission"
                class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
              >
                Post a job
              </button>
            </div>
            <router-link to="/profile" v-if="isAuthenticated">
              <button
                class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
              >
                Profile
              </button>
            </router-link>
            <button
              v-if="isAuthenticated"
              @click="performLogout"
              class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile view -->
    <div
      :class="{ block: isOpen, hidden: !isOpen }"
      class="lg:hidden text-center absolute top-16 left-0 right-0 bg-brand-nav-bg-light overflow-y-auto"
      style="max-height: calc(100% - 4rem)"
      ref="menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-4 mt-6 sm:px-3 text-lg">
        <router-link
          to="/job-listings"
          class="px-4 py-2 text-xl font-medium text-gray-800 transition duration-150 ease-in-out rounded-md hover:bg-brand-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-600"
          active-class="bg-brand-blue-500 text-white"
          @click="closeMenu"
        >
          Job listings
        </router-link>
        <div class="flex row justify-center space-x-2">
          <router-link to="/login" v-if="!isAuthenticated" @click="closeMenu">
            <button
              class="bg-brand-blue-600 text-white p-2 mt-2 w-[74.57px] rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
            >
              Login
            </button>
          </router-link>
          <router-link
            to="/register"
            v-if="!isAuthenticated"
            @click="closeMenu"
          >
            <button
              class="bg-brand-blue-600 text-white p-2 mt-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 mb-2 focus:ring focus:ring-brand-blue-200 transition"
            >
              Register
            </button>
          </router-link>

          <div class="flex justify-center">
            <button
              v-if="isAuthenticated"
              @click="navigateToJobSubmission"
              class="bg-brand-blue-600 text-white p-2 mt-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 mb-2 focus:ring focus:ring-brand-blue-200 transition"
            >
              Post a job
            </button>
          </div>
          <router-link to="/profile" v-if="isAuthenticated" @click="closeMenu">
            <button
              class="bg-brand-blue-600 text-white p-2 mt-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 mb-2 focus:ring focus:ring-brand-blue-200 transition"
            >
              Profile
            </button>
          </router-link>
          <button
            v-if="isAuthenticated"
            @click="performLogout"
            class="bg-brand-blue-600 text-white p-2 mt-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 mb-2 focus:ring focus:ring-brand-blue-200 transition"
          >
            Logout
          </button>
        </div>
        <button
          v-if="!isAuthenticated"
          @click="signInWithGoogle"
          class="bg-white hover:bg-brand-blue-600 text-black hover:text-white font-bold py-1 px-1 rounded inline-flex items-center"
        >
          <img
            src="@/assets/Google__G__logo.svg"
            alt="Google logo"
            class="mr-2 h-6"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { globalErrorMiddleware } from "../middleware/errorMiddleware";
import { handleLogoutSuccess } from "@/middleware/successHandlers";

export default {
  name: "NavBar",
  computed: {
    ...mapState({
      token: (state) => state.token,
      userName: (state) => state.userName,
    }),
    isAuthenticated() {
      return !!this.token;
    },
  },
  methods: {
    ...mapActions(["logout"]),
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    performLogout() {
      this.logout()
        .then(() => {
          handleLogoutSuccess();
          this.$router.push({ name: "Home" });
          this.closeMenu();
        })
        .catch((error) => {
          globalErrorMiddleware(error);
        });
    },
    handleOAuthResponse() {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const token = urlParams.get("access_token");
      const userName = "ExtractedUserName";
      this.$store.dispatch("login", {
        token: token,
        userName: userName,
      });
    },
    signInWithGoogle() {
      const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth`;
      const clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;
      const params = {
        response_type: "token",
        client_id: clientId,
        redirect_uri: process.env.VUE_APP_REDIRECT_URI,
        scope: "profile email",
        prompt: "select_account",
      };
      const queryString = new URLSearchParams(params).toString();
      window.location = `${googleOAuthURL}?${queryString}`;
    },

    navigateToJobSubmission() {
      if (this.isAuthenticated) {
        this.$router.push("/submit-job-form");
      } else {
        this.$router.push({
          name: "Login",
          query: { redirect: "/submit-job-form" },
        });
      }
    },
    handleClickOutside(event) {
      if (
        this.$refs.menu &&
        !this.$refs.menu.contains(event.target) &&
        !event.target.matches(".menu-toggle-button")
      ) {
        this.closeMenu();
      }
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.handleClickOutside);
    if (window.location.hash.includes("access_token")) {
      this.handleOAuthResponse();
    }
  },

  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
