<template>
  <v-container class="pl-3">
    <v-row justify="center">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="3"
        sm="6"
        xs="6"
      >
        <v-sheet
          :elevation="2"
          max-width="300"
          :height="360"
          border
          rounded
          class="d-flex flex-column justify-space-between"
        >
          <img :src="product.image" class="productImage rounded" />
          <div class="productName font-weight-bold pl-2">
            {{ product.name }}
          </div>
          <div class="buttonContainer">
            <v-btn class="bg-black font-weight-md" width="92%">Show Full</v-btn>
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
.buttonContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.productImage {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.productName {
  font-size: 20px;
}
</style>
