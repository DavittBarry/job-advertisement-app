<template>
  <div
    class="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition cursor-pointer"
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
      const maxLengthDesktop = 50;
      return this.truncateText(this.job.description, maxLengthDesktop);
    },
    truncatedDescriptionMobile() {
      const maxLengthMobile = 25;
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
  },
};
</script>

<style>
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 767px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
