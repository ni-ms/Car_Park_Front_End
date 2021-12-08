<template>
  <div>

<v-app-bar
      color="#FCCA46"
      width="100%"
      
      height="60px"
    >
  
      

      <v-toolbar-title>{{appTitle}}</v-toolbar-title>
       <v-spacer></v-spacer>
      <v-btn text height="35px" class="d-md-flex d-none mx-3"
      v-for="item in menuItems[index]"
      :key="item.title"
      :to="item.path"
    
      >
      
      <v-icon dark> {{item.icon}}</v-icon>
      {{item.title}}
   
        
      </v-btn>
      
      <v-app-bar-nav-icon @click="drawer = true"  class="d-md-none"></v-app-bar-nav-icon>
       </v-app-bar>

       <!--Drawer-->
      
    <div class="d-md-none d-lg-none d-xl-none">
    <v-navigation-drawer
    
      v-model="drawer"
      absolute
      temporary
       color="FCCA46"
       floating
       right
    transition="slide-y-transition"
      
    >
      <v-list
        nav
        dense
        class="pt-5"
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
          v-for="item in menuItems[index]"
         :key="item.title"
         :to="item.path"
       
         
          
          >
         
            <v-list-item-icon >
              <v-icon  >{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title  >{{item.title}}</v-list-item-title>
         
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </div>
    <!--Drawer end-->


  </div>
</template>



<script>
import store from '../store/index.js'

export default {
  store: store,
  name: 'AppBar',
  props:['userstatus'],
 
  

  data: () => ({
    //sidebar
    appTitle: 'Car Parking Solutions',
  
    index: 2,
    menuItems:
       [[
      {title: 'Home', path: '/', icon: 'mdi-home'},
      {title: 'Booking', path: '/Booking', icon: 'mdi-account'},
      {title: 'Admin', path: '/AdminDash', icon:'mdi-account-wrench'},
     
      {title: 'User', path: '/UserDash', icon: 'mdi-account-outline'},
      {title: 'Worker', path: '/WorkerDash', icon: 'mdi-account-hard-hat'},

       {title: 'Feedback', path: '/Feedback', icon: 'mdi-message-draw'},
      {title: 'Login', path: '/Login', icon: 'mdi-login'},
       {title: 'Sign Up', path: '/SignUp', icon: 'mdi-pencil'},],


       [{title: 'Home', path: '/', icon: 'mdi-home'},
       {title: 'Booking', path: '/Booking', icon: 'mdi-account'},
        {title: 'User', path: '/UserDash', icon: 'mdi-account-outline'},
        {title: 'Feedback', path: '/Feedback', icon: 'mdi-message-draw'},
        {title: 'Log out', path: '/Logout', icon: 'mdi-logout'}


       ], 
       [
      {title: 'Home', path: '/', icon: 'mdi-home'},
    

  
      {title: 'Login', path: '/Login', icon: 'mdi-login'},
       {title: 'Sign Up', path: '/SignUp', icon: 'mdi-pencil'},],
       []
       
       ],
       
      
  
      drawer: false,
      group: null,
  }),
beforeUpdate() {
  this.changefun();
 
 
},
  methods: {
    changefun(){
      if(store.state.admin != ""){

        this.index = 0;
      } else if (store.state.username != "") {
     
        this.index = 1;
      }
    }
  },
};
</script>