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
      <v-col cols="12" xs="12" sm="8" md="6" lg="6">
        <img :src="selectedProduct.image" class="singleProductImage" />
      </v-col>

      <v-col cols="12" xs="12" sm="6" md="6" lg="6">
        <v-btn class="AddToCartButton" variant="tonal">Add To Cart</v-btn>
      </v-col>

      <div class="d-inline">
        <h1 class="descriptionHeading text-decoration-underline">
          Description :
        </h1>
        <p class="singleProductDescription">
          {{ selectedProduct.description }}
        </p>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      selectedProduct: {} as object,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/${this.$route.params.productId}`
      );
      this.selectedProduct = response.data;
    } catch (err) {
      console.log("Error fetching single product : " + err);
    }
  },
});
</script>

<style>
.backButton {
  position: fixed;
  top: 80px;
  left: 15px;
  font-size: 36px;
}

.singleProductImage {
  width: 70%;
  height: 70%;
  border: 1px solid black;
  border-radius: 3px;
}

.singleProductDescription {
  font-size: 23px;
}

.AddToCartButton {
  width: 80%;
  height: 350px;
  border-radius: 5px;
  font-size: 21px;
  margin-top: 380px;
}

.AddToCartButton:hover {
  background-color: #f5f5f5;
  color: black;
}
</style>
