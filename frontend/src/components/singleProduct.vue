<template>
  <v-container>
    <div>
      <v-icon
        class="backButton"
        @click="this.$router.go(-1)"
        icon="mdi-arrow-left-circle"
      >
      </v-icon>
    </div>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      selectedProduct: [] as object,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/${this.$route.params.productId}`
      );
      this.selectedProduct = response.data;
      console.log(this.selectedProduct);
    } catch (err) {
      console.log("Error fetching single product : " + err);
    }
  },
});
</script>

<style>
.backButton {
  position: absolute;
  top: 80px;
  left: 15px;
  font-size: 36px;
}
</style>
