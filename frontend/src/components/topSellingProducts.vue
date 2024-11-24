<template>
  <v-container class="carousel-container">
    <!-- Heading of top rated -->
    <div>
      <v-divider class="border-opacity-50 header-top-divider"></v-divider>
      <h1 class="d-flex justify-center">
        <span class="top-selling-heading">Top Selling Products</span>
        <v-icon color="orange" class="ml-4 diamond-icon"
          >mdi-cards-diamond</v-icon
        >
        <v-icon color="orange" class="diamond-icon">mdi-cards-diamond</v-icon>
        <v-icon color="orange" class="diamond-icon">mdi-cards-diamond</v-icon>
        <v-icon color="orange" class="diamond-icon">mdi-cards-diamond</v-icon>
      </h1>
      <v-divider class="border-opacity-50 header-bottom-divider"></v-divider>
    </div>

    <!-- Products in carousel -->
    <v-carousel hide-delimiters v-if="groupedProducts.length != 0">
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
            md="3"
            sm="6"
            xs="12"
          >
            <v-card :elevation="12">
              <v-img :src="product.image" height="200px" contain></v-img>
              <v-card-title>
                <h3>{{ product.product.name }}</h3>
              </v-card-title>
              <v-card-text>{{ product.product.description }}</v-card-text>
              <v-card-actions>
                <v-btn color="primary">Buy Now</v-btn>
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
</style>
