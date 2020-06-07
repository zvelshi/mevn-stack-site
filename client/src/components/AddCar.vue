<template>
   <div class="container">
      <h1>Vehicle Information</h1>
      <input type="number" style="width:95%" v-model="year" class="inputfield" placeholder="Year, Ex. 2001"> <br>

      <input type="text" v-model="make" class="inputfield" placeholder="Make, Ex. Toyota">

      <input type="text" v-model="model" class="inputfield" placeholder="Model, Ex. Camry"> <br>

      <input type="text" v-model="colour" class="inputfield"  placeholder="Colour, Ex. Grey">
          
        <select style="width:47%;" class="dropdown" id="select-bodytype" v-on:change="selectBodytype()">
          <option value="default" selected disabled>Body Style</option>
          <option value="compact">Compact</option>
          <option value="sedan">Sedan</option>
          <option value="coupe">Coupe/Convertible</option>
          <option value="sports">Sports</option>
          <option value="hatchback">Hatchback</option>
          <option value="wagon">Wagon</option>
          <option value="SUV">SUV</option>
          <option value="pickup">Pickup</option>
          <option value="van">Van</option>
        </select><br>

      <input type="number" class="inputfield" v-model="mileage" placeholder="Mileage, Ex. 63250"> 
        <select class="dropdown" style="width:47%;" id="select-mileageunit" v-on:change="selectMileageUnit()">
          <option value="default" selected disabled>Unit</option>
          <option value="km">kilometres</option>
          <option value="mi">miles</option>
      </select>

      <input type="text" v-model="engineinfo" class="inputfield" placeholder="3.2L 4cyl">  

      <select class="dropdown" style="width:47%;" id="select-transmission" v-on:change="selectTransmission()">
        <option value="default" selected disabled>Transmission</option>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select><br>

      <select class="dropdown" id="select-drivetrain" v-on:change="selectDrivetrain()">
        <option value="default" selected disabled>Drivetrain</option>
        <option value="RWD">RWD</option>
        <option value="FWD">FWD</option>
        <option value="AWD">AWD</option>
        <option value="4WD">4WD</option>
      </select><br>

      <input type="number" style="text-align:center" v-model="price" class="inputfield" placeholder="$CAD"> <br>

      <button v-on:click="createCar" id="post" >Post!</button>
      <p class="error" v-if="error">{{ error }}</p>
      <router-link  id='backtohomebutton' hidden to='/'>Back to Home</router-link>
  </div>
</template>

<script>
import CarService from '../CarService';

export default {
name: 'AddCar',
  data() {
    return {
      cars: [],
      error: '',
      year: '',
      make: '',
      model: '',
      bodytype: '',
      mileage: Number,
      mileageunit: '',
      drivetrain: '',
      transmission: '',
      price: Number,
      engineinfo: '',
      colour: '',
      description: '',
      condition:'',
      recognizedBrands: ["Abarth","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Bugatti","Cadillac","Chevrolet","Chrysler","Citroën","Dacia","Daewoo","Daihatsu","Dodge","Donkervoort","DS","Ferrari","Fiat","Fisker","Ford","Honda","Hummer","Hyundai","Infiniti","Iveco","Jaguar","Jeep","Kia","KTM","Lada","Lamborghini","Lancia","Land Rover","Landwind","Lexus","Lotus","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","MG","Mini","Mitsubishi","Morgan","Nissan","Opel","Peugeot","Porsche","Renault","Rolls-Royce","Rover","Saab","Seat","Skoda","Smart","SsangYong","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"]
    }
  },
  async created() {
    try {
      this.cars = await CarService.getCars();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createCar(){
      let x = 0;
      this.recognizedBrands.forEach(brand => {
        if (this.make.toUpperCase() === brand.toUpperCase())
          x++;
        });
      if (x !== 1) this.error = new Error(this.make + " is not valid brand.")
      else {
        let a = "a ";
        let bodytype = "";
        if (this.transmission === "automatic") a = "an ";
        if (this.bodytype === "sports") bodytype = "sports car";

        this.description = "This is " + a + this.transmission + " " + this.make + " " + this.model + " from " + this.year + ". It is " + this.drivetrain + " " + bodytype + " with " + this.mileage + this.mileageunit + ".";
        await CarService.insertCar(this.year, this.make, this.model, this.bodytype, this.mileage, this.mileageunit, this.drivetrain, this.transmission, this.price, this.engineinfo, this.colour, this.description, this.condition);
        this.cars = await CarService.getCars();
        document.getElementById('backtohomebutton').hidden = false;
        this.error = "Your vehicle was added successfully."
      }
    },
    loadImage(){
      this.bodytype = document.getElementById('select-bodytype').value;
      document.getElementById('body-image').src = "../assets/body-types/" + document.getElementById('select-bodytype').value + ".png";
    },
    selectBodytype(){
      const select = document.getElementById("select-bodytype");
      const bodytype = select.options[select.selectedIndex].value;
      this.bodytype = bodytype;
    },
    selectMileageUnit(){
      const select = document.getElementById("select-mileageunit");
      const unit = select.options[select.selectedIndex].value;
      this.mileageunit = unit;
    },
    selectTransmission(){
      const select = document.getElementById("select-transmission");
      const transmission = select.options[select.selectedIndex].value;
      this.transmission = transmission;
    },
    selectDrivetrain(){
      const select = document.getElementById("select-drivetrain");
      const drivetrain = select.options[select.selectedIndex].value;
      this.drivetrain = drivetrain;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 50%;
  margin: 0 auto;
}

.inputfield{
  width: 47.5%;
  padding: 10px 15px;
  margin-top: 8px;
  margin-right: 4px;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  font-size:  15px;
}

.inputfield:focus{
  border: 3px solid #555;
}

.dropdown{
  width: 95%;
  padding: 10px 15px;
  margin-top: 8px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
  font-size: 15px;
}

#post{
  color: white;
  text-align: center;
  padding: 5px 5px;
  font-size: 16px;
  border: 2px solid #1a3752;
  border-radius: 3px;
  background-color: #2f6291;
  margin-top: 8px;
  width: 75px;
}

#post:hover{
  background-color: #2f913e;
  border: 2px solid #1a521f;
  cursor: pointer;
}
</style>>
