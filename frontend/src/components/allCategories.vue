<template>
  <v-container class="categories-section">
    <h2 class="categories-heading">
      <v-icon class="categories-icon">mdi-package-variant</v-icon>
      Dive Into Our Collections
    </h2>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="3"
        md="3"
        sm="6"
        xs="6"
        v-for="category in categories"
        :key="category.id"
      >
        <v-card class="category-card">
          <v-card-title class="category-title">
            <v-icon class="category-icon mr-2">mdi-grid</v-icon>
            {{ category.category }}</v-card-title
          >
          <div class="category-description">
            Explore a wide range of
            <span class="category-name">{{
              category.category.toLowerCase()
            }}</span>
            products tailored for you!
          </div>
          <v-btn class="explore-btn">
            Explore Now
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      categories: [] as object[],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:4000/allCategories");
    this.categories = response.data;
  },
});
</script>

<style scoped>
.categories-section {
  margin-top: 50px;
  padding: 40px 20px;
  background: linear-gradient(120deg, #ffefdf, #ffd1a1);
  border-radius: 20px;
  animation: fadeIn 1.5s ease-in-out;
}

.categories-heading {
  font-size: 2.5rem;
  font-weight: bold;
  color: #663300;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.categories-icon {
  font-size: 2.5rem;
  margin-right: 10px;
  color: #cc8d30; /* Match the theme */
  animation: fadeIn 1s ease-in-out;
}

.category-card {
  height: 270px;
  padding: 20px;
  background: linear-gradient(135deg, #fff7e6, #ffe0b3);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: 0.3s ease-in-out;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #663300;
  margin-bottom: 10px;
}

.category-icon {
  font-size: 1.8rem;
  color: #cc8d30;
}

.category-description {
  font-size: 0.95rem;
  color: #383737;
  margin-bottom: 15px;
}

.category-name {
  color: rgb(128, 98, 42);
  font-weight: bold;
  font-size: 20px;
}

.explore-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #cc8d30;
  color: white;
  font-size: 0.9rem;
  border-radius: 20px;
  font-weight: bold;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
