<template>
   <div class="container">
      <h1>List Your Car</h1>
      <label for="create-car">Vehicle Information: </label> <br>

      <label for="create-car">Year: </label>
      <input type="number" id="create-car" v-model="year" placeholder="2001"> <br>

      <label for="create-car">Make: </label>
      <input type="text" id="create-car" v-model="make" placeholder="Toyota"> <br>

      <label for="create-car">Model: </label>
      <input type="text" id="create-car" v-model="model" placeholder="Camry"> <br>

      <label for="create-car">Colour: </label>
      <input type="text" v-model="colour" placeholder="Grey"> <br>
           
      <img id="body-image" alt="[Image]" :src="`../assets/body-types/${bodytype}.png`"> <br> <br>
      <label for="body-type">Body Style: </label>
        <select id="select" v-model="bodytype">
          <option value="default" disabled>Please select</option>
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

      <label for="create-car">Mileage: </label>
      <input type="number" id="create-car" v-model="mileage" placeholder="7558"> 
        <select id="select" v-model="mileageunit">
          <option value="default" selected disabled>Please select</option>
          <option value="km">kilometres</option>
          <option value="mi">miles</option>
        </select><br>
        
      <label for="create-car">Drivetrain: </label>
        <select id="select" v-model="drivetrain">
          <option value="default" selected disabled>Please select</option>
          <option value="RWD">RWD</option>
          <option value="FWD">FWD</option>
          <option value="AWD">AWD</option>
          <option value="4WD">4WD</option>
        </select><br>

      <label for="create-car">Transmission: </label>
        <select id="select" v-model="transmission" placeholder="Automatic">
          <option value="default" selected disabled>Please select</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select><br>

      <label for="create-car">Engine Information: </label>
      <input type="text" v-model="engineinfo" placeholder="3.2L 4cyl"> <br>      

      <label for="create-car">Asking Price: </label>
      <input type="number" v-model="price" placeholder="$CAD"> <br>

      <button v-on:click="createCar">Post!</button>
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

        this.description = "This is " + a + this.transmission + " " + this.make + " " + this.model + " from " + this.year + ". It is a " + this.drivetrain + " " + bodytype + " with " + this.mileage + this.mileageunit + ".";
        await CarService.insertCar(this.year, this.make, this.model, this.bodytype, this.mileage, this.mileageunit, this.drivetrain, this.transmission, this.price, this.engineinfo, this.colour, this.description, this.condition);
        this.cars = await CarService.getCars();
        document.getElementById('backtohomebutton').hidden = false;
        this.error = "Your vehicle was added successfully."
      }
    },
    loadImage(){
      this.bodytype = document.getElementById('select').value;
      document.getElementById('body-image').src = "../assets/body-types/" + document.getElementById('select').value + ".png";
    }    
  }
};
</script>

<style scoped>
img{
  width: 8%;
  height: 8%;
}

</style>>
