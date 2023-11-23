<template>
  <div
    class="hero bg-cover bg-center flex flex-col justify-center"
    :style="{ backgroundImage: 'url(' + jobSearchImage + ')' }"
  >
    <div
      class="hero-overlay bg-opacity-60 bg-black flex flex-col justify-center"
    >
      <div class="text-center hero-content text-white">
        <div class="max-w-lg mx-auto px-4">
          <h1 class="mb-5 mt-6 text-5xl font-bold">
            Welcome to the Job Finder!
          </h1>
          <p class="mb-5">Find your next dream job.</p>
        </div>
      </div>
      <div class="flex justify-center mt-4 mb-10 px-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search for jobs..."
          class="p-3 border border-gray-300 rounded-l-lg text-sm w-full max-w-md"
        />
        <button
          @click="search"
          class="bg-brand-blue-600 text-white p-3 rounded-r-lg hover:bg-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-200 focus:ring-opacity-50 transition duration-300 shadow w-auto"
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <div class="py-6">
    <h2 class="text-3xl text-center font-semibold my-4">Featured Jobs</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4"
    >
      <JobCard v-for="job in jobs" :key="job.title" :job="job" />
    </div>
  </div>
  <div>
    <h2 class="text-3xl text-center font-semibold my-6">Success Stories</h2>
    <SuccessStories />
  </div>
</template>

<style>
.hero {
  @apply pt-16 md:pt-32;
}
</style>

<script>
import axios from "axios";
import jobSearchImage from "@/assets/jobsearch.jpeg";
import JobCard from "./JobCard.vue";
import SuccessStories from "./SuccessStories.vue";
import { globalErrorMiddleware } from "../middleware/errorMiddleware";

const apiURL = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      jobSearchImage: jobSearchImage,
      jobs: [],
      searchTerm: "",
    };
  },
  name: "HomePage",
  components: {
    JobCard,
    SuccessStories,
  },
  methods: {
    getRandomJobs(jobs, count) {
      let shuffled = jobs.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    search() {
      if (this.searchTerm.trim()) {
        this.$router.push({
          name: "SearchResults",
          query: { q: this.searchTerm.trim() },
        });
      } else {
        globalErrorMiddleware({ message: "The search bar cannot be empty." });
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiURL}/api/jobEntries`);
      this.jobs = this.getRandomJobs(response.data, 4);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  },
};
</script>
