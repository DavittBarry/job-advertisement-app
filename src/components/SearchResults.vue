<template>
  <div>
    <h1 class="mb-5 text-center mt-6 text-3xl font-bold">Search Results</h1>
    <p v-if="loading">Loading...</p>
    <template v-else>
      <JobCard v-for="job in filteredJobs" :key="job._id" :job="job" />
    </template>
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
  },
};
</script>
