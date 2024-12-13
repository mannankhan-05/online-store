<template>
  <v-container class="pl-3 mt-6">
    <!-- input field for product search functionality -->
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8" xs="10">
        <div class="rounded-input-container">
          <input
            type="text"
            class="rounded-input"
            placeholder="Search for Products..."
            v-model="search"
            @keyup.enter="
              () => {
                resetPagination();
                fetchProductsBySearch(search);
              }
            "
          />
          <v-icon class="search-icon" left>mdi-magnify-minus-outline</v-icon>
          <v-icon
            class="search-icon-right"
            @click="fetchProductsBySearch(search)"
            >mdi-send-circle-outline</v-icon
          >
        </div>

        <!-- autocomplete box -->
        <!-- if (searches is empty) -->
        <div
          class="autocomplete-box"
          v-if="searchHistoryBySearchQuery.length == 0 && search.length != 0"
        >
          <v-row>
            <v-col cols="12" lg="7" md="7" sm="8" xs="8">
              <v-card class="autocomplete-card mx-auto" :elevation="12">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="searches">
                        <v-icon class="mr-2">mdi-magnify-remove-outline</v-icon>
                        No search history found
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- if (searches is not empty) -->
        <div
          class="autocomplete-box"
          v-if="searchHistoryBySearchQuery.length > 0 && search.length != 0"
        >
          <v-row>
            <v-col cols="12" lg="7" md="7" sm="8" xs="8">
              <v-card class="autocomplete-card mx-auto" :elevation="12">
                <v-list dense>
                  <v-list-item
                    v-for="history in searchHistoryBySearchQuery"
                    :key="history.id"
                  >
                    <v-list-item-content
                      @click="search = history.search"
                      class="d-flex align-center"
                    >
                      <v-icon class="mr-5">mdi-history</v-icon>
                      <v-list-item-title class="searches">{{
                        history.search
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- Category filter chips -->
    <v-sheet class="py-4 px-1" v-if="search.length == 0">
      <v-row class="d-flex align-center mt-2 mb-3" justify="center">
        <v-chip-group
          selected-class="text-orange"
          mandatory
          variant="label"
          v-model="category"
        >
          <v-chip
            variant="label"
            class="chip mr-2"
            @click="
              () => {
                handleChipClick('');
              }
            "
          >
            <v-avatar left>
              <v-icon color="orange">mdi-view-list</v-icon>
            </v-avatar>
            All
          </v-chip>
          <v-chip
            class="chip"
            :value="category.category"
            v-for="category in allCategories"
            :key="category.id"
            @click="
              () => {
                resetPagination();
                handleChipClick(category.category);
              }
            "
          >
            {{ category.category }}
          </v-chip>
        </v-chip-group>
      </v-row>
    </v-sheet>

    <!-- Displaying the skeleton loader when the products are loading -->
    <v-row>
      <v-col
        v-for="product in searchProducts"
        :key="product.id"
        cols="12"
        md="3"
        sm="6"
        xs="6"
      >
        <v-skeleton-loader
          v-if="productsLoading"
          class="mx-auto border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Displaying the empty icon if the searched product doesn't exists -->
    <v-empty-state
      v-if="products.length === 0"
      icon="mdi-magnify"
      title="We couldn't find a match."
      text="We couldn't find any product matching your search"
    ></v-empty-state>

    <!-- Displaying all the products in a grid -->
    <v-row justify="center" v-else v-show="!productsLoading">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        lg="3"
        md="3"
        sm="4"
        xs="6"
      >
        <v-sheet
          :elevation="2"
          max-width="350"
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
              {{ product.product_category.category }}
            </div>
          </div>
          <div class="buttonContainer">
            <v-btn
              v-if="product.stock > 0"
              class="show-full-button font-weight-md"
              width="92%"
              @click="showFullProduct(product.id)"
              >Discover Full</v-btn
            >
            <v-btn v-else class="out-of-stock-button" width="92%"
              >Out Of Stock</v-btn
            >
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Loading More Products (Progress Circular) -->
    <div class="loading-more-products">
      <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
    </div>

    <!-- up button -->
    <div
      v-if="showUpButton"
      class="upButton d-none d-sm-flex"
      @click="scrollToTop"
    >
      <v-icon icon="mdi-arrow-up"></v-icon>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
export default defineComponent({
  data() {
    return {
      searchHistoryBySearchQuery: [] as object[],
      products: [] as object[],
      allCategories: [] as object[],
      search: "" as string,
      selectedProductId: 0 as number,
      category: "" as string,
      limit: 4, // no. of products per page
      page: 0, // current page
      totalPages: 0, // total number of pages
      isLoading: false, // To prevent multiple loads
      productsLoading: false as boolean,
      productsByCategoryLimit: 4,
      productsByCategoryPage: 0,
      productsByCategoryTotalPages: 0,
      showUpButton: false as boolean,
      searchProductsLimit: 4,
      searchProductsPage: 0,
      searchProductsTotalPages: 0,
    };
  },
  async mounted() {
    this.page = 0;
    await this.showAllProducts();
    await this.getAllCategories();
    window.addEventListener("scroll", this.handleScroll); // Add scroll event listener
  },
  methods: {
    resetPagination() {
      this.page = 0;
      this.totalPages = 0;
      this.productsByCategoryPage = 0;
      this.productsByCategoryTotalPages = 0;
      this.searchProductsPage = 0;
      this.searchProductsTotalPages = 0;
      this.products = [];
    },
    async handleChipClick(chip: string) {
      await this.resetPagination();
      if (chip == "") {
        this.category = "";
        await this.showAllProducts();
      } else {
        this.category = chip;
        await this.sortProductsByCategories();
      }
    },
    async getAllCategories() {
      const response = await axios.get("http://localhost:4000/allCategories");
      this.allCategories = response.data;
      console.log(this.allCategories);
    },
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
      try {
        let response1 = await axios.post(
          "http://localhost:4000/AllProductsByCategories",
          {
            category: this.category,
          }
        );
        let categoryId = response1.data.id;
        console.log(categoryId);

        const response2 = await axios.get(
          `http://localhost:4000/productsByCategory/${categoryId}`,
          {
            params: {
              limit: this.productsByCategoryLimit,
              page: this.productsByCategoryPage, // Pass the current
            },
          }
        );

        if (this.productsByCategoryPage === 0) {
          this.products = response2.data.products;
        } else {
          this.products = [...this.products, ...response2.data.products];
        }
        this.productsByCategoryTotalPages = Math.ceil(
          response2.data.totalProducts / this.productsByCategoryLimit
        );
      } catch (err) {
        console.log("Error sorting products by categories: " + err);
      }
    },
    async showAllProducts() {
      try {
        const response = await axios.get("http://localhost:4000/products", {
          params: {
            limit: this.limit,
            page: this.page, // Pass the current page (offset = page * limit)
          },
        });
        // When loading more, append the products instead of replacing
        if (this.page === 0) {
          this.products = response.data.products; // Initial load
        } else {
          this.products = [...this.products, ...response.data.products]; // Append new products
        }
        this.totalPages = Math.ceil(response.data.totalProducts / this.limit); // Calculate total pages
      } catch (err) {
        console.log("Error fetching all products: " + err);
      }
    },
    async loadMoreProducts() {
      if (this.isLoading) return; // Prevent multiple triggers

      this.isLoading = true;

      // Load more products for all products if no category is selected
      if (this.category === "" && this.page < this.totalPages - 1) {
        this.page += 1;
        await this.showAllProducts();
      }
      // Load more products by category if a category is selected
      else if (
        this.category !== "" &&
        this.productsByCategoryPage < this.productsByCategoryTotalPages - 1
      ) {
        this.productsByCategoryPage += 1;
        await this.sortProductsByCategories();
      }
      // Load more products by search if a search query is entered
      else if (
        this.search.length > 0 &&
        this.searchProductsPage < this.searchProductsTotalPages - 1
      ) {
        this.searchProductsPage += 1;
        await this.fetchProductsBySearch(this.search);
      }

      this.isLoading = false;
    },
    handleScroll() {
      // show the up button only when scrolled 100px or more
      this.showUpButton = window.scrollY > 100;

      // Detect when user is near the bottom of the page
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 800; // 800px before the bottom
      if (scrollPosition >= threshold) {
        this.loadMoreProducts();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    async fetchProductsBySearch(searchQuery: string) {
      try {
        // Add search history if it not exists
        await axios.post("http://localhost:4000/addSearchHistory", {
          search: searchQuery,
        });

        // fetching products by search query
        const response = await axios.post(
          "http://localhost:4000/searchProducts",
          {
            searchQuery: searchQuery,
          },
          {
            params: {
              limit: this.searchProductsLimit,
              page: this.searchProductsPage,
            },
          }
        );

        if (this.searchProductsPage === 0) {
          this.products = response.data.products;
        } else {
          this.products = [...this.products, ...response.data.products];
        }
        this.searchProductsTotalPages = Math.ceil(
          response.data.totalProducts / this.searchProductsLimit
        );
      } catch (err) {
        console.log("Error fetching products by search: " + err);
      }
    },
    async fetchHistoryBySearch(searchQuery: string) {
      // Clear the previous timeout if it exists
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      // Set a new timeout
      debounceTimeout = setTimeout(async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/searchHistoriesBySearch",
            {
              search: searchQuery,
            }
          );
          if (searchQuery == "") {
            this.searchHistoryBySearchQuery = [];
          }
          this.searchHistoryBySearchQuery = response.data.searches;
        } catch (err) {
          console.log("Error fetching search history by search: " + err);
        }
      }, 600);
    },
  },
  watch: {
    search(newSearch: string) {
      console.log("watching search property : " + newSearch);
      this.fetchHistoryBySearch(newSearch);
    },
  },
});
</script>

<style>
.rounded-input-container {
  position: relative;
  max-width: 800px;
  width: 100%;
}

.rounded-input {
  width: 100%;
  height: 55px;
  padding: 15px 20px;
  padding-left: 45px;
  font-size: 20px;
  border: none;
  border-radius: 60px;
  outline: none;
  transition: 0.3s ease-in-out;
  background: linear-gradient(135deg, #dbe0eb, #f3f5f7);
}

.rounded-input:hover {
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
}

.rounded-input:focus {
  border-color: orange;
  box-shadow: 0 0 0 3px orange, 0 4px 8px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.1), 0 15px 25px rgba(0, 0, 0, 0.05);
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 28px;
  top: 25%;
  transition: 0.3s ease-in-out;
}
.search-icon:hover {
  transform: scale(1.1);
  color: orange;
}

.search-icon-right {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 34px;
  color: #888;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.search-icon-right:hover {
  transform: scale(1.1);
  color: orange;
}

.autocomplete-box {
  position: absolute;
  width: 100%;
  /* width: 780px; */
}

.autocomplete-suggestion-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 15px;
  margin-right: 10px;
}

.autocomplete-suggestion-name {
  position: absolute;
  left: 70px;
  top: 15px;
  font-weight: 500;
}

.autocomplete-suggestion-icon {
  position: absolute;
  right: 15px;
  top: 15px;
  color: orange;
}

.autocomplete-card {
  width: 100%;
  border-radius: 10px;
}

.searches {
  font-size: 18.5px;
  font-weight: 300;
}

.chip {
  border: 1px solid orange;
  transition: 0.3s ease-in-out;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: auto;
  transition: 0.2s ease-in-out;
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
  color: rgb(143, 110, 49);
  margin-left: 5px;
  font-weight: bold;
}

.productCategory {
  text-align: right;
  padding-right: 10px;
  padding-top: 1mm;
  padding-bottom: 3mm;
  font-size: 21px;
  font-weight: 600;
  color: rgb(155, 126, 71);
}

.categoryHeading {
  color: black;
}

.show-full-button {
  background-color: rgb(155, 126, 71);
  color: white !important;
  border-radius: 30px;
  transition: 0.3s ease-in-out;
}

.show-full-button:hover {
  color: black !important;
}

.out-of-stock-button {
  background-color: red;
  color: white !important;
  border-radius: 30px;
}

.loading-more-products {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.sheet {
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.sheet:hover {
  transform: translateY(-5px) scale(1.015);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  background-color: #fafafa;
}

.upButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: orange;
  color: white;
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  right: 40px;
  transition: 0.3s ease-in-out;
}

.upButton:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
