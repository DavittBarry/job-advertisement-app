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
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <JobCard v-for="job in jobs" :key="job.title" :job="job" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobCard from "./JobCard.vue";
import { mapGetters, mapActions } from "vuex";

const apiURL = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
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
  },
  components: {
    JobCard,
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiURL}/api/jobEntries`);
      this.jobs = response.data;
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  },
};
</script>

<style scoped>
.job-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: center;
}
</style>
