<template>
  <div>
    <v-container class="d-flex justify-center align-center">
      <v-row align="center" justify="space-between">
        <!-- Text Section -->
        <v-col cols="12" md="6" xs="12" class="text-section">
          <h1 class="hero-heading">
            Discover <span class="Everything-word">Everything</span> You
          </h1>
          <h2 class="hero-heading mb-4">
            Love in One <span class="Place-word">Place</span>
          </h2>
          <p class="hero-subheading mb-15">
            From trendy clothes to the latest gadgets, delicious food, and
            beverages. <span class="subheading-words">We Have It All!</span>
          </p>
          <router-link :to="{ name: 'products' }">
            <v-btn class="shop-now-btn" @click="gotoProducts">
              Shop Now
              <v-icon class="button-arrow-icon">mdi-arrow-right</v-icon>
            </v-btn>
          </router-link>
        </v-col>

        <!-- Image Section -->
        <v-col cols="12" md="6" xs="12" class="image-section">
          <v-img
            :src="require('@/assets/landingPageImage.svg')"
            aspect-ratio="1.5"
            class="hero-image d-none d-sm-flex"
            cover
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- Top Selling Products Section -->
    <!-- <top-selling-products /> -->

    <!-- All Categories Section -->
    <all-categories />

    <!-- Log In Section -->
    <login-section />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import topSellingProducts from "../components/topSellingProducts.vue";
import allCategories from "../components/allCategories.vue";
import loginSection from "../components/loginSection.vue";

export default defineComponent({
  components: {
    // topSellingProducts,
    allCategories,
    loginSection,
  },
});
</script>

<style scoped>
.hero-section {
  height: 80vh;
  background: linear-gradient(120deg, #ffcc80, #ffab91);
  border-radius: 20px;
  padding: 20px;
  animation: fadeIn 1.5s ease-in-out;
}

.text-section {
  text-align: left;
  color: #fff;
  animation: slideInFromLeft 1s ease-in-out;
}

.hero-heading {
  font-size: 3rem;
  font-weight: bold;
  color: black;
  line-height: 1.2; /* Adjust spacing between lines */
}

.Everything-word,
.Place-word {
  color: #cc8d30;
  font-weight: 500;
}

.hero-subheading {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: black;
}

.subheading-words {
  font-size: 1.3rem;
  color: rgb(128, 86, 8);
  font-weight: bold;
}

.shop-now-btn {
  font-size: 1.1rem;
  padding: 8px 40px 20px;
  border-radius: 30px;
  background-color: rgb(150, 119, 63);
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
  transition: 0.3s ease-in-out;
}

.shop-now-btn:hover {
  background-color: rgb(165, 117, 29);
  transform: scale(1.05);
}

.button-arrow-icon {
  font-size: 1.5rem;
  margin-left: 10px;
  transition: 0.4s ease-in-out;
}

.shop-now-btn:hover .button-arrow-icon {
  transform: translateX(13px);
}

.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInFromRight 1s ease-in-out;
}

.hero-image {
  border-radius: 40px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
