<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="login-card" :elevation="8">
          <h2 class="login-title">Login</h2>
          <v-text-field
            clearable
            label="Email"
            placeholder="Email should contain @ and ."
            variant="outlined"
            prepend-inner-icon="mdi-email"
            v-model="email"
            :rules="[emailFormat ? () => true : 'Please enter a valid email']"
          ></v-text-field>

          <v-text-field
            clearable
            label="Password"
            placeholder="Password should be at least 8 characters"
            :type="passwordVisible ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            v-model="password"
            :rules="[passwordLength ? () => true : 'Password is too short']"
          >
            <template v-slot:append-inner>
              <v-icon @click="passwordVisible = !passwordVisible">
                {{
                  passwordVisible ? "mdi-eye-off-outline" : "mdi-eye-outline"
                }}
              </v-icon>
            </template>
          </v-text-field>

          <div class="button-container">
            <v-btn
              v-if="!loading"
              :disabled="loginButtonDisabled"
              variant="contained"
              class="loginButton"
              @click="loginUser"
            >
              Login
            </v-btn>

            <v-btn variant="contained" class="loadingButton" v-if="loading">
              <v-progress-circular
                v-if="loading"
                indeterminate
                :width="5"
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </div>

          <p class="forgetPassword mb-10" @click="forgetPassword">
            Forgot Password?
          </p>

          <div class="dont-have-account">
            <div class="text">
              <p class="d-inline pr-2 mt-5">Don't have an account?</p>
              <span class="create-account" @click="goToSignUpPage"
                >Create Account</span
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      passwordVisible: false,
      loading: false,
    };
  },
  methods: {
    loginUser() {
      this.loading = true;
      const { email, password } = this;
      this.$store.dispatch("loginUser", {
        email,
        password,
        router: this.$router,
      });

      this.email = "";
      this.password = "";
      this.loading = false;
    },
    forgetPassword() {
      this.$router.push({ name: "forgetPassword" });
    },
    goToSignUpPage() {
      this.$router.push({ name: "signUp" });
    },
  },
  computed: {
    passwordLength() {
      return this.password.length >= 8;
    },
    emailFormat() {
      return this.email.includes("@") && this.email.includes(".");
    },
    loginButtonDisabled() {
      return (
        !this.passwordLength ||
        !this.password ||
        !this.emailFormat ||
        !this.email
      );
    },
  },
});
</script>

<style scoped>
.login-card {
  background-color: rgb(117, 66, 15);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.login-title {
  text-align: center;
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin-bottom: 20px;
}

.v-text-field {
  margin-bottom: 20px;
  color: white;
  font-size: 22px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.loginButton {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: rgb(100, 50, 0) !important;
  border: none;
  background-color: white;
  transition: 0.3s ease-in-out;
}

.loginButton:hover {
  background-color: rgb(212, 164, 75);
  color: white !important;
}

.loadingButton {
  width: 100%;
  justify-content: center;
}

.forgetPassword {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  margin-top: 25px;
  transition: color 0.3s;
}

.forgetPassword:hover {
  color: rgb(187, 178, 178);
}

.dont-have-account {
  background-color: rgb(209, 165, 84);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin-top: 25px;
  bottom: 0;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-account {
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s;
  padding-top: 20px;
}

.create-account:hover {
  color: rgb(165, 117, 29);
}
</style>
