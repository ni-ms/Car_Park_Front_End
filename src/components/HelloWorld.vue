<template>
  <v-container>
    <v-sheet
    rounded-x5
    width="100vw"
    
    >
 <h1>THE CAR PARKING SOLUTIONS</h1>
    <div class="container" id="c1">
        <div class="feature" id="F1">
            <h2>EASY BOOKING AND CANCELLATION</h2>
        </div>
        <div class="feature" id="f1">
            <p><b>Booking fees is only Rs. 100</b></p>
            <p><b>Any cancellation done 2-hours before the check-in time will be free of cost</b></p>

        </div>
    </div>
    <div class="container" id="c2">
        <div class="feature" id="F2">
            <h2>REWARDS FOR FREQUENT COSTUMERS</h2>
        </div>
        <div class="feature" id="f2">
            <p><b>Discount coupons will be provided afetr every 5 visits   </b></p>
        </div>
    </div>
    <div class="container" id="c3">
        <div class="feature" id="F3">
            <h2>ADDITIONAL SERVICES ARE PROVIDED</h2>
        </div>
        <div class="feature" id="f3">
            <p><b>
                <ul>
                    <li>Dry Cleaning</li>
                    <li>Car Washing</li>
                    <li>Tyre Checks</li>
                     <li>Air Filling</li>
                </ul>
            </b></p>
        </div>
    </div>
    <div class="container" id="c4">
        <div class="feature" id="F4">
            <h2>EASY PAYMENTS</h2>
        </div>
        <div class="feature" id="f4">
        <p><b>Payments can be done directly </b></p>
        <p><b>Payments can be done from your wallet</b></p>
        </div>
    </div>
    </v-sheet>

  </v-container>
</template>

<script>


export default {
  name: 'HelloWorld',
}
</script>


<style scoped>
       

        h1 {
            margin: 0px ;
            color: azure;
            /* border: 3px solid red; */
            padding: 15px;
            text-align: center;
            background-color: #282A35;

        }

        .container {
            display: flex;
            /* border: 2px solid green; */
            /* height: 70vh; */
            /* margin: 20px 5px; */
            justify-content: center;
            align-items: center;
        }

        .feature {
            /* border: 2px solid red; */
            margin: 5px;
            width: 679px;
            height: 354px;
            /* background-color: blanchedalmond; */
            text-align: center;
            
        }
        #c1{
            background-color:#D9EEE1;
        }
        #c2{
background-color: #FFF4A3;
        }
        #c3{
background-color: #282A35;
        }
        #c4{
            background-color: lavenderblush;
        }
      
        #f3 {
            color: white;
        }

        #F3 {
            color: white;
        }
       
        h2{
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
            padding-top: 115px;
        }
        #f1{
            background-color: white;
            border-radius: 16px;
            height: 212px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
            font-size: 20px;
        }
        #f2{
            background-color: white;
            border-radius: 16px;
            height: 212px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
            font-size: 20px;
        }
        #f3{
            /* background-color: white; */
            border-radius: 16px;
            height: 212px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
            font-size: 20px;
        }
        #f4{
            background-color: white;
            border-radius: 16px;
            height: 212px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
            font-size: 20px;
        }
       
        ul{
            padding: 38px 0px;
            list-style: none;
        }
        #f1 p{
            padding-top: 28px;
        }
        #f2 p{
            padding-top: 54px;
        }
        #f4 p{
            padding-top: 18px;
        }
        
        </style>