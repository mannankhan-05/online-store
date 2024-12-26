<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Header Section -->
    <v-row justify="center">
      <v-col cols="12" md="6" sm="12">
        <h2 class="header-title d-flex justify-center">
          <v-icon color="orange mr-2">mdi-poll</v-icon>
          Sales Report
        </h2>
        <v-divider :thickness="2" class="border-opacity-50"></v-divider>
      </v-col>
    </v-row>

    <!-- Sales Report Statistics -->
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      weekSales: 0 as number,
      monthSales: 0 as number,
      yearSales: 0 as number,
    };
  },
  async mounted() {
    console.log("mounted");
  },
});
</script>

<style scoped></style>
