<template>
  <v-app>
    <appNavbar />
    <v-main>
      <router-view />
    </v-main>
    <appFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appNavbar from "./components/appNavbar.vue";
import appFooter from "./components/appFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    appNavbar,
    appFooter,
  },

  data() {
    return {
      //
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap");
body {
  font-family: "SUSE", sans-serif;
}
</style>
