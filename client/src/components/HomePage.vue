<template>
  <div class="container">
    <h1>Latest Car Listings</h1>
    <div class= "search-brands">
      <label for="search-brands">Filter Listings by Brand: </label>
        <select id="select" v-on:change="byBrand()">
          <option value="default" selected>All</option>
        </select>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="cars-container">
      <div class="car" v-for="(car, index) in cars" v-bind:item="car" v-bind:index="index" v-bind:key="car._id">
        <p class="created-at">{{ `${car.createdAt.getDate()}/${car.createdAt.getMonth()+1}/${car.createdAt.getFullYear()}` }}</p>
        <p class="car-post">{{ car.make }} {{ car.model }}</p>
        <button class="delete" v-on:click="deleteCar(car._id)">Delete</button>
        <router-link :to="{ name: 'view', params: { id: car._id } }">Go!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CarService from '../CarService';

export default {
name: 'HomePage',
  data() {
    return {
      cars: [],
      error: '',
      make: '',
      model: '',
      brands: []
    }
  },
  async created() {
    try {
      this.cars = await CarService.getCars();
      this.brands = this.cars.map(car => car.make);
    } catch (err) {
      this.error = err.message;
    }
    
    const select = document.getElementById('select');
    const brands = [...new Set(this.brands.sort((a,b) => a > b ? 1 : -1))];
    for (let i = 0; i < brands.length; i++){
      let option = document.createElement("OPTION"), txt = document.createTextNode(brands[i]);
      option.appendChild(txt),
      option.setAttribute("value", brands[i]);
      select.insertBefore(option, select.lastChild);
    }
  },
  methods: {
    async deleteCar(id) {
      await CarService.deleteCar(id);
      this.cars = await CarService.getCars();
    },
    async byBrand(){
      const select = document.getElementById("select");
      const make = select.options[select.selectedIndex].value;
      if (make === "default")
        this.cars = await CarService.getCars()
      else {
        let cars = await CarService.getCars();
        this.cars = cars.filter(car => car.make === make);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.car {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

p.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.car-post{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

button.delete{
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 16px;
  text-align: center;
  font-size: 13px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
