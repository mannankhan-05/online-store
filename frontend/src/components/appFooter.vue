<template>
  <v-container>
    <v-row>
      <v-col>
        <v-footer color="black" dark app class="footer"> </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  height: 20%;
}
</style>
