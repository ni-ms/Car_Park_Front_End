<template>
  <v-app id="inspire">
    <v-content>
      <v-card>

      </v-card>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      v-model="usernamei"
                      prepend-icon="mdi-account"
                      name="login"
                      label="Login"
                      type="text"
                  ></v-text-field>
                  <v-text-field
                      @change="getinfo"
                      id="password"
                      v-model="passwordi"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Password"
                      type="password"
                  ></v-text-field>
                </v-form>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn

                    color="success"
                    class="mr-4"
                    @click="login"

                >Login
                </v-btn>
                <v-btn color="white" mr-4 href="http://localhost:8080/oauth2/authorization/google"> Login with Google
                </v-btn>
                <div class="container authenticated" style="display: none">

                  Logged in as: <span id="user"></span>

                </div>

              </v-card-actions>

            </v-card>

            <br/>
            <v-alert type="error" v-show="!compvalue">
              Incorrect Username/Password!
            </v-alert>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from '../store/index.js'

import axios from "axios";

export default {
  name: 'LoginPage',
  store: store,

  props: {
    source: String,

  },
  data() {
    return {
      compvalue: true,
      message: "",
      valid: true,
      usernamei: "",
      passwordi: "",
      usernameg: "",
      passwordg: "",

    }
  },


  methods: {
    login() {
      if (this.usernamei !== "" && this.passwordi !== "") {
        axios({
          method: "POST",
          url: "http://localhost:8080/auth/generateToken",
          data: {
            emailId: this.usernamei,
            password: this.passwordi
          }
        }).then(response => {
          if (response.data) {
            // Store the token in the local storage or in the Vuex store
            localStorage.setItem('token', response.data);
            this.$router.replace({path: "/UserDash"});
            store.commit('adduser', this.usernamei);
          } else {
            this.compvalue = !this.compvalue;
            console.log("The username and / or password is incorrect");
          }
        }).catch(error => {
          this.compvalue = !this.compvalue;
          console.log("A username and password must be present");
          console.error(error);
        });
      }
    }
  }
};
</script>

<style></style>
