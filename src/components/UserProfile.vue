<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Profile information -->
    <div class="text-center py-6">
      <h1 class="text-3xl font-bold">User Profile</h1>
    </div>

    <!-- User's job posts -->
    <div
      v-if="userJobs.length > 0"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
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

    <div v-else class="text-center text-gray-800 text-lg">
      You have no posts.
    </div>
    <div class="flex justify-center my-4">
      <button
        @click="navigateToJobSubmission"
        class="bg-brand-blue-600 text-white px-4 py-2 rounded hover:bg-brand-green-500 focus:outline-none"
      >
        Submit job advertisement
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { showSuccess, showConfirmation } from "@/middleware/successHandlers";

export default {
  name: "UserProfile",
  data() {
    return {
      userJobs: [],
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.token,
      userName: (state) => state.userName,
    }),
  },
  methods: {
    ...mapActions(["fetchUserJobs"]),
    // async fetchUserJobs() {
    // try {
    // const response = await axios.get(
    //      `${process.env.VUE_APP_API_URL}/user/posts`,
    //   {
    //  headers: { "auth-token": this.token },
    //  },
    // );
    // this.userJobs = response.data;
    // } catch (error) {
    // console.error("Error fetching user jobs: ", error);
    // }
    // },
    // signInWithGoogle() {
    // sconst GoogleAuth = window.gapi.auth2.getAuthInstance();
    // sGoogleAuth.signIn()
    // s.then((googleUser) => {
    // sthis.$store.dispatch("googleLogin", googleUser);
    // sthis.$router.push({ name: "Home" });
    // s)
    // s.catch((error) => {
    // sconsole.error("Error during Google Sign In:", error);
    // s});
    // s},

    editJob(jobId) {
      this.$router.push({ name: "EditJob", params: { id: jobId } });
    },
    async deleteJob(jobId) {
      try {
        await axios.delete(
          `${process.env.VUE_APP_API_URL}/api/jobEntries/${jobId}`,
          {
            headers: { "auth-token": this.token },
          },
        );
        this.fetchUserJobs();
        showSuccess("Job deleted successfully");
      } catch (error) {
        console.error("Error deleting job: ", error);
      }
    },
    confirmAndDeleteJob(jobId) {
      showConfirmation(
        "Are you sure you want to delete this job?",
        () => this.deleteJob(jobId),
        () => console.log("Deletion cancelled"),
      );
    },
  },
  mounted() {
    this.fetchUserJobs();
  },
};
</script>
