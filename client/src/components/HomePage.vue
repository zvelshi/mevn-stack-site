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
    <div class="car" v-for="(car, index) in cars" v-bind:item="car" v-bind:index="index" v-bind:key="car._id">
      <div class="car-post">
        <img>
        <router-link class="car-name" :to="{ name: 'view', params: { id: car._id } }">{{ car.year }} {{ car.make }} {{ car.model }}</router-link>
        <p class="car-description">{{car.description}}</p>
        <p class="car-price"><b>${{ car.price }}</b></p>
        <p class="car-mileage"><b>Mileage </b>{{ car.mileage }}{{ car.mileageunit }}</p>
        <p class="car-created-at"><b>Posted On </b>{{ `${car.createdAt.toDateString()}` }}</p>
        <!--<button class="delete" v-on:click="deleteCar(car._id)">Delete</button> <br>-->
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
.container {
  max-width: 50%;
  margin: 0 auto;
}

.car-post{
  position: relative;
  border: 2px solid #d9d9d9;
  border-radius: 3px;
  background-color: #e6e6e6;
  padding: 10px 10px 20px 10px;
  margin-bottom: 15px;
}

.car-name {
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  color: #2f6291;
  font-size: 18px;
}

.car-name:hover{
  color: #0e385e;
}

.car-mileage, .car-created-at {
  font-size: 14px;
  text-align: left;
}

.car-price {
  float: right;
}

.car-description {
  text-align: left;
}
</style>
