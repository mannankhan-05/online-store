<template>
  <v-footer class="footer bg-black text-center d-flex flex-column py-5">
    <!-- Social Media Icons -->
    <div class="social-icons mb-4">
      <v-icon class="icon" icon="mdi-facebook"></v-icon>
      <v-icon class="icon" icon="mdi-linkedin"></v-icon>
      <v-icon class="icon" icon="mdi-instagram"></v-icon>
      <v-icon class="icon" icon="mdi-twitter"></v-icon>
    </div>

    <!-- Categories Section -->
    <div class="categories pb-10 pt-10">
      <h2 class="text-decoration-underline text-light">Categories</h2>
      <v-card class="mx-auto" elevation="2" outlined>
        <v-list>
          <v-list-item class="category-item">Pants</v-list-item>
          <v-list-item class="category-item">Shirts</v-list-item>
          <v-list-item class="category-item">Shoes</v-list-item>
          <v-list-item class="category-item">Accessories</v-list-item>
        </v-list>
      </v-card>
    </div>

    <v-divider></v-divider>

    <!-- Copyright Section -->
    <div class="text-light mt-4">
      © {{ new Date().getFullYear() }} — <strong>Abdul Mannan Khan</strong>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.footer {
  background-color: #2c2c2c; /* Dark background for a modern look */
  padding: 20px;
  color: white;
  position: relative;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.icon {
  width: 40px;
  height: 40px;
  color: #ffffff;
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon:hover {
  transform: scale(1.2);
  color: #ff9800; /* Orange color on hover for a nice effect */
  cursor: pointer;
}

.categories h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #ff9800; /* Accent color for headings */
}

.v-card {
  width: 300px;
  background-color: #424242; /* Dark card background */
}

.category-item {
  font-size: 1.1rem;
  color: #ffffff;
  transition: color 0.3s ease;
}

.category-item:hover {
  color: #ff9800; /* Hover effect on category items */
}

.v-divider {
  border-color: #ff9800;
}

.mt-4 {
  margin-top: 1.5rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
