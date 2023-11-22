<template>
  <div class="flex p-4 bg-white border rounded-lg shadow-md">
    <div class="flex-grow">
      <h3 class="text-xl font-semibold mb-2">{{ story.jobTitle }}</h3>
      <p class="text-sm text-gray-600 mb-2">
        <strong>Name:</strong> {{ story.name }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Story:</strong> {{ truncatedDescription }}
      </p>
    </div>
    <div class="flex-shrink-0">
      <img
        :src="story.imageUrl"
        alt="Success Story"
        class="w-24 h-24 object-cover rounded-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["story"],
  computed: {
    truncatedDescription() {
      const maxLength = 100;
      return this.story.story.length > maxLength
        ? this.story.story.substring(0, maxLength) + "..."
        : this.story.story;
    },
  },
};
</script>
