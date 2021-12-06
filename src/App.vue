<template>
  <v-app>
    <AppBar />
  
  <v-main>
    
      <router-view/>
    
  </v-main>
  </v-app>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
<script>
import axios from 'axios'
import AppBar from './views/AppBar.vue';
export default {
  name: 'App',
  components : {
    AppBar,
  },
  data() {
    return {
      authenticatedadmin: false,
      authenticateduser: false,
      authenticatedworker: false,
    }
  },
 
};
</script>
