<template>
  <v-stepper v-model="e6" vertical height="100%">
    <v-stepper-step :complete="e6 > 1" step="1">
      Select Date and Time
      <small></small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card flat outlined tile height="auto">
        <v-row justify="space-around">
          <column>
            <br />
            <h2>Select the Dates</h2>
            <v-date-picker
              v-model="picker"
              multiple
              color="green lighten-1"
            ></v-date-picker>
            <br />
          </column>
          <column>
            <br />
            <h2>Choose the start time</h2>
            <v-time-picker ampm-in-title format="ampm"></v-time-picker>
            <br>
            <br>
          </column>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      Select Parking Spot
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card flat outlined tile height="auto">
          <v-row justify-space-around>
            <column>
              <Carvis />

            </column>

            
            </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      Select Additional Services
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4"> Payment </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import Carvis from '../views/carvis.vue';
export default {
   components : {
    Carvis,
  },
  data() {
    return {
      e6: 1,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
};
</script>
