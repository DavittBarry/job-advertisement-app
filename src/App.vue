<template>
  <div class="min-h-screen flex flex-col bg-white">
    <NavBar />
    <div class="flex-grow">
      <router-view />
    </div>
    <FooterTemplate />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import FooterTemplate from "./components/FooterTemplate";

export default {
  components: {
    NavBar,
    FooterTemplate,
  },
};
</script>
