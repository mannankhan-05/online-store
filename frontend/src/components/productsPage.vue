<template>
  <v-container class="pl-3 mt-15">
    <v-sheet class="py-4 px-1">
      <v-chip-group selected-class="text-primary" mandatory>
        <v-chip text="Clothing"></v-chip>
        <v-chip text="Shoes"></v-chip>
        <v-chip text="Electronics"></v-chip>
        <v-chip text="Books"></v-chip>
        <v-chip text="Personal Care"></v-chip>
        <v-chip text="Food"></v-chip>
        <v-chip text="Beverage"></v-chip>
      </v-chip-group>
    </v-sheet>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8" xs="10">
        <v-textarea
          class="searchProducts"
          clearable
          label="Search for Products"
          prepend-inner-icon="mdi-card-search-outline"
          variant="outlined"
          rows="1"
          v-model="search"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        v-for="product in searchProducts"
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
          class="sheet d-flex flex-column justify-space-between"
        >
          <img :src="product.image" class="productImage rounded" />
          <div class="productName font-weight-bold pl-2">
            {{ product.name }}
          </div>
          <div class="productPrice">
            <div class="d-inline">{{ product.price }}</div>
            <p class="dollar d-inline">$</p>
          </div>
          <div class="productCategory">
            <div class="d-inline">
              <p class="categoryHeadnig font-weight-thin d-inline">
                category :
              </p>
              {{ product.category }}
            </div>
          </div>
          <div class="buttonContainer">
            <v-btn
              class="bg-black font-weight-md"
              width="92%"
              @click="showFullProduct(product.id)"
              >Show Full</v-btn
            >
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
      search: "" as string,
      selectedProductId: 0 as number,
    };
  },
  computed: {
    // Filtering the products based on the search input
    searchProducts: function () {
      return this.products.filter((product: any) => {
        return product.name.match(this.search);
      });
    },
  },
  async mounted() {
    // Fetching all the products from the backend
    try {
      const response = await axios.get("http://localhost:4000/products");
      this.products = response.data;
    } catch (err) {
      console.log("Error fetching all products : " + err);
    }
  },
  methods: {
    showFullProduct(productId: number) {
      this.selectedProductId = productId;
      this.$router.push({
        name: "fullProduct",
        params: { userId: this.$store.state.userId, productId: productId },
      });
    },
  },
});
</script>

<style>
.buttonContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: auto;
}

.productImage {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.productName {
  display: flex;
  top: 68%;
  font-size: 22px;
  margin-top: 10px;
}

.productPrice {
  display: flex;
  align-items: center;
  top: 72%;
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(87, 85, 85);
}

.dollar {
  color: black;
  margin-left: 5px;
}

.productCategory {
  text-align: right;
  padding-right: 10px;
  padding-top: 1mm;
  font-size: 21px;
  font-weight: 600;
  color: black;
}

.categoryHeadnig {
  color: black;
}

.sheet {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sheet:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* Increases the shadow for a 'lifted' effect */
  border-color: #706f6f;
}

.searchProducts {
  font-size: 35px;
  height: 67px;
  font-weight: 550;
  position: fixed; /* Fixes the element's position */
  top: 100px; /* Adjust top distance from the top of the viewport */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px); /* Adjust width as needed */
  max-width: 800px; /* Set a maximum width */
  z-index: 1000; /* Ensure it stays on top of other elements */
  padding: 5px; /* Optional: padding around the text area */
  background-color: #f0ecec;
  border-radius: 5px;
}
</style>
