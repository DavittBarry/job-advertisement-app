<template>
  <div class="p-4">
    <h1 class="text-3xl text-center font-semibold mb-6">Job Listings</h1>
    <div class="flex justify-center my-4">
      <button
        @click="navigateToJobSubmission"
        class="bg-brand-blue-600 text-white px-4 py-2 rounded hover:bg-brand-green-500 focus:outline-none"
      >
        Submit job advertisement
      </button>
    </div>
    <div class="flex justify-center mt-4 mb-10 px-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search for jobs..."
        class="p-3 border shadow-md border-gray-300 rounded-l-lg text-sm w-full max-w-md"
      />
      <button
        @click="search"
        class="bg-brand-blue-600 text-white p-3 rounded-r-lg hover:bg-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200 focus:ring-opacity-50 transition duration-300 shadow-md w-auto"
      >
        Search
      </button>
    </div>
    <!-- Mobile/tablet filter dropdown -->
    <div class="flex justify-center my-4 md:hidden">
      <div
        class="flex items-center space-x-3 bg-brand-nav-bg-light p-2 rounded-lg shadow"
      >
        <span class="font-medium text-gray-700 dark:text-dark-txt"
          >Filter results:</span
        >
        <select
          v-model="currentFilter"
          @change="setFilter(currentFilter)"
          class="dropdown-text dropdown-bg block pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue-500 shadow-lg"
          aria-label="Filter jobs dropdown"
        >
          <option v-for="filter in filters" :key="filter" :value="filter">
            {{ filter }}
          </option>
        </select>
      </div>
    </div>

    <!-- Desktop filter buttons -->
    <div class="hidden md:flex justify-center mb-4">
      <div
        class="flex rounded-xl bg-brand-nav-bg-light p-4 space-x-6 max-w-3xl mx-auto"
      >
        <h2 class="font-semibold my-auto mr-6">Filter results:</h2>
        <button
          v-for="filter in filters"
          :key="filter"
          @click="setFilter(filter)"
          :class="{ 'bg-brand-blue-600 text-white': currentFilter === filter }"
          class="p-2 rounded hover:bg-brand-green-500 hover:text-white transition"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    <!-- Job cards grid -->
    <div class="max-w-7xl mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center"
      >
        <JobCard
          v-for="job in filteredJobs"
          :key="job.id"
          :job="job"
          class="w-full max-w-sm mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobCard from "./JobCard.vue";
import { mapGetters, mapActions } from "vuex";
import { globalErrorMiddleware } from "../middleware/errorMiddleware";

const apiURL = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      jobs: [],
      currentFilter: "all",
      searchTerm: "",
      filters: [
        "all",
        "full-time",
        "part-time",
        "contract",
        "internship",
        "temporary",
      ],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    filteredJobs() {
      if (this.currentFilter === "all") {
        return this.jobs;
      }
      return this.jobs.filter(
        (job) => job.employmentType === this.currentFilter,
      );
    },
  },
  methods: {
    ...mapActions(["logout"]),
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
    async setFilter(filter) {
      this.currentFilter = filter;
      try {
        const params = filter === "all" ? {} : { employmentType: filter };
        const response = await axios.get(`${apiURL}/api/jobEntries`, {
          params,
        });
        this.jobs = response.data;
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
      }
    },
  },
  components: {
    JobCard,
  },
  async mounted() {
    this.setFilter(this.currentFilter);
  },
};
</script>
