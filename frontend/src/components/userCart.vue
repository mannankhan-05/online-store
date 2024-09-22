<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>mannan khan</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      userProductsInCart: [] as object[],
    };
  },
  async mounted() {
    let response = await axios.get(
      `http://localhost:4000/userProducts/${this.$route.params.userId}`
    );
    this.userProductsInCart = response.data;
    console.log(this.userProductsInCart);
  },
});
</script>

<style></style>
