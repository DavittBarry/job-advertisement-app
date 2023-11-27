<template>
  <footer class="w-full bg-brand-blue-500 text-white py-8">
    <div class="container mx-auto text-center">
      <div class="mt-1">
        <router-link
          to="/privacy-statement"
          class="text-white hover:underline mr-4"
          >Privacy Statement</router-link
        >
        <router-link to="/cookie-policy" class="text-white hover:underline mr-4"
          >Cookie Policy</router-link
        >
        <a
          href="https://davittportfolio.com/"
          class="text-white hover:underline"
          >Dev's Portfolio</a
        >
        <p class="mt-6">&copy; 2023 Job Finder. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterTemplate",
};
</script>
