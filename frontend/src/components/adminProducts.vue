<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex mb-3"
          icon
          @click="this.$router.go(-1)"
          elevation="0"
        >
          <v-icon large>mdi-menu-left</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Header Section -->
    <v-row justify="center">
      <v-col cols="12" md="6" sm="12">
        <h2 class="header-title d-flex justify-center">
          <v-icon color="orange mr-2">mdi-view-dashboard</v-icon>
          Product Administration Dashboard
        </h2>
        <v-divider :thickness="2" class="border-opacity-50"></v-divider>
      </v-col>
    </v-row>

    <!-- Product that admin can update or delete -->
    <v-row justify="center">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="3"
        sm="5"
        xs="5"
      >
        <v-card class="productCard mx-auto" :elevation="4" max-width="400">
          <v-img class="productImage" height="200" :src="product.image"></v-img>
          <v-card-title>
            <h4>{{ product.name }}</h4>
          </v-card-title>
          <v-card-text>
            <p>{{ product.price }}$</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="tonal"
              class="updateButton"
              @click="editProduct(product.id)"
            >
              <v-icon class="mr-1 mt-.7">mdi-pencil-box</v-icon>
              Edit</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="tonal"
              class="deleteButton"
              @click="deleteProduct(product.id)"
            >
              <v-icon class="mr-1">mdi-delete-outline</v-icon>
              Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading More Products (Progress Circular) -->
    <div class="loading-more-products">
      <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
    </div>

    <!-- edit product dialog -->
    <v-dialog v-model="editProductDialog" persistent max-width="600">
      <v-card max-width="600" class="addProductForm pa-5 elevation-5">
        <v-card-title class="title text-h5 font-weight-bold text-center mb-4">
          Edit Product
        </v-card-title>

        <v-card-text>
          <!-- Display current product image with preview -->
          <v-row justify="center">
            <v-col cols="12" md="8" sm="10" xs="12">
              <v-img
                :src="editingProduct.image"
                height="200"
                class="mb-4"
                alt="Product Image"
              ></v-img>
            </v-col>
          </v-row>

          <!-- Product Form -->
          <v-form ref="editProductForm">
            <v-text-field
              v-model="editingProduct.name"
              variant="outlined"
              label="Product Name"
              prepend-icon="mdi-tag"
              required
            ></v-text-field>

            <v-text-field
              v-model="editingProduct.price"
              variant="outlined"
              label="Product Price"
              prepend-icon="mdi-cash"
              required
              type="number"
              prefix="$"
            ></v-text-field>

            <v-text-field
              v-model="editingProduct.description"
              variant="outlined"
              label="Product Description"
              prepend-icon="mdi-text-box"
              required
              type="text"
            ></v-text-field>

            <!-- File input with image preview -->
            <v-file-input
              clearable
              name="productImage"
              label="Product Image"
              variant="outlined"
              prepend-icon="mdi-camera"
              v-model="editingProduct.image"
              @change="handleFileChange($event)"
            >
              <template v-slot:selection="{ text }">
                <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                  <img :src="imageUrl" alt="Selected Image" />
                </v-avatar>
                {{ text }}
              </template>
            </v-file-input>

            <v-text-field
              v-model="editingProduct.stock"
              variant="outlined"
              label="Stock Available"
              prepend-icon="mdi-cash"
              required
              type="number"
              prefix="$"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn color="error" text @click="editProductDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            v-if="!loading"
            color="primary"
            elevation="2"
            @click="saveEditedProduct"
            >Save</v-btn
          >
          <v-btn variant="tonal" class="signInButton" v-if="loading">
            <v-progress-circular
              v-if="loading"
              indeterminate
              :width="5"
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      products: [] as object[],
      editingProduct: {
        id: 0,
        name: "" as string,
        price: 0 as number,
        description: "" as string,
        image: "" as string,
        stock: 0 as number,
      },
      editProductDialog: false as boolean,
      imageUrl: "" as string,
      loading: false as boolean,
      limit: 8, // Number of products per page
      page: 0, // Current page
      totalPages: 0, // Total number of pages
      isLoading: false, // To prevent multiple loads
    };
  },
  async mounted() {
    this.showAllProducts();
    window.addEventListener("scroll", this.handleScroll); // Add scroll event listener
  },
  methods: {
    async showAllProducts() {
      try {
        const response = await axios.get("http://localhost:4000/products", {
          params: {
            limit: this.limit, // Pass the limit
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
    async editProduct(productId: number) {
      // Get product by id
      let response = await axios.get(
        `http://localhost:4000/product/${productId}`
      );
      this.editingProduct = response.data;

      this.editProductDialog = true;
    },
    async saveEditedProduct() {
      this.loading = true;
      const formData = new FormData();
      formData.append("name", this.editingProduct.name);
      formData.append("price", this.editingProduct.price.toString());
      formData.append("description", this.editingProduct.description);
      formData.append("productImage", this.editingProduct.image);
      formData.append("stock", String(this.editingProduct.stock));

      await axios.put(
        `http://localhost:4000/editProduct/${this.editingProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      this.loading = false;
      this.editProductDialog = false;
    },
    async deleteProduct(productId: number) {
      // Delete product
      await axios.delete(`http://localhost:4000/deleteProduct/${productId}`);

      // Update products
      this.products = this.products.filter(
        (product: any) => product.id !== productId
      );
    },
    handleFileChange(event: any) {
      const file = event.target.files[0];
      if (file && file instanceof File) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = "";
      }
    },
    async loadMoreProducts() {
      if (!this.isLoading && this.page < this.totalPages - 1) {
        this.isLoading = true; // Set loading to prevent multiple triggers
        this.page += 1;
        await this.showAllProducts();
        this.isLoading = false; // Reset loading after fetching products
      }
    },
    handleScroll() {
      // Detect when user is near the bottom of the page
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 600; // 100px before the bottom
      if (scrollPosition >= threshold) {
        this.loadMoreProducts();
      }
    },
  },
});
</script>

<style scoped>
.productCard {
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}

.productCard:hover {
  transform: scale(1.01);
  box-shadow: 1px 1px 10px 1px orange;
}

.updateButton,
.deleteButton {
  transition: 0.3s ease-in-out;
}

.updateButton:hover,
.deleteButton:hover {
  transform: scale(1.04);
}

.addProductForm {
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-size: 1.5rem;
  color: #3c3c3c;
}

.v-btn {
  border-radius: 8px;
  transition: 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
}

.v-file-input {
  margin-top: 20px;
}

.loading-more-products {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
