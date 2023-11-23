<template>
  <div>
    <h1 class="mb-5 text-center mt-6 text-3xl font-bold">Search Results</h1>
    <p v-if="loading" class="text-center">Loading...</p>
    <p v-else-if="!filteredJobs.length" class="text-center">No results.</p>
    <p v-else class="text-center mb-6">{{ resultCount }}</p>
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
    };
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter((job) =>
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
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/jobEntries`,
        );
        this.jobs = response.data;
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
