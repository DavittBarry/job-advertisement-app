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
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-dark-txt bg-brand-blue-500 hover:bg-brand-green-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://localhost:4000/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        console.error("An error occurred during registration:", error);
      }
    },
  },
};
</script>
