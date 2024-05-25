<template>
  <v-container>
    <h1> Click Here to Log Out </h1>
    <v-btn @click="logout"> Logout </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>