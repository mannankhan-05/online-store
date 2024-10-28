<template>
  <v-row justify="center">
    <v-col>
      <footer class="footer">
        <div class="footer-top">
          <div class="icon-container">
            <div class="icon">
              <v-icon>mdi-linkedin</v-icon>
            </div>
            <div class="icon">
              <v-icon>mdi-instagram</v-icon>
            </div>
            <div class="icon">
              <v-icon>mdi-facebook</v-icon>
            </div>
            <div class="icon">
              <v-icon>mdi-information-outline</v-icon>
            </div>
          </div>
        </div>
        <v-divider class="border-opacity-25 mb-8"></v-divider>
        <div class="footer-content">
          <!-- <v-col cols="12" lg="6" md="6" sm="6" xs="12"> -->
          <div class="categories">
            <h2>Product Categories</h2>
            <ul>
              <li><v-icon>mdi-circle-small</v-icon>Clothing</li>
              <li><v-icon>mdi-circle-small</v-icon>Shoes</li>
              <li><v-icon>mdi-circle-small</v-icon>Electronics</li>
              <li><v-icon>mdi-circle-small</v-icon>Books</li>
              <li><v-icon>mdi-circle-small</v-icon>Personal Care</li>
              <li><v-icon>mdi-circle-small</v-icon>Food</li>
              <li><v-icon>mdi-circle-small</v-icon>Beverage</li>
            </ul>
          </div>
          <!-- </v-col> -->
          <!-- <v-col cols="12" lg="6" md="6" sm="6" xs="12"> -->
          <v-card class="contact-us-card" width="500">
            <div class="contact-form">
              <h1 class="contact-us-heading mb-7">Contact Us</h1>
              <form @submit.prevent="submitForm" class="pl-4 pr-4 pt-2 pb-5">
                <div class="form-group">
                  <v-text-field
                    variant="outlined"
                    type="text"
                    label="Name"
                    required
                  ></v-text-field>
                </div>
                <div class="form-group">
                  <v-text-field
                    variant="outlined"
                    type="email"
                    label="Email"
                    required
                  ></v-text-field>
                </div>
                <div class="form-group">
                  <label for="message">Your Remarks:</label>
                  <v-textarea
                    variant="outlined"
                    type="text"
                    aria-label="Your Remarks"
                    required
                  ></v-textarea>
                </div>
                <div class="submitButtonContainer">
                  <v-btn
                    class="submitButton bg-light-green-lighten-1 pa-2"
                    style="width: 92%"
                  >
                    Submit
                  </v-btn>
                </div>
              </form>
            </div>
          </v-card>
          <!-- </v-col> -->
        </div>
      </footer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted:", this.formData);
      this.formData = { name: "", email: "", message: "" };
    },
  },
});
</script>

<style scoped>
.footer {
  margin-top: 80px;
  background-color: #e3e6e9;
  padding: 20px;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer-top {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-container {
  display: flex;
  gap: 20px;
}

.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
}

.icon i {
  font-size: 30px;
  color: black;
  transition: 0.3s ease-in-out;
}

.icon i:hover {
  cursor: pointer;
  transform: scale(1.2);
  color: rgb(53, 51, 51);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
}

.categories {
  flex: 1;
  text-align: left;
}

.categories h3 {
  margin-bottom: 10px;
}

.categories ul {
  list-style-type: none;
  padding: 0;
}

.categories li {
  margin: 5px 0;
}

.contact-form {
  flex: 1;
  text-align: left;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.contact-us-heading {
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  background: rgb(110, 179, 140);
  color: black;
}

.contact-us-card {
  border-radius: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.submitButtonContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: auto;
  transition: 0.2s ease-in-out;
}

.submitButton {
  font-weight: bold;
  font-weight: 19px;
  border-radius: 50px;
}
</style>
