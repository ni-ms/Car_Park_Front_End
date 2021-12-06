<template>
   <v-container>
      <v-card>
         <v-card-title>
            Current Stats
         </v-card-title>
         <v-card-text>
            <v-sparkline
               :smooth="12"
               :labels="labels"
               :value="value"
               color="#F9DC5C"
               line-width="2"
               padding="16"
               ></v-sparkline>
            <div class = "text-h6 d-flex justify-center "> User sign ups in the past 6 hours</div>
            <v-sparkline
               :smooth="12"
               :labels="labels"
               :value="value"
               color="#109648"
               line-width="2"
               padding="16"
               ></v-sparkline>
            <div class = "text-h6 d-flex justify-center "> Profits in the past 6 hours</div>
         </v-card-text>
      </v-card>
      <v-card>
         <v-card-title>
            Current Cars
         </v-card-title>
         <v-card-text>
            <v-data-table
               :headers="headers"
               :items="parkedcars"
               :items-per-page="5"
               class="elevation-1"
               ></v-data-table>
         </v-card-text>
      </v-card>
      <v-card>
         <v-card-title>
            Add/Remove parking space
         </v-card-title>
         <v-card-text>


<v-data-table
    :headers="headers"
    :items="parkedcars"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Add/Remove Spaces</v-toolbar-title>
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
      <v-card>
         <v-card-title>
            Add/Remove Workers
         </v-card-title>
      </v-card>
      <v-card>
         <v-card-title>
            Worker Report
         </v-card-title>
      </v-card>
      <v-card>
         <v-card-title>
            Add Additional Services
         </v-card-title>
      </v-card>
      <v-card>
         <v-card-title>
            Block Users
         </v-card-title>
      </v-card>
      <v-card>
         <v-card-title>
            Block Parking Spots
         </v-card-title>
      <v-card-text>
          Test: 
          <div id="changed-data-prop">
          {{changedbooking}}
          </div>
      </v-card-text>
      </v-card>
   </v-container>
</template>
<script>
   export default {
       name:'AdminDash',
   
       data(){
           return{
               props: ['changedbooking'],



            selected: [],
               
            pslots:[{
                text: 'Slot',
               align : 'start',
               sortable: 'true',
               value: 'pSlot',
            }, 
            {
                text: 'Size',
                value: 'psize',
            }
            ],
            pitems :[{
                pSlot: 'G1',
                psize: '0',
            }],
           headers: [{
               text: 'Car',
               align : 'start',
               sortable: 'true',
               value: 'name',
           },
          { text: 'License Plate', value: 'license' },
          { text: 'Name', value: 'username' },
          { text: 'Start time', value: 'pstart' },
          { text: 'End time', value: 'pend' },
          { text: 'Parking Space', value: 'pspace' },
          {text: 'Extras Services', value: 'extraservices'},
          { text: 'Actions', value: 'actions', sortable: false }
           ],
   
       parkedcars: [{
           name: 'Suzuki',
           license: 'ts1234',
           username: 'Arun',
           pstart: '12,dec-2021 14:50',
           pend: '13,dec,2021 15:50',
           pspace: 'G4',
           extraservices: '1,3,4'
           }
           ],
   
           labels: [
           '12am',
           '3am',
           '6am',
           '9am',
           '12pm',
           '3pm',
           '6pm',
           '9pm',
         ],
         value: [
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


   computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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

    methods: {
      
      editItem (item) {
        this.editedIndex = this.parkedcars.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.parkedcars.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.parkedcars.splice(this.editedIndex, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
   }
</script>
<style>
</style>