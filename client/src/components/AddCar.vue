<template>
    <div id="create-car-container">
    <h1>List Your Car</h1>
        <label for="create-car">Add your car: </label>
        <input type="text" id="create-car" v-model="make" placeholder="Toyota">
        <input type="text" id="create-car" v-model="model" placeholder="Camry">
        <button v-on:click="createCar">Post!</button>
        <p class="error" v-if="error">{{ error }}</p>
        <router-link id='backtohomebutton' hidden to='/'>Back to Home</router-link>
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
      make: '',
      model: '',
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
        await CarService.insertCar(this.make, this.model);
        this.cars = await CarService.getCars();
        document.getElementById('backtohomebutton').hidden = false;
        this.error = "Your vehicle was added successfully."
      }
    }    
  }
};
</script>

<style scoped>

</style>>
