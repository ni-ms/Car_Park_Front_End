<template>
   <v-container>
     <v-card>
         <v-card-title>
             Rate your experience.
         </v-card-title>
         <v-card-text ma-5>
             <v-row pa-6>
                 <v-col>
                 <v-text-field
                 v-model= "firstnamer"
            label="First Name"
            :rules="rules"
             hide-details="auto"

          ></v-text-field>
                 </v-col>
                 <v-col>
                      <v-text-field
            label="Last Name"
            v-model="lastnamer"
            
             hide-details="auto"

          ></v-text-field>
                 </v-col>

             </v-row>
             <br />
             <v-row pa-6>
                 <v-text-field
            label="UserName"
           v-model="currentusername"
            :rules="rules"
             hide-details="auto"
             

          ></v-text-field>
             </v-row>
             <v-row >
             
             <v-select
          :items="slotidlist"
          label="Slot Id"
          v-model="slotid"
        ></v-select>
        
                
             </v-row>
             <br />
             <br />
             <h3> Rating </h3>
             <br />
             <v-row>

<v-rating
  color="green"
  empty-icon="mdi-star-outline"
  full-icon="mdi-star"
  v-model="rating"
 
  length="5"
  size="25"
  value="5"
></v-rating>  
             </v-row>
             <br />
             <br />
<v-row>
   <v-textarea
      v-model="tmessage"
      label="Message"
      counter
      maxlength="120"
      full-width
      single-line
    ></v-textarea>
</v-row>
<v-btn elevation="2" @click="addrating">
Submit
</v-btn>

         </v-card-text> 
     </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
export default {
    store: store,
    name: 'Feedback',

    data() {
        return {
            slotidlist: [],
            rules:[
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Minimum three characters.',
            ],
            slotid: "",
            rating: "",
            tmessage: "",
            currentusername: "",
            currentuser: 8,
            firstnamer: "",
            lastnamer: "",

            

        }
    },
   beforeMount(){
       this.currentusername = store.state.username;
    
       this.getvalidslot();
   },
    methods: {
        getvalidslot(){
            axios.get('http://localhost:8080/username?userName=' + this.currentusername).then(response=>{
                this.firstnamer = response.data.firstName,
                this.lastnamer = response.data.lastName
            });
            axios.get('http://localhost:8080/slot').then(response=>{
                for (let index = 0; index < response.data.length; index++) {
                    const element = response.data[index].slotId;
                    if(response.data[index].userId == this.currentuser)
                    this.slotidlist.push(element);
                    
                }
            })

        },

        addrating(){

            axios.post('http://localhost:8080/feedback', {
                firstName: this.firstnamer,
                lastName: this.lastnamer,
                slotRating: this.rating,
                slotID: this.slotid,
                comments: this.tmessage,
                userName: this.currentusername,

            }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
        },
    },
}
</script>

<style>

</style>