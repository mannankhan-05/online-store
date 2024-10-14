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

    <v-row justify="center">
      <v-col cols="12" md="6" sm="12">
        <v-card max-width="600" class="addProductForm pa-5 elevation-5">
          <v-card-title class="title text-h5 font-weight-bold text-center mb-4">
            Add Product
          </v-card-title>
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
              :items="[
                'Clothing',
                'Shoes',
                'Electronics',
                'Books',
                'Personal Care',
                'Food',
                'Beverage',
              ]"
              variant="outlined"
              v-model="category"
              class="mb-4"
            ></v-select>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="addProduct" class="px-5">
              Add Product
            </v-btn>
          </v-card-actions>
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
      name: "" as string,
      price: 0 as number | null,
      description: "" as string,
      picture: "" as string,
      category: "" as string,
      imageUrl: "" as string,
    };
  },
  methods: {
    async addProduct() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price != null ? this.price.toString() : "");
      formData.append("description", this.description);
      formData.append("productImage", this.picture);
      formData.append("category", this.category);

      await axios.post("http://localhost:4000/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.name = "";
      this.price = null;
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
});
</script>

<style>
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
