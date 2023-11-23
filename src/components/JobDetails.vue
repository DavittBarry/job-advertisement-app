<template>
  <div v-if="job" class="py-10 text-center px-5 md:px-10 bg-white min-h-screen">
    <div
      class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div class="px-4 py-5 sm:px-6 bg-brand-blue-600 text-white">
        <h1 class="text-xl md:text-3xl font-bold">{{ job.title }}</h1>
        <p class="text-md md:text-lg">{{ job.company }}</p>
      </div>
      <div class="p-6 bg-brand-nav-bg-light">
        <p class="text-gray-700 text-left text-base mb-4">
          {{ job.description }}
        </p>
        <p class="text-gray-600 text-sm">
          <strong>Location: </strong
          ><span class="text-gray-700">{{ job.location }}</span>
        </p>
        <p class="text-gray-600 text-sm">
          <strong>Employment Type:</strong>
          <span class="text-gray-700">{{ job.employmentType }}</span>
        </p>
        <div class="mt-6">
          <a
            :href="job.applyLink"
            target="_blank"
            class="bg-brand-blue-600 p-4 rounded text-white hover:bg-brand-green-500 transition duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
    <button
      @click="goBack"
      class="bg-brand-blue-600 mt-6 p-4 rounded text-white hover:bg-brand-green-500 transition duration-300"
    >
      Back
    </button>
  </div>
  <div
    v-else
    class="text-center py-10 px-5 md:px-10 bg-brand-nav-bg-light min-h-screen"
  >
    <p>Loading job details...</p>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      job: null,
    };
  },
  setup() {
    const router = useRouter();

    function goBack() {
      router.go(-1);
    }

    return { goBack };
  },
  created() {
    this.fetchJobDetails();
  },
  methods: {
    async fetchJobDetails() {
      const jobId = this.$route.params.id;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/jobEntries/${jobId}`,
        );
        this.job = response.data;
      } catch (error) {
        console.error("An error occurred while fetching job details:", error);
      }
    },
  },
};
</script>
