<template>
  <v-container>
     
      <v-card>
          <v-card-title>
              Create an Admin
          </v-card-title>
          <v-card-text>
              <v-row>
                  <v-col>
                   
  <v-text-field
  v-model="firstname"
  type="text"
      label="First Name"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
                    
                  </v-col>
                  <v-col>
                       <v-text-field
                       v-model="lastname"
      label="Last Name"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>

                      </v-col>
    </v-row>
    <br />
    <v-row>
         <v-text-field
         v-model="username"
      label="User Name"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>

    </v-row>
     <v-row>
      <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Input Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

    </v-row>
      <v-row>
           <v-text-field
            v-model="password2"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Repeat Password"
            hint="At least 8 characters"
            counter
            @click:append="show2 = !show2"

          ></v-text-field>
    </v-row>
    <v-row>
        {{ passstatus }}
    </v-row>
    <br />
    <br />
  
    <v-row>
        <v-text-field
        v-model="emailadd"
      label="Email "
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
    </v-row>

    
    <v-row>
        <v-text-field
        v-model="mobnum"
      label="Mobile Number:"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
    </v-row>
    
    <br />
    <br />

    <v-row>
        <v-btn success v-on:click="submitbut"> Submit </v-btn>
    </v-row>
          </v-card-text>
      </v-card>

  </v-container>
</template>

<script>

//import { ValidationProvider, ValidationObserver } from 'vee-validate';


import axios from 'axios'
export default {
    
name:'AdminSignUp',
data() {
    return {
        firstname:"",
        lastname: "",
        username: "",
        emailadd: "",
     
       
        flag: false,
        password:"",
        password2:"",
        passstatus: "",
        mobnum: "",
      
        show1: false,
        show2: false,
        rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }
},
watch: {
    password: function () {
        this.checkmatch();
      
    },
     password2: function () {
        this.checkmatch();
       
    }
},
methods: {
    checkmatch(){
        if(this.password == "" || this.password2 == "")
        this.passstatus = "Input Password!";
        if(this.password == this.password2 && this.password != ""){
            this.passstatus = "Passwords Match!";
            this.flag = true;
        } else {
            this.passstatus = "Passwords Don't Match :(";
        }
    },
    submitbut(){
        axios.post('http://localhost:8080/admin', {
            
            firstName: this.firstname,
            lastName: this.lastname,
            userName: this.username,
            password: this.password,
            
            emailId: this.emailadd,
            mobileNumber: this.mobnum,
           
          
           
            


        }) .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

    }
},
}
</script>

<style>

</style>