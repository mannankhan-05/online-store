<template>
  <v-container class="pl-3 mt-15">
    <!-- input field for product search functionality -->
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8" xs="10">
        <v-text-field
          class="searchProducts"
          clearable
          label="Search for Products"
          prepend-inner-icon="mdi-card-search-outline"
          v-model="search"
          variant="outlined"
          placeholder="Search for products..."
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Category filter chips -->
    <v-sheet class="py-4 mb-4 px-1">
      <v-row class="d-flex align-center mt-2" justify="center">
        <v-chip-group
          selected-class="text-primary"
          mandatory
          variant="label"
          v-model="category"
          @click="sortProductsByCategories"
        >
          <v-chip variant="label" class="mr-2" @click="showAllProducts"
            >All</v-chip
          >
          <v-chip value="Clothing">Clothing</v-chip>
          <v-chip value="Shoes">Shoes</v-chip>
          <v-chip value="Electronics">Electronics</v-chip>
          <v-chip value="Books">Books</v-chip>
          <v-chip value="Personal Care">Personal Care</v-chip>
          <v-chip value="Food">Food</v-chip>
          <v-chip value="Beverage">Beverage</v-chip>
        </v-chip-group>
      </v-row>
    </v-sheet>

    <!-- Displaying the empty icon if the searched product doesn't exists -->
    <v-empty-state
      v-if="searchProducts.length === 0"
      icon="mdi-magnify"
      title="We couldn't find a match."
      text="We couldn't find any product matching your search"
    ></v-empty-state>

    <!-- Displaying all the products in a grid -->
    <v-row v-else justify="center">
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
          <v-row>
            <v-col cols="8">
              <div class="productName font-weight-bold pl-2">
                {{ product.name }}
              </div>
            </v-col>
            <v-col cols="4">
              <div class="productPrice mt-2">
                <p class="dollar d-inline">$</p>
                <div class="d-inline singleProductPrice">
                  {{ product.price }}
                </div>
              </div>
            </v-col>
          </v-row>
          <div class="productCategory">
            <div class="d-inline">
              <p class="categoryHeading font-weight-thin d-inline">
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

    <!-- up button -->
    <div class="upButton" @click="scrollToTop">
      <v-icon icon="mdi-arrow-up"></v-icon>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      products: [] as object[],
      search: "" as string,
      selectedProductId: 0 as number,
      category: "" as string,
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
    this.showAllProducts();
  },
  methods: {
    showFullProduct(productId: number) {
      this.selectedProductId = productId;
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push({
          name: "fullProduct",
          params: { userId: this.$store.state.userId, productId: productId },
        });
      } else {
        this.$router.push({
          name: "fullProduct",
          params: { userId: 0, productId: productId },
        });
      }
    },
    async sortProductsByCategories() {
      console.log(this.category);
      let response = await axios.post(
        "http://localhost:4000/productsByCategory",
        {
          category: this.category,
        }
      );
      this.products = response.data;
    },
    async showAllProducts() {
      try {
        const response = await axios.get("http://localhost:4000/products");
        this.products = response.data;
      } catch (err) {
        console.log("Error fetching all products : " + err);
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
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
  transition: 0.2s ease-in-out;
}

.buttonContainer:hover {
  transform: scale(1.02);
}

.productImage {
  width: 100%;
  height: 60%;
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
  font-size: 20px;
  color: rgb(59, 58, 58);
}

.dollar {
  color: black;
  margin-left: 5px;
}

.productCategory {
  text-align: right;
  padding-right: 10px;
  padding-top: 1mm;
  padding-bottom: 3mm;
  font-size: 21px;
  font-weight: 600;
  color: black;
}

.categoryHeading {
  color: black;
}

.sheet {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sheet:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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

.upButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  box-shadow: 1px 1px 5px 1px orange;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: 0.3s ease-in-out;
}

.upButton:hover {
  cursor: pointer;
  transform: scale(1.06);
}
</style>
