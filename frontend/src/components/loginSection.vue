<template>
  <v-container class="login-section text-center py-10">
    <v-row>
      <v-col>
        <h1 class="login-heading">
          <v-icon class="welcome-icon">mdi-human-greeting</v-icon> Welcome to
          Your Shopping World!
        </h1>
        <p class="login-subheading">
          Login or Register now to unlock exclusive features:
        </p>

        <!-- User Rights -->
        <div class="rights-section">
          <h2 class="rights-heading">
            <v-icon class="rights-icon">mdi-account</v-icon> User Features
          </h2>
          <v-row class="rights-list">
            <v-col
              cols="12"
              sm="4"
              v-for="(item, index) in userRights"
              :key="index"
            >
              <p>
                <span class="list-icon">{{ item.icon }}</span> {{ item.text }}
              </p>
            </v-col>
          </v-row>
        </div>

        <!-- Admin Rights -->
        <div class="rights-section">
          <h2 class="rights-heading">
            <v-icon class="rights-icon">mdi-shield-account</v-icon> Admin
            Features
          </h2>
          <v-row class="rights-list">
            <v-col
              cols="12"
              sm="4"
              v-for="(item, index) in adminRights"
              :key="index"
            >
              <p>
                <span class="list-icon">{{ item.icon }}</span> {{ item.text }}
              </p>
            </v-col>
          </v-row>
        </div>

        <v-btn class="login-btn mr-6 mt-4" large @click="navigateToLoginPage">
          Login Now
        </v-btn>
        <v-btn class="register-btn mt-4" large @click="navigateToRegisterPage">
          Register Today
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      userRights: [
        { icon: "🛒", text: "Add your favorite products to the cart" },
        { icon: "📋", text: "View and manage your order history" },
        { icon: "✨", text: "Be the first to access exciting deals" },
      ],
      adminRights: [
        { icon: "➕", text: "Add new products to the store" },
        { icon: "👥", text: "View and manage all users" },
        { icon: "✏️", text: "Edit or delete products effortlessly" },
        { icon: "🗂️", text: "Organize products by adding categories" },
        { icon: "🔍", text: "Monitor and oversee orders" },
        {
          icon: "⚡",
          text: "Access exclusive admin functionalities and more!",
        },
      ],
    };
  },
  methods: {
    navigateToLoginPage() {
      this.$router.push({ name: "login" });
    },
    navigateToRegisterPage() {
      this.$router.push({ name: "signUp" });
    },
  },
});
</script>

<style scoped>
.welcome-icon {
  font-size: 2.5rem;
  color: #cc8d30;
  margin-right: 10px;
  vertical-align: middle;
  animation: wave 1.5s infinite ease-in-out;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(20deg);
  }
}

.login-section {
  margin-top: 50px;
  padding: 40px 20px;
  background: linear-gradient(120deg, #ffefdf, #ffd1a1);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.5s ease-in-out;
}

.login-heading {
  font-size: 2.5rem;
  font-weight: bold;
  color: #663300;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.login-subheading {
  font-size: 1.2rem;
  color: #383737;
  margin-bottom: 20px;
}

.rights-section {
  margin: 30px 0;
  background-color: #fff4e6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.rights-heading {
  font-size: 1.8rem;
  font-weight: bold;
  color: #cc8d30;
  margin-bottom: 20px;
}

.rights-icon {
  font-size: 2rem;
  color: #663300;
  margin-right: 8px;
  vertical-align: middle;
}

.rights-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.list-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.login-btn,
.register-btn {
  font-size: 1rem;
  font-weight: bold;
  border-radius: 20px;
  padding: 4px 35px;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;
}

.login-btn {
  background-color: #cc8d30;
  color: white;
}

.register-btn {
  background-color: #ffe0b3;
  color: #663300;
}

.login-btn:hover,
.register-btn:hover {
  transform: scale(1.05);
}

.admin-rights {
  font-size: 1rem;
  list-style-type: square;
  margin-left: 20px;
  padding: 0;
  color: #5a5a5a;
}

.admin-rights > li {
  margin-bottom: 5px;
  font-style: italic;
}
</style>
