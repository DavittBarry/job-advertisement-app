<template>
  <section class="bg-brand-nav-bg-light py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SuccessStoriesCard
          v-for="story in displayedStories"
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
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    displayedStories() {
      // Show only 2 stories on tablet and mobile
      if (this.windowWidth < 1024) {
        return this.stories.slice(0, 2);
      }
      // Show all stories on desktop
      return this.stories;
    },
  },
  methods: {
    async fetchStories() {
      const apiURL = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.get(`${apiURL}/api/storyEntries`);
        this.stories = response.data;
      } catch (error) {
        console.error("An error occurred while fetching the stories:", error);
      }
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.fetchStories();
    window.addEventListener("resize", this.updateWindowWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
};
</script>
