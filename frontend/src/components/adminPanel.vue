<template>
  <v-container>
    <!-- Heading of admin panel -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mb-3">
          <v-icon color="orange">mdi-security-network</v-icon>
          Admin Panel
        </h1>
        <v-divider :thickness="2"></v-divider>
      </v-col>
    </v-row>

    <v-row class="button-row">
      <!-- Add Product Button -->
      <v-col cols="12" md="4" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="200"
          :width="350"
          class="sheet-button fade-in sheet-add-product"
          @click="pushToAddProduct"
        >
          <v-icon class="icon-style">mdi-plus</v-icon>
          <h3 class="button-text">Add Product</h3>
        </v-sheet>
      </v-col>

      <!-- See All Products Button -->
      <v-col cols="12" md="4" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="200"
          :width="350"
          class="sheet-button fade-in sheet-view-products"
          @click="pushToAdminProducts"
        >
          <v-icon class="icon-style">mdi-view-list</v-icon>
          <h3 class="button-text">See All Products</h3>
        </v-sheet>
      </v-col>

      <!-- See All Users Button -->
      <v-col cols="12" md="4" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="200"
          :width="350"
          class="sheet-button fade-in sheet-view-users"
          @click="gotoAllUsers"
        >
          <v-icon class="icon-style">mdi-account-multiple-outline</v-icon>
          <h3 class="button-text">See All Users</h3>
        </v-sheet>
      </v-col>

      <!-- View Orders Button -->
      <v-col cols="12" md="4" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="200"
          :width="350"
          class="sheet-button fade-in sheet-view-orders"
          @click="gotoAllOrders"
        >
          <v-icon class="icon-style">mdi-cart-arrow-down</v-icon>
          <h3 class="button-text">View Orders</h3>
        </v-sheet>
      </v-col>

      <!-- Add Product Categories Button -->
      <v-col cols="12" md="4" sm="6" xs="10" class="d-flex justify-center">
        <v-sheet
          :height="200"
          :width="350"
          class="sheet-button fade-in sheet-add-category"
          @click="addProductCategoryDialog = true"
        >
          <v-icon class="icon-style">mdi-tag-plus</v-icon>
          <h3 class="button-text">Add Product Category</h3>
        </v-sheet>
      </v-col>

      <!-- Add Product Category Dialog -->
      <v-col cols="12" xs="12" sm="8" md="4">
        <v-dialog v-model="addProductCategoryDialog" max-width="440" persistant>
          <v-card class="pa-3 elevation-5">
            <v-card-title
              class="d-flex justify-center text-h5 font-weight-bold"
            >
              <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
              Product Category
            </v-card-title>
            <v-text-field
              clearable
              class="mb-6 mt-10"
              variant="outlined"
              label="Name Of Category"
              type="text"
              v-model="category"
            >
            </v-text-field>
            <v-btn
              class="mb-3"
              variant="outlined"
              text
              @click="addProductCategoryDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              v-if="!loading"
              class="bg-black"
              text
              :disabled="!category"
              @click="addCategory"
            >
              add
            </v-btn>
            <v-btn variant="tonal" class="d-flex justify-center" v-if="loading">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
              ></v-progress-circular>
            </v-btn>
          </v-card>
        </v-dialog>
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
      addProductCategoryDialog: false as boolean,
      category: "" as string,
      loading: false as boolean,
    };
  },
  methods: {
    pushToAddProduct() {
      this.$router.push({ name: "addProduct" });
    },
    pushToAdminProducts() {
      this.$router.push({ name: "adminProducts" });
    },
    gotoAllUsers() {
      this.$router.push({ name: "allUsers" });
    },
    gotoAllOrders() {
      this.$router.push({ name: "allOrders" });
    },
    async addCategory() {
      this.loading = true;
      await axios.post("http://localhost:4000/addProductCategory", {
        category: this.category,
      });

      this.category = "";
      this.loading = false;
      this.addProductCategoryDialog = false;
    },
  },
});
</script>

<style scoped>
/* General styles */
.admin-heading {
  margin: 2rem 0;
  text-align: center;
}

.headline {
  font-size: 2.5rem;
  color: #1e88e5;
  font-weight: bold;
}

/* Admin panel card */
.admin-panel-card {
  border-radius: 12px;
  animation: fadeInUp 0.5s ease-out;
}

/* Sheet button styles */
.sheet-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-radius: 20px;
  color: white;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.6s ease forwards;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.icon-style {
  font-size: 50px;
  margin-bottom: 10px;
  opacity: 0.9;
}

/* Button text styling */
.button-text {
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
}

/* Modern gradients for each button */
.sheet-add-product {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
}

.sheet-view-products {
  background: linear-gradient(135deg, #4caf50, #81c784);
}

.sheet-view-users {
  background: linear-gradient(135deg, #2196f3, #64b5f6);
}

.sheet-view-orders {
  background: linear-gradient(135deg, #f44336, #e57373);
}

.sheet-add-category {
  background: linear-gradient(135deg, #ab47bc, #ba68c8);
}

/* Adding hover and focus effects */
.sheet-button:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.25);
}

.sheet-button:focus {
  outline: none;
  transform: scale(1.05);
}

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Adding delays for fade-in animation */
.sheet-add-product {
  animation-delay: 0.1s;
}

.sheet-view-products {
  animation-delay: 0.2s;
}

.sheet-view-users {
  animation-delay: 0.3s;
}

.sheet-view-orders {
  animation-delay: 0.4s;
}

.sheet-add-category {
  animation-delay: 0.5s;
}
</style>
