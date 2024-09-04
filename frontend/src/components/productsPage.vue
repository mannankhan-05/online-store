<template>
  <v-container class="pl-3">
    <v-row>
      <v-col v-for="product in products" :key="product.id">
        <v-sheet :elevation="2" max-width="300" :height="360" border rounded>
          <div class="productName">
            {{ product.name }}
          </div>
          <div>
            <v-btn class="showFullButton">Show Full</v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <addProduct />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import addProduct from "./addProduct.vue";
import axios from "axios";

export default defineComponent({
  components: {
    addProduct,
  },
  data() {
    return {
      products: [] as object[],
    };
  },
  async mounted() {
    // Fetching all the products from the backend
    try {
      const response = await axios.get("http://localhost:4000/products");
      this.products = response.data;
      console.log(this.products);
    } catch (err) {
      console.log("Error fetching all products : " + err);
    }
  },
});
</script>

<style>
/* .showFullButton {
  display: flex;
  justify-content: center;
  width: 90%;
  position: absolute;
  bottom: 5px;
} */
</style>
