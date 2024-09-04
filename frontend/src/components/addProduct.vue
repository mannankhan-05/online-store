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
            <v-card max-width="500" class="addProductForm">
              <v-card-title>Add Product</v-card-title>
              <v-card-text>
                <v-text-field
                  label="Name"
                  required
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  required
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  label="Price"
                  required
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  label="Quantity"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="addProductDialog = false">Close</v-btn>
                <v-btn>Add</v-btn>
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

export default defineComponent({
  data() {
    return {
      addProductDialog: false as boolean,
    };
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

.addProductForm {
  display: flex;
  justify-content: center;
}
</style>
