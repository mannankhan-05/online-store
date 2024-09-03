<template>
  <v-app>
    <appNavbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appNavbar from "./components/appNavbar.vue";

export default defineComponent({
  name: "App",
  components: {
    appNavbar,
  },

  data() {
    return {
      //
    };
  },
});
</script>
