<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-600 mb-4">
        Submit Job Advertisement
      </h1>
      <form
        @submit.prevent="submitJob"
        class="shadow-md bg-brand-nav-bg-light text-gray-600 rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Software Engineer"
            v-model="job.title"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="company"
          >
            Company
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            type="text"
            placeholder="Company A"
            v-model="job.company"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="location"
          >
            Location
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="City, State"
            v-model="job.location"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Detailed job description"
            v-model="job.description"
            rows="4"
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="employmentType"
          >
            Employment Type
          </label>
          <select
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="employmentType"
            v-model="job.employmentType"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="applyLink"
          >
            Advertisement Link
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="applyLink"
            type="text"
            placeholder="https://advertisement-link.com"
            v-model="job.applyLink"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { handleJobSubmitSuccess } from "../middleware/successHandlers";

export default {
  data() {
    return {
      job: {
        title: "",
        company: "",
        location: "",
        description: "",
        employmentType: "full-time",
        applyLink: "",
      },
      applyLinkError: "",
    };
  },
  methods: {
    isValidHttpUrl(string) {
      if (
        string.startsWith("http://") ||
        string.startsWith("https://") ||
        string.startsWith("www.")
      ) {
        return true;
      }
      return false;
    },
    async submitJob() {
      if (!this.isValidHttpUrl(this.job.applyLink)) {
        this.applyLinkError =
          "Please enter a valid URL (starting with https://, http://, or www.)";
        return;
      }

      this.applyLinkError = "";
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/jobEntries`,
          this.job,
        );

        handleJobSubmitSuccess(response);

        this.$router.push("/jobs");
      } catch (error) {
        console.error("An error occurred while submitting the job:", error);
      }
    },
  },
};
</script>
