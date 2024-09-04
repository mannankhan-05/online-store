<template>
  <v-container>
    <div>
      <v-col cols="auto">
        <v-btn
          icon="mdi-plus"
          size="small"
          class="addProductButton"
          @click="addProductDialog = true"
        ></v-btn>
      </v-col>
    </div>

    <div>
      <v-dialog v-model="addProductDialog">
        <v-row justify="center">
          <v-col cols="12" md="6" sm="12">
            <v-card max-width="600" class="addProductForm">
              <v-card-title class="text-decoration-underline font-weight-bold"
                >Add Product</v-card-title
              >
              <v-card-text>
                <v-text-field
                  label="Name"
                  required
                  variant="outlined"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  label="Price"
                  required
                  variant="outlined"
                  v-model="price"
                ></v-text-field>
                <v-textarea
                  label="Description"
                  required
                  variant="outlined"
                  v-model="description"
                ></v-textarea>
                <v-file-input
                  name="productImage"
                  label="Picture"
                  variant="outlined"
                  required
                  v-model="picture"
                  @change="handleFileChange($event)"
                  >@change="handleFileChange($event)"
                  <template v-slot:selection="{ text }">
                    <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                      <img :src="imageUrl" alt="Selected Image" />
                    </v-avatar>
                    {{ text }}
                  </template>
                </v-file-input>
                <v-select
                  label="Category"
                  :items="['shirts', 'pants', 'jackets', 'watches', 'other']"
                  variant="outlined"
                  v-model="category"
                >
                </v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn variant="outlined" @click="addProductDialog = false"
                  >Close</v-btn
                >
                <v-btn variant="outlined" @click="addProduct">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-dialog>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      addProductDialog: false as boolean,
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

      let result = await axios.post(
        "http://localhost:4000/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      this.addProductDialog = false;
      this.name = "";
      this.price = null;
      this.description = "";
      this.picture = "";
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
.addProductButton {
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: 2px solid blueviolet;
}
</style>
