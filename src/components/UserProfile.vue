<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Profile information -->
    <div class="text-center py-6">
      <h1 class="text-3xl font-bold">User's Profile</h1>
    </div>

    <!-- User's job posts -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="job in userJobs"
        :key="job._id"
        class="bg-brand-nav-bg-light shadow-lg rounded-lg p-4"
      >
        <h2 class="text-xl font-semibold">{{ job.title }}</h2>
        <p class="text-gray-800">{{ job.company }}</p>
        <p class="text-gray-600 text-sm">{{ job.description }}</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button
            @click="editJob(job._id)"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="confirmAndDeleteJob(job._id)"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { showSuccess } from "../middleware/successHandlers";

const apiURL = process.env.VUE_APP_API_URL;

export default {
  name: "UserProfile",
  data() {
    return {
      userJobs: [],
    };
  },
  methods: {
    async fetchUserJobs() {
      try {
        const response = await axios.get(`${apiURL}/user/posts`, {
          headers: { "auth-token": this.$store.state.authToken },
        });
        this.userJobs = response.data;
      } catch (error) {
        console.error("Error fetching user jobs: ", error);
      }
    },
    editJob(jobId) {
      this.$router.push({ name: "EditJob", params: { id: jobId } });
    },
    async deleteJob(jobId) {
      try {
        await axios.delete(`${apiURL}/api/jobEntries/${jobId}`, {
          headers: { "auth-token": this.$store.state.authToken },
        });
        this.fetchUserJobs();
        this.showDeleteSuccess();
      } catch (error) {
        console.error("Error deleting job: ", error);
      }
    },
    confirmAndDeleteJob(jobId) {
      if (confirm("Are you sure you want to delete this job?")) {
        this.deleteJob(jobId);
      }
    },
    showDeleteSuccess() {
      const successMessage = "Job deleted successfully";
      showSuccess(successMessage);
    },
  },
  mounted() {
    this.fetchUserJobs();
  },
};
</script>
