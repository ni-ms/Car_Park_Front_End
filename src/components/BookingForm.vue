<template>
  <v-stepper v-model="e6" vertical height="100%">
    <v-stepper-step :complete="e6 > 1" step="1">
      Details of your vehicle
      <small></small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card flat outlined tile height="auto">
        <v-row justify="space-around">
          <v-col>
            <br/>
            <h2 class="d-flex justify-center">Type the below details</h2>
            <v-text-field
                v-model="lpnumber"
                label="License plate number"
                placeholder="e.g. TS----"
                solo
            ></v-text-field>
            <br/>
            <v-text-field
                v-model="carmodel"
                label="Car model"
                placeholder="e.g. Suzuki"
                solo
            ></v-text-field>
            <br/>
          </v-col>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 2"> Continue</v-btn>
      <v-btn text> Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 2" step="2">
      Select Date
      <small></small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-card flat outlined tile height="auto">
        <v-row justify="space-around">
          <v-col>
            <br/>
            <h2 class="d-flex justify-center">Select the Dates</h2>
            <v-date-picker
                class="d-flex justify-center"
                v-model="parkdate"

                color="green lighten-1"
            ></v-date-picker>
            <br/>
          </v-col>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> Continue</v-btn>
      <v-btn text> Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 3" step="3">
      Select Time
      <small></small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-card flat outlined tile height="auto">
        <v-row justify="space-around">
          <v-col>
            <br/>
            <h2>Select the Time</h2>
            <div>
              <h1>Choose timings</h1>
              <v-row
                  justify="space-around"
                  align="center"
              >
                <v-col style="width: 350px; flex: 0 1 auto;">
                  <h2>Start:</h2>
                  <v-time-picker
                      format="24hr"
                      v-model="starttime"
                      :max="end"
                  ></v-time-picker>
                </v-col>
                <v-col style="width: 350px; flex: 0 1 auto;">
                  <h2>End:</h2>
                  <v-time-picker
                      format="24hr"
                      v-model="endtime"
                      :min="start"
                  ></v-time-picker>
                </v-col>
              </v-row>
            </div>


            <br/>
          </v-col>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 4" v-on:click="datetoint()"> Continue</v-btn>
      <v-btn text> Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 4" step="4">
      Select Parking Spot
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card flat outlined tile height="auto">
        <v-row justify-space-around>
          <v-col offset-md3>
            <h2>
              Choose Parking Spot:
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
                v-model="selectedspot"
                :items="parkingspot"
                label="Parking Spot"
                solo
            ></v-select>
          </v-col>

          <v-col>
            <Carvis/>
          </v-col>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 5"> Continue</v-btn>
      <v-btn text> Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 5" step="5">
      Select Additional Services
    </v-stepper-step>
    <v-stepper-content step="5">
      <v-card flat outlined tile height="auto">
        <v-container fluid>
          <v-row>
            <v-col
                cols="12"
                sm="4"
                md="4"
            >
              <v-checkbox
                  v-model="temp1"
                  label="Car Dry Cleaning"
                  color="success"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  v-model="temp2"
                  label="Air Filling"
                  color="success"
                  hide-details
              ></v-checkbox>
            </v-col>
            <v-col
                cols="12"
                sm="4"
                md="4"
            >
              <v-checkbox
                  v-model="temp3"
                  label="Check Tyre Health"
                  color="success"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  v-model="temp4"
                  label="Car Wash"
                  color="success"
                  hide-details
              ></v-checkbox>
            </v-col>

          </v-row>
        </v-container>
      </v-card>
      <v-btn color="primary" @click="e6 = 6" v-on:click="calc()"> Continue</v-btn>
      <v-btn text> Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="6"> Payment</v-stepper-step>

    <v-stepper-content step="6">
      <v-card class="mb-12" height="500px">
        <v-card-text>
          <BeforePayment/>

        </v-card-text>
      </v-card>
<!--       <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>-->
      <v-btn @click="updatedb">Submit</v-btn>
      <v-btn text> Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import Carvis from '../views/carvis.vue';
import BeforePayment from '../views/beforepayment.vue';


import axios from 'axios'

export default {
  components: {
    Carvis,
    BeforePayment
  },
  data() {
    return {
      e6: 1,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      parkingspot: [],
      closeOnContentClick: true,
      lpnumber: "",
      carmodel: "",
      parkdate: "",
      starttime: "",
      endtime: "",
      temp1: "",
      temp2: "",
      temp3: "",
      temp4: "",
      selectedspot: "",
      tempf: "",


    };
  },

  methods: {
    datetoint() {
      this.starttime = this.starttime.replace(/[:]/, '');
    },
    calc() {
      if (this.temp1) {
        this.tempf = this.tempf + "1";
      }
      if (this.temp2) {
        this.tempf = this.tempf + "2";
      }
      if (this.temp3) {
        this.tempf = this.tempf + "3";
      }
      if (this.temp4) {
        this.tempf = this.tempf + "4";
      }

    },

    printData(){
      console.log(this.lpnumber);
      console.log(this.carmodel);
      console.log(this.parkdate);
      console.log(this.starttime);
      console.log(this.endtime);
      console.log(this.temp1);
      console.log(this.temp2);
      console.log(this.temp3);
      console.log(this.temp4);
      console.log(this.selectedspot);
    },
    updatedb() {
      axios.get('http://localhost:8080/carBookingData').then(results => {
        this.parkingspot = results.data;
      })
      if (this.carmodel != "" && this.starttime != "" && this.endtime != "" && this.parkdate != "") {
        let bookingData = {
          carModel: this.carmodel,
          startTime: new Date(this.parkdate + 'T' + this.starttime),
          endTime: new Date(this.parkdate + 'T' + this.endtime),
          lpnumber: this.lpnumber,
          miscFacilities: [this.temp1, this.temp2, this.temp3, this.temp4].filter(Boolean),
          parking: {
            parkingSpaceNumber: this.selectedspot
          }
        };

        axios.post('http://localhost:8080/carBookingData', bookingData)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
      }
    }


  },
};
</script>