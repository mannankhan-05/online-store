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
          <v-row justify="center">
            <v-col cols="12" lg="4" md="4" sm="4" xs="12">
              <div class="categories">
                <h2>Product Categories</h2>
                <ul>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon>Clothing
                  </li>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon>Shoes
                  </li>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon
                    >Electronics
                  </li>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon>Books
                  </li>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon>Personal
                    Care
                  </li>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon>Food
                  </li>
                  <li>
                    <v-icon class="dot-color">mdi-circle-small</v-icon>Beverage
                  </li>
                </ul>
              </div>
              <v-divider
                class="d-flex d-sm-none border-opacity-25 mt-7 mb-7"
              ></v-divider>
            </v-col>
            <v-col cols="12" lg="8" md="8" sm="8" xs="12">
              <v-card class="contact-us-card" max-width="500">
                <div class="contact-form">
                  <h1 class="contact-us-heading mb-7">How Can We Help ?</h1>
                  <form class="pl-4 pr-4 pt-2 pb-5">
                    <div class="form-group">
                      <v-text-field
                        variant="outlined"
                        type="text"
                        label="Your's Name"
                        required
                        v-model="name"
                      ></v-text-field>
                    </div>
                    <div class="form-group">
                      <v-text-field
                        variant="outlined"
                        type="email"
                        label="Your's Email"
                        required
                        v-model="email"
                      ></v-text-field>
                    </div>
                    <div class="form-group">
                      <v-select
                        clearable
                        chips
                        label="Subject"
                        :items="[
                          'General Inquiry',
                          'Report a Bug',
                          'Suggestions for Improvement',
                          'Compliment',
                          'Complaint',
                          'Other',
                        ]"
                        variant="outlined"
                        v-model="subject"
                      >
                      </v-select>
                    </div>
                    <div class="form-group">
                      <label for="message">Your Remarks:</label>
                      <v-textarea
                        variant="outlined"
                        type="text"
                        aria-label="Your Remarks"
                        required
                        v-model="remarks"
                      ></v-textarea>
                    </div>
                    <div class="submitButtonContainer">
                      <v-btn
                        v-if="!loading"
                        class="submitButton pa-2"
                        style="width: 92%"
                        @click="submitFeedback"
                        :disabled="!name || !email || !subject || !remarks"
                      >
                        Submit
                      </v-btn>
                      <v-btn
                        variant="tonal"
                        class="d-flex justify-center submitButton pa-2"
                        v-if="loading"
                      >
                        <v-progress-circular
                          v-if="loading"
                          indeterminate
                          :width="5"
                        ></v-progress-circular>
                      </v-btn>
                    </div>
                  </form>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </footer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      remarks: "",
      loading: false,
    };
  },
  methods: {
    async submitFeedback() {
      try {
        this.loading = true;
        await axios.post("http://localhost:4000/addFeedback", {
          name: this.name,
          email: this.email,
          subject: this.subject,
          remarks: this.remarks,
        });

        this.name = "";
        this.email = "";
        this.subject = "";
        this.remarks = "";

        this.loading = false;
      } catch (err) {
        console.log("Error adding a feedback : " + err);
      }
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
  color: rgb(192, 152, 79);
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
  background: rgb(192, 152, 79);
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
  background-color: rgb(192, 152, 79);
  font-weight: bold;
  font-weight: 19px;
  border-radius: 50px;
  transition: 0.3s ease-in-out;
}

.submitButton:hover {
  background-color: rgb(158, 127, 69);
  color: black;
}

.dot-color {
  color: rgb(196, 144, 47);
}
</style>
