<template>
  <div class="p-4">
    <h1 class="text-3xl text-center font-semibold mb-6">Job Listings</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <JobCard v-for="job in jobs" :key="job.title" :job="job" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobCard from "./JobCard.vue";

export default {
  data() {
    return {
      jobs: [],
    };
  },
  components: {
    JobCard,
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:4000/api/jobEntries");
      this.jobs = response.data;
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  },
};
</script>
