<template>
  <div>
    <h1 class="mb-5 text-center mt-6 text-3xl font-bold">
      Search Results for "{{ searchQuery }}"
    </h1>
    <p v-if="loading" class="text-center">Loading...</p>
    <p v-else-if="!filteredJobs.length" class="text-center">No results.</p>
    <p v-else class="text-center mb-6">{{ resultCount }}</p>
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
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4 justify-items-center"
    >
      <JobCard v-for="job in filteredJobs" :key="job._id" :job="job" />
    </div>

    <div class="flex justify-center mt-6">
      <button
        @click="goBack"
        class="bg-brand-blue-600 p-4 rounded text-white hover:bg-brand-blue-400 transition duration-300"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobCard from "./JobCard.vue";

export default {
  components: {
    JobCard,
  },
  data() {
    return {
      jobs: [],
      searchQuery: "",
      loading: false,
      currentFilter: "all",
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
    filteredJobs() {
      let filtered = this.jobs;
      if (this.currentFilter !== "all") {
        filtered = filtered.filter(
          (job) => job.employmentType === this.currentFilter,
        );
      }
      return filtered.filter((job) =>
        job.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
    resultCount() {
      const count = this.filteredJobs.length;
      return `${count} ${count === 1 ? "result" : "results"} found.`;
    },
  },
  async created() {
    this.searchQuery = this.$route.query.q;
    await this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      this.loading = true;
      try {
        const params =
          this.currentFilter === "all"
            ? {}
            : { employmentType: this.currentFilter };
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/jobEntries`,
          { params },
        );
        this.jobs = response.data;
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        this.loading = false;
      }
    },
    async setFilter(filter) {
      this.currentFilter = filter;
      await this.fetchJobs();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
