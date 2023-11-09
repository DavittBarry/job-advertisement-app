<template>
  <nav :key="isAuthenticated" class="bg-brand-nav-bg-light">
    <!-- Desktop view -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link
            to="/"
            class="flex-shrink-0 flex items-center space-x-2 rounded-lg hover:bg-brand-nav-bg-light transition"
            active-class="bg-brand-nav-bg-light"
            :style="{
              background: 'linear-gradient(to right, #D9D9D9, #F1F1F1)',
            }"
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
            to="/jobs"
            class="text-gray-600 font-semibold p-1 rounded-lg hover:bg-logo-container-bg hover:text-gray-900 transition"
            active-class="bg-logo-container-bg text-gray-900"
          >
            Jobs
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
              class="block h-6 w-6 transition duration-300 ease-in-out"
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
              class="block h-6 w-6 transition duration-300 ease-in-out"
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
            <router-link to="/login" v-if="!isAuthenticated">
              <button
                class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring w-[74.57px] focus:ring-brand-blue-200 transition"
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
      class="lg:hidden text-center"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          to="/jobs"
          class="text-gray-600 font-semibold p-2 rounded-lg hover:bg-logo-container-bg hover:text-gray-900 transition"
          active-class="bg-logo-container-bg text-gray-900"
          @click="closeMenu"
        >
          Jobs
        </router-link>
        <div class="flex row justify-center space-x-2">
          <router-link to="/login" v-if="!isAuthenticated" @click="closeMenu">
            <button
              class="bg-brand-blue-600 text-white p-2 mt-4 w-[74.57px] rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
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
              class="bg-brand-blue-600 text-white p-2 mt-4 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 mb-2 focus:ring focus:ring-brand-blue-200 transition"
            >
              Register
            </button>
          </router-link>
          <button
            v-if="isAuthenticated"
            @click="performLogout"
            class="bg-brand-blue-600 text-white p-2 rounded hover:bg-brand-green-500 focus:outline-none focus:border-brand-blue-600 mb-2 focus:ring focus:ring-brand-blue-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    performLogout() {
      this.logout();
      this.closeMenu();
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
