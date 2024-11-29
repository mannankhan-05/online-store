<template>
  <v-container class="carousel-container">
    <!-- Heading of top rated -->
    <div class="mb-10">
      <!-- <v-divider class="border-opacity-50 header-top-divider"></v-divider> -->
      <h1 class="d-flex justify-center">
        <!-- <v-icon color="orange" class="diamond-icon">mdi-star-outline</v-icon>
        <v-icon color="orange" class="diamond-icon">mdi-star-outline</v-icon>
        <v-icon color="orange" class="mr-4 diamond-icon"
          >mdi-star-outline</v-icon
        > -->
        <v-icon class="crown-icon mt-2 mr-2">mdi-crown-outline</v-icon>
        <h2 class="top-selling-heading">Top Selling Products</h2>
        <!-- <v-icon color="orange" class="ml-4 diamond-icon"
          >mdi-star-outline</v-icon
        >
        <v-icon color="orange" class="diamond-icon">mdi-star-outline</v-icon>
        <v-icon color="orange" class="diamond-icon">mdi-star-outline</v-icon> -->
      </h1>
      <!-- <v-divider class="border-opacity-50 header-bottom-divider"></v-divider> -->
    </div>

    <!-- Products in carousel -->
    <v-carousel
      hide-delimiters
      height="auto"
      class="custom-carousel"
      v-if="groupedProducts.length != 0"
    >
      <v-carousel-item
        v-for="(productGroup, index) in groupedProducts"
        :key="index"
      >
        <v-row justify="center">
          <v-col
            v-for="product in productGroup"
            :key="product.id"
            cols="12"
            lg="3"
            md="4"
            sm="6"
            xs="12"
          >
            <v-card :elevation="4" class="selling-products-card">
              <v-img :src="product.product.image" height="200px" contain>
                <v-icon class="image-star-icon">mdi-star</v-icon>
              </v-img>
              <v-card-title>
                <h3>{{ product.product.name }}</h3>
              </v-card-title>
              <v-card-text>{{
                elipses(product.product.description, 30)
              }}</v-card-text>
              <v-card-actions>
                <v-btn class="learn-more-button">Learn More</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      topSellingProducts: [] as object[], // Original product list
      groupedProducts: [] as object[][], // Products grouped into sets of 4
    };
  },
  methods: {
    groupProducts() {
      this.groupedProducts = [];
      for (let i = 0; i < this.topSellingProducts.length; i += 4) {
        this.groupedProducts.push(this.topSellingProducts.slice(i, i + 4));
      }
    },
    elipses(word: string, length: number) {
      return word.length > length ? word.substring(0, length) + "..." : word;
    },
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:4000/productSales`);
      this.topSellingProducts = response.data;
      await this.groupProducts(); // Group products into sets of 4
      console.log(this.groupedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
});
</script>

<style scoped>
.carousel-container {
  margin-top: 100px;
  background: linear-gradient(
    135deg,
    #fff7e6,
    #ffe0b3
  ); /* Gradient background */
  padding: 20px;
  border-radius: 15px; /* Smooth edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-carousel {
  max-height: 500px; /* Limit carousel height */
  overflow: hidden;
  background-color: transparent; /* Ensure it matches container */
}

.header-top-divider {
  margin-bottom: 10px;
}

.header-bottom-divider {
  margin-top: 10px;
  margin-bottom: 70px;
}

.diamond-icon {
  margin-top: 7px;
  font-size: 2rem;
}

.selling-products-card {
  transition: 0.3s ease-in-out;
}

.selling-products-card:hover {
  transform: scale(1.05);
}

.crown-icon {
  font-size: 2.5rem;
  margin-right: 10px;
  color: #cc8d30; /* Match the theme */
  animation: fadeIn 1s ease-in-out;
}

.top-selling-heading {
  font-size: 2.5rem;
  font-weight: bold;
  color: #663300;
}

.image-star-icon {
  position: absolute;
  top: 15px;
  right: 10px;
  color: orange;
}

.learn-more-button {
  width: 100%;
  padding: 4px 20px;
  background-color: rgb(206, 206, 82);
  color: black;
  font-weight: bold;
  border-radius: 30px;
  transition: 0.2s ease-in-out;
}

.learn-more-button:hover {
  background-color: rgb(156, 156, 58);
  color: white;
}
</style>
