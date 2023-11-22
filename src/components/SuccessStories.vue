<template>
  <section class="bg-brand-nav-bg-light py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SuccessStoriesCard
          v-for="story in stories"
          :key="story.name"
          :story="story"
        />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import SuccessStoriesCard from "./SuccessStoriesCard.vue";

export default {
  name: "SuccessStories",
  components: {
    SuccessStoriesCard,
  },
  data() {
    return {
      stories: [],
    };
  },
  methods: {
    async fetchStories() {
      const apiURL = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.get(`${apiURL}/api/storyEntries`);
        this.stories = response.data;
        console.log("Fetched stories:", this.stories);
      } catch (error) {
        console.error("An error occurred while fetching the stories:", error);
      }
    },
  },
  mounted() {
    this.fetchStories();
  },
};
</script>
