<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>
        Welcome,  {{$store.state.username}} !
        </h1>
      </v-card-title>
    </v-card>
    <br />
      <v-card
    color="#225560"
    dark
      >
          <v-card-title>
              Current Car(s) parked
          </v-card-title>
          <v-card-text>

              
<v-data-table
    :headers="headers"
    :items="customers"
    sort-by="calories"
    class="elevation-1"
  >
  <template v-slot:[`item.extraservices`] ="{ item }">
     <div v-for="module in item.extraservices" :key="module.id">
        {{module.id}}
     </div>
 </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Cars Parked</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.license"
                      label="License"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.pstart"
                      label="Starting Time"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.pend"
                      label="Ending Time"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.extraservices"
                      label="Extra Services"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

            


  
          </v-card-text>
         
      </v-card>
      <br />
      <v-card
    color="#F0803C"
    dark
      >
          <v-card-title>
              Request a parking space
          </v-card-title>
          <v-card-text>
              <v-btn light>
              <router-link to="Booking">   
              Go to Booking
              </router-link>
              </v-btn>
          </v-card-text>
         
      </v-card>
    
    <br />
    <v-card color="#605F5E" dark>
    <v-card-title>
        Account Balance
    </v-card-title>
    <v-card-subtitle>
        Check your account balance
    </v-card-subtitle>
    <v-card-text>
        Current Balance: $0
        <br>
<v-sparkline
        :labels="Dates"
        :value="Balance"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-card-text>

    </v-card>
    <br />

  <v-card
    
    color="#18A999"
    dark
    style="max-width: 100vw;"
  >
    
    
        <v-card-title>
      
            <div class="text-h5">
                 Rate your experience with our car park:
            </div>
         
        </v-card-title>
         <v-card-subtitle>
              
              Here you can leave a rating of your previous experience at our car park!
          </v-card-subtitle>
  
    <v-divider dark></v-divider>
    <v-card-actions class="">
     
      <v-spacer></v-spacer>
      <span class="grey--text text--lighten-2 text-caption mr-2">
        {{ rating }}
      </span>
      <v-rating
        v-model="rating"
        background-color="black"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="18"
      ></v-rating>
    </v-card-actions>
  </v-card>


<changed-data-prop changedbooking="test" />


  </v-container>
</template>

<script>
import store from '../store/index.js'


export default {
 name:'UserDash',
 store: store,


data() {
     return {
       currentuser: "",
         customers: [{
           carname: 'Suzuki',
           name: 'Arun',
           pspot: '13',
           license: 'ts1234',
           username: 'Arun',
           pstart: '12,dec-2021 14:50',
           pend: '13,dec,2021 15:50',
           pspace: 'G4',
           extraservices: [
               {
                   id: 'Dry Car Wash'
               },
               {
                   id: 'Tyre Check',
               }
           ]
           
           }
           ],
          headers: [
          {
            text: 'Car',
            align: 'start',
            sortable: false,
            value: 'carname',
          },
          { text: 'License', value: 'license' },
          { text: 'Name', value: 'name' },
          { text: 'Parking Spot', value: 'pspot' },
          { text: 'Start Time', value: 'pstart' },
          { text: 'End Time', value: 'pend' },
          { text: 'Extra Services', value: 'extraservices'},
          { text: 'Cancel/Edit', value: 'actions', sortable: false},
        ],
        Dates: [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
      ],
      Balance: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],

      
          dialog: false,
      dialogDelete: false,
         desserts: [],
      editedIndex: -1,
      editedItem: {
          name: '',
           license: '',
           username: '',
           pstart: '',
           pend: '',
           pspace: '',
           extraservices: '',
      },
      defaultItem: {
        name: '',
           license: '',
           username: '',
           pstart: '',
           pend: '',
           pspace: '',
           extraservices: '',
      },
      
     }
     
 },

 methods: {


      
      editItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.customers.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.customers[this.editedIndex], this.editedItem)
        } else {
          this.customers.push(this.editedItem)
        }
        this.close()
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

 





}
</script>

<style>

</style>