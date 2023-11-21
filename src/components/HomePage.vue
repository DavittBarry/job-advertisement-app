<template>
  <div
    class="hero bg-cover bg-center flex flex-col justify-center"
    :style="{ backgroundImage: 'url(' + jobSearchImage + ')' }"
  >
    <div
      class="hero-overlay bg-opacity-60 bg-black flex flex-col justify-center"
    >
      <div class="text-center hero-content text-white">
        <div class="max-w-md mx-auto">
          <h1 class="mb-5 mt-6 text-5xl font-bold">
            Welcome to the Job Finder!
          </h1>
          <p class="mb-5">Find your next dream job.</p>
        </div>
      </div>
      <div class="flex justify-center mt-4 mb-10">
        <input
          type="text"
          placeholder="Search for jobs..."
          class="p-3 border border-gray-300 rounded-l-lg text-sm"
        />
        <button
          class="bg-brand-blue-600 text-white p-3 rounded-r-lg hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue-200 focus:ring-opacity-50 transition duration-300 shadow"
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <div>
    <h2 class="text-3xl text-center font-semibold my-6">Featured Jobs</h2>
    <!-- Featured job cards here soon-->
  </div>
  <div>
    <h2 class="text-3xl text-center font-semibold my-6">Success Stories</h2>
    <!-- Testimonials here soon-->
  </div>
</template>

<style>
.hero {
  @apply pt-16 md:pt-32;
}
</style>

<script>
import jobSearchImage from "@/assets/jobsearch.jpeg";

export default {
  data() {
    return {
      jobSearchImage: jobSearchImage,
    };
  },
  name: "HomePage",
};
</script>
