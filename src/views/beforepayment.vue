<template>
    <v-container>
        <v-sheet>
           
    <table class="GeneratedTable">
        <thead>
            <tr>
                <th>BOOKING DETAILS</th>
                <th>Header</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Check-in </td>
                <td>Cell</td>
            </tr>
            <tr>
                <td>Check-out</td>
                <td>Cell</td>
            </tr>
            <tr>
                <td>Vechicle Number</td>
                <td>Cell</td>
            </tr>
            <tr>
                <td>Parking Slot</td>
                <td>Cell</td>
            </tr>
            <tr>
                <td>Total Amount</td>
                <td>Cell</td>
            </tr>
        </tbody>
    </table>
    <v-btn>Book Now</v-btn>
    <v-btn>Make Changes</v-btn> 
        </v-sheet>
    </v-container>
</template>
<script>

export default{
    name: 'BeforePayment',
}
</script>

<style scoped>
      
        table.GeneratedTable {
            
            width: 100%;
            background-color: #ffdbdb;
            border-collapse: collapse;
            border-width: 2px;
            border-color: #ffdbdb;
            border-style: solid;
            /* color: #ce2c2c; */
        }

        table.GeneratedTable td,
        table.GeneratedTable th {
            text-align: center;
            border-width: 2px;
            border-color: #e4fff5;
            border-style: solid;
            padding: 22px;
        }


        table.GeneratedTable thead {
            background-color: #ff98ab;
        }

       
    </style>