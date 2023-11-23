<template>
  <div
    @click="goToJobDetails"
    class="max-w-md p-4 bg-brand-nav-bg-light border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
  >
    <h2 class="text-xl font-semibold mb-2">{{ job.title }}</h2>
    <p class="text-sm text-gray-600 mb-2">
      <strong>Company:</strong> {{ job.company }}
    </p>
    <p class="text-sm text-gray-600 desktop-only">
      <strong>Description:</strong> {{ truncatedDescriptionDesktop }}
    </p>
    <p class="text-sm text-gray-600 mobile-only">
      <strong>Description:</strong> {{ truncatedDescriptionMobile }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["job"],
  computed: {
    truncatedDescriptionDesktop() {
      const maxLengthDesktop = 200;
      return this.truncateText(this.job.description, maxLengthDesktop);
    },
    truncatedDescriptionMobile() {
      const maxLengthMobile = 200;
      return this.truncateText(this.job.description, maxLengthMobile);
    },
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },
    goToJobDetails() {
      this.$router.push({ name: "JobDetails", params: { id: this.job._id } });
    },
  },
};
</script>

<style scoped>
.desktop-only {
  display: block;
}

.card {
  @apply max-w-md mx-auto;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 1200px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
