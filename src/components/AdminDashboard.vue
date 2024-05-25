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
        <div class="text-h6 d-flex justify-center "> User sign ups in the past 6 hours</div>
        <v-sparkline
            :smooth="12"
            :labels="labels"
            :value="value"
            color="#109648"
            line-width="2"
            padding="16"
        ></v-sparkline>
        <div class="text-h6 d-flex justify-center "> Profits in the past 6 hours</div>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        Add/Remove Parking Spaces
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="parkingspaceheaders"
            :items="parkingspaceitems"
            :items-per-page="5"
            class="elevation-1"
        >


          <template v-slot:top>
            <v-toolbar
                flat
            >
              <v-toolbar-title>Edit the parking spaces below</v-toolbar-title>
              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                  v-model="dialogpspace"
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
                    New Space
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitlesp }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                              v-model="parkingspacech1.parkingId"
                              label="Parking Id"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                              v-model="parkingspacech1.parkingSpaceNumber"
                              label="Parking Space Number"
                          ></v-text-field>
                        </v-col>
                        <v-col

                        >
                          <v-text-field
                              v-model="parkingspacech1.spaceActive"
                              label="Slot Active"
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
                        @click="psclose"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="pssave"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDeletepspace" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="pscloseDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="psdeleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.psactions`]="{ item }">
            <v-icon


                @click="pseditItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon

                @click="psdeleteItem(item)"
            >
              mdi-delete
            </v-icon>


          </template>


        </v-data-table>

      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        Add/Remove slots
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
              <v-toolbar-title>Add/Remove Slots</v-toolbar-title>
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
                    New Slot
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
      <v-card-text>


        <v-data-table :headers="workerheaders" :items="workeritems" :items-per-page="5" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Edit the workers below</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogworker" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    New Worker
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitleworker }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="workerobj.workerId" label="Worker Id"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="workerobj.firstName" label="First Name"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="workerobj.lastName" label="Last Name"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="workerobj.startDate" label="Start Date"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="workerobj.parkingSpaceNumber"
                                        label="Parking Space Number"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="workerobj.slotId" label="Slot Id"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="workerobj.averageRating" label="Average Rating"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="workerclose">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="workersave">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDeleteworker" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="workercloseDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="workerdeleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.workeractions`]="{ item }">
            <v-icon small @click="workereditItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="workerdeleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>


      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        Worker Report
      </v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>


  </v-container>
</template>
<script>
import axios from 'axios'

export default {

  name: 'AdminDash',

  data() {
    return {
      //workers
      workerobj: {
        workerId: 0,
        firstName: '',
        lastName: '',
        startDate: '',
        parkingSpaceNumber: '',
        slotId: '',
        averageRating: 0,
        numberOfJobs: 0,


      },
      workerobj1: {
        workerId: 0,
        firstName: '',
        lastName: '',
        startDate: '',
        parkingSpaceNumber: '',
        slotId: '',
        averageRating: 0,
        numberOfJobs: 0,
      },
      workerheaders: [
        {
          text: 'Worker ID',
          align: 'start',
          sortable: 'true',
          value: 'workerId',
        },
        {text: 'First Name', value: 'firstName'},
        {text: 'Last Name', value: 'lastName'},
        {text: 'Last Date', value: 'lastDate'},
        {text: 'Parking Space Number', value: 'parkingSpaceNumber'},
        {text: 'Slot Id', value: 'slotId'},
        {text: 'Average Rating', value: 'averageRating'},
        {text: 'Number of jobs', value: 'numberOfJobs'},

        {text: 'Actions', value: 'workeractions', sortable: false}


      ],
      workeritems: [],
      dialogworker: false,
      dialogDeleteworker: false,
      editedIndexworker: -1,


      //parking Space
      parkingspacech: {
        parkingId: 0,
        parkingSpaceNumber: 0,
        spaceActive: 0,


      },

      parkingspacech1: {
        parkingId: 0,
        parkingSpaceNumber: 0,
        spaceActive: 0,


      },


      selected: [],

      pslots: [{
        text: 'Slot',
        align: 'start',
        sortable: 'true',
        value: 'pSlot',
      },
        {
          text: 'Size',
          value: 'psize',
        }
      ],
      pitems: [{
        pSlot: 'G1',
        psize: '0',
      }],
      headers: [{
        text: 'Car',
        align: 'start',
        sortable: 'true',
        value: 'name',
      },
        {text: 'License Plate', value: 'license'},
        {text: 'Name', value: 'username'},
        {text: 'Start time', value: 'pstart'},
        {text: 'End time', value: 'pend'},
        {text: 'Parking Space', value: 'pspace'},
        {text: 'Extras Services', value: 'extraservices'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      parkingspaceheaders: [{
        text: 'Parking ID',
        align: 'start',
        sortable: 'true',
        value: 'parkingId',
      },
        {text: 'Parking Space Number', value: 'parkingSpaceNumber'},
        {text: 'Slot Active', value: 'spaceActive'},
        {text: 'Actions', value: 'psactions', sortable: false}

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
      //parking space
      dialogpspace: false,
      dialogDeletepspace: false,
      editedIndexsp: -1,
      parkingspaceitems: [],
      //continue
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
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    formTitlesp() {
      return this.editedIndexsp === -1 ? 'New Item' : 'Edit Item'
    },
    formTitleworker() {
      return this.editedIndexworker === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogpspace(val1) {
      val1 || this.psclose()
    },
    dialogDeletepspace(val2) {
      val2 || this.pscloseDelete()
    },
    dialogworker(val3) {
      val3 || this.workerclose()
    },
    dialogDeleteworker(val2) {
      val2 || this.workercloseDelete()
    },
  },

  created() {

    this.updateslots();
  },

  methods: {
    updateslots() {

      axios.get('http://localhost:8080/parking').then(response => {

        for (var i = 0; i < response.data.length; i++)
          this.parkingspaceitems.push(response.data[i]);


      }).finally(console.log("done"));
    },
    //worker
    workereditItem(item) {
      this.editedIndexworker = this.workeritems.indexOf(item)
      this.workerobj1 = Object.assign({}, item)
      this.dialogworker = true
    },


    workerdeleteItem(item) {
      this.editedIndexworker = this.workeritems.indexOf(item)

      this.workerobj1 = Object.assign({}, item)
      this.dialogDeleteworker = true

    },

    workerdeleteItemConfirm() {


      this.workeritems.splice(this.editedIndexworker, 1)

      this.workercloseDelete()
    },

    workerclose() {
      this.dialogworker = false
      this.$nextTick(() => {
        this.workerobj1 = Object.assign({}, this.workerobj)
        this.editedIndexworker = -1
      })
    },

    workercloseDelete() {
      this.dialogDeleteworker = false
      this.$nextTick(() => {
        this.pworkerobj1 = Object.assign({}, this.workerobj)
        this.editedIndexworker = -1
      })
    },

    workersave() {
      if (this.editedIndexworker > -1) {
        Object.assign(this.workeritems[this.editedIndexworker], this.workerobj1)
      } else {
        this.workeritems.push(this.workerobj1)
      }
      this.workerclose()
    },


    //parking space
    pseditItem(item) {
      this.editedIndexsp = this.parkingspaceitems.indexOf(item)
      this.parkingspacech1 = Object.assign({}, item)
      axios.post('http://localhost:8080/parking', {
        parkingId: this.parkingspacech1.parkingId,
        parkingSpaceNumber: this.parkingspacech1.parkingSpaceNumber,
        spaceActive: this.parkingspacech1.spaceActive
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      this.dialogpspace = true
    },


    psdeleteItem(item) {
      this.editedIndexsp = this.parkingspaceitems.indexOf(item)
      this.parkingspacech1 = Object.assign({}, item)
      var temp = this.parkingspaceitems[this.editedIndexsp].parkingId;

      console.log(temp)
      axios.delete('http://localhost:8080/parking/' + temp).then(function (response) {
        console.log(response);
      })
          .catch(function (error) {
            console.log(error);
          });
      this.dialogDeletepspace = true

    },

    psdeleteItemConfirm() {


      this.parkingspaceitems.splice(this.editedIndexsp, 1)

      this.pscloseDelete()
    },

    psclose() {
      this.dialogpspace = false
      this.$nextTick(() => {
        this.parkingspacech1 = Object.assign({}, this.parkingspacech)
        this.editedIndexsp = -1
      })
    },

    pscloseDelete() {
      this.dialogDeletepspace = false
      this.$nextTick(() => {
        this.parkingspacech1 = Object.assign({}, this.parkingspacech)
        this.editedIndexsp = -1
      })
    },

    pssave() {
      if (this.editedIndexsp > -1) {
        Object.assign(this.parkingspaceitems[this.editedIndexsp], this.parkingspacech1)
      } else {
        this.parkingspaceitems.push(this.parkingspacech1)
      }
      this.psclose()
    },


    //regular
    editItem(item) {
      this.editedIndex = this.parkedcars.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },


    deleteItem(item) {
      this.editedIndex = this.parkedcars.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.parkedcars.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
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