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
            label="First Name"
            :rules="rules"
             hide-details="auto"

          ></v-text-field>
                 </v-col>
                 <v-col>
                      <v-text-field
            label="Last Name"
            
             hide-details="auto"

          ></v-text-field>
                 </v-col>

             </v-row>
             <br />
             <v-row pa-6>
                 <v-text-field
            label="UserName"
            :rules="rules"
             hide-details="auto"

          ></v-text-field>
             </v-row>
             <v-row >
               <v-text-field
            label="Slot Id"
            :rules="rules"
             hide-details="auto"
           

          ></v-text-field>
                
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
  
  length="5"
  size="25"
  value="5"
></v-rating>  
             </v-row>
             <br />
             <br />
<v-row>
   <v-textarea
      v-model="title"
      label="Message"
      counter
      maxlength="120"
      full-width
      single-line
    ></v-textarea>
</v-row>
<v-btn elevation="2">
Submit
</v-btn>
         </v-card-text> 
     </v-card>
  </v-container>
</template>

<script>
export default {
    name: 'Feedback',

    data() {
        return {
            rules:[
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Minimum three characters.',
            ],
        }
    },
}
</script>

<style>

</style>