<template>
  <v-container>
    <!-- Back Button -->
    <v-tooltip text="Back To Panel" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="backButton d-none d-sm-flex"
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
      <v-col cols="12" md="6" sm="8" xs="12">
        <h3 class="header-title">Product Management</h3>
        <v-divider :thickness="2" class="border-opacity-50"></v-divider>
      </v-col>
    </v-row>
    <!-- Add product form -->
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="add-product-card" :elevation="8">
          <v-card-title class="add-product-title">Add Product</v-card-title>
          <v-card-text>
            <v-text-field
              label="Name"
              required
              variant="outlined"
              v-model="name"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              label="Price"
              required
              variant="outlined"
              v-model="price"
              class="mb-4"
            ></v-text-field>
            <v-textarea
              label="Description"
              required
              variant="outlined"
              v-model="description"
              class="mb-4"
            ></v-textarea>
            <v-file-input
              name="productImage"
              label="Picture"
              variant="outlined"
              required
              v-model="picture"
              @change="handleFileChange($event)"
              class="mb-4"
            >
              <template v-slot:selection="{ text }">
                <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                  <img :src="imageUrl" alt="Selected Image" />
                </v-avatar>
                {{ text }}
              </template>
            </v-file-input>
            <v-select
              label="Category"
              :items="categories"
              variant="outlined"
              v-model="category"
              class="mb-4"
            ></v-select>
            <v-text-field
              label="Stock"
              required
              variant="outlined"
              type="number"
              v-model="stock"
              class="mb-4"
            ></v-text-field>
          </v-card-text>
          <div class="button-container">
            <v-btn
              v-if="!loading"
              :disabled="addButtonDisabled"
              variant="contained"
              class="add-product-button"
              @click="addProduct"
            >
              Add Product
            </v-btn>

            <v-btn variant="contained" class="loading-button" v-if="loading">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
                color="white"
              ></v-progress-circular>
            </v-btn>
          </div>
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
      categories: [] as string[],
      name: "" as string,
      price: 0 as number | null,
      stock: 0 as number | null,
      description: "" as string,
      picture: "" as string,
      category: "" as string,
      imageUrl: "" as string,
    };
  },
  async mounted() {
    let response = await axios.get("http://localhost:4000/allCategories");
    // Map response data to extract category names
    this.categories = response.data.map(
      (item: { category: string }) => item.category
    );
  },
  methods: {
    async addProduct() {
      const response = await axios.get("http://localhost:4000/getByCategory", {
        params: {
          category: this.category,
        },
      });

      let categoryId = response.data.id;
      console.log(categoryId);

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price != null ? this.price.toString() : "");
      formData.append("description", this.description);
      formData.append("productImage", this.picture);
      formData.append("category", categoryId);
      formData.append("stock", this.stock != null ? this.stock.toString() : "");

      await axios.post("http://localhost:4000/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.name = "";
      this.price = null;
      this.stock = null;
      this.description = "";
      this.picture = "";
      this.imageUrl = "";
      this.category = "";
    },
    handleFileChange(event: any) {
      const file = event.target.files[0];
      if (file && file instanceof File) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = "";
      }
    },
  },
  computed: {
    addButtonDisabled() {
      return (
        !this.name ||
        !this.price ||
        !this.description ||
        !this.picture ||
        !this.category ||
        !this.stock
      );
    },
  },
});
</script>

<style>
.header-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgba(32, 93, 114, 1);
}

.add-product-card {
  background-color: rgba(32, 93, 114, 0.85);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.add-product-title {
  text-align: center;
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin-bottom: 20px;
}

.v-text-field,
.v-file-input {
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.add-product-button {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: black;
  border: none;
  background-color: white;
  transition: 0.3s ease-in-out;
}

.add-product-button:hover {
  background-color: rgba(91, 115, 124, 0.85);
  color: white;
}

.loading-button {
  width: 100%;
  justify-content: center;
}

.addProductForm {
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title.title {
  text-transform: uppercase;
  color: #1976d2;
}

.v-btn {
  font-size: 16px;
  padding: 8px 16px;
}

.v-btn.primary {
  background-color: #1976d2;
  color: white;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.v-btn.primary:hover {
  background-color: #155a9f;
}

.v-avatar img {
  border-radius: 50%;
}

.mb-4 {
  margin-bottom: 24px !important;
}
</style>
