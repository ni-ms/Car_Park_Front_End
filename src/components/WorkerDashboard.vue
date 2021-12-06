<template>
  <v-container>
      <v-card>
          <v-card-title>
              Cars
          </v-card-title>

          <v-card-subtitle>
              List of cars to work on
          </v-card-subtitle>
          <v-card-text>
            <v-data-table
    v-model="selected"
    :headers="headers"
    :items="customers"
    :single-select="true"
    item-key="name"
    show-select
    class="elevation-1"
  >
   <template v-slot:[`item.extraservices`] ="{ item }">
     <div v-for="module in item.extraservices" :key="module.id">
        {{module.id}}
     </div>
 </template>
    <template v-slot:top>
     <v-btn
  elevation="2">
Done
</v-btn>
    </template>
  </v-data-table>
          </v-card-text>
      </v-card>
      <br>
      <v-card>
          <v-card-title>
             Worker Report
          </v-card-title>

          <v-card-text>
              <v-data-table>
              </v-data-table>
          </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
export default {
    name: 'WorkerDash',
    data() {
        return {
                singleSelect: false,
        selected: [],
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
          { text: 'Cancel', value: 'cancelbutton', sortable: false},
        ],
        }
    },
}
</script>

<style>

</style>