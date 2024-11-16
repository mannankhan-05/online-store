<template>
  <v-container class="d-flex justify-center">
    <div class="portion-1">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
          <h3>Everything You Need, All in One Place</h3>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
          <v-img
            :width="460"
            aspect-ratio="1"
            cover
            class="portion-1-image"
            :src="require('@/assets/landingPageImage.svg')"
          ></v-img>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style>
.portion-1 {
  height: 70vh;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  padding: 0;
  border-radius: 30px;
  border: 1px solid #333;
}

.portion-1-image {
  border-radius: 30px;
}
</style>
