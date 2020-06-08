<template>
  <div class="container">
    <h1>Latest Car Listings</h1>

    <div id="sort-by">
      <label for="select-sort">Sort Listings by: </label>
      <select id="select-sort" style="width:20%; margin-right:5px;" v-on:change="sortBy('as')">
        <option class="option" value="pd" selected>Post Date</option>
        <option class="option" value="make">Brand</option>
        <option class="option" value="price">Price</option>
        <option class="option" value="mileage">Mileage</option>
        <option class="option" value="year">Year</option>
      </select>
      <button class="sort-button" v-on:click="sortBy('as')">Ascending</button>
      <button class="sort-button" v-on:click="sortBy('des')">Descending</button>
    </div>

    <hr>

    <div id="filter-by">
      <label for="filter-by">Filter Listings by: </label>
      <button class="filter-button" v-on:click="filterChange('brand')">Brand</button>
      <button class="filter-button" v-on:click="filterChange('year')">Year</button>
      <button class="filter-button" v-on:click="filterChange('price')">Price</button>
      <button class="filter-button" v-on:click="filterChange('mileage')">Mileage</button>
      <button class="filter-button" v-on:click="filterChange('bodytype')">Bodytype</button>
      <button class="filter-button" v-on:click="filterChange('drivetrain')">Drivetrain</button>
      <button class="reset-filter" v-on:click="resetSelection()">Reset Filters</button>
    </div>

    <div id="filter-brand" hidden>
      <select id="select-brand" v-on:change="byBrand()">
        <option class="option" value=" " selected disabled>Select Brand</option>
        <option class="option" value="default">All Brands</option>
      </select>
    </div>
    
    <div id="filter-year" hidden>
      <input type="number" id="year-min" class="inputfield" placeholder="Min Year">
      <input type="number" id="year-max" class="inputfield" placeholder="Max Year"> <br>
      <button type="button" id="search" v-on:click="byYear()">Search</button>
    </div>
    
    <div id="filter-price" hidden>
      <input type="number" id="price-min" class="inputfield" placeholder="Price Min ($)">
      <input type="number" id="price-max" class="inputfield" placeholder="Price Max ($)"> <br>
      <button type="button" id="search" v-on:click="byPrice()">Search</button>
    </div>

    <div id="filter-mileage" hidden>
      <select id="mileage-unit">
          <option value="default" selected disabled>Select Unit</option>
          <option value="km">kilometres</option>
          <option value="m">miles</option>
        </select><br>
      <input type="number" id="mileage-min" class="inputfield" placeholder="Mileage Min">
      <input type="number" id="mileage-max" class="inputfield" placeholder="Mileage Max"> <br>
      <button type="button" id="search" v-on:click="byMileage()">Search</button>
    </div>

    <div id="filter-bodytype" hidden>
      <select id="select-bodytype" v-on:change="byBodytype()">
        <option value=" " selected disabled>Select Bodytype</option>
        <option value="default">All Body Styles</option>
      </select>
    </div>

    <div id="filter-drivetrain" hidden>
      <select id="select-drivetrain" v-on:change="byDrivetrain()">
        <option value=" " selected disabled>Select Drivetrain</option>
        <option value="default">All Drivetrains</option>
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
      brands: [],
      bodytypes: [],
      drivetrains: [],
      sortmodifier: 'as'
    }
  },
  async created() {
    try {
      this.cars = await CarService.getCars();
      this.brands = this.cars.map(car => car.make);
      this.bodytypes = this.cars.map(car => car.bodytype);
      this.drivetrains = this.cars.map(car => car.drivetrain);
    } catch (err) {
      this.error = err.message;
    }
    
    const selectBrand = document.getElementById('select-brand');
    const brands = [...new Set(this.brands.sort((a,b) => a > b ? 1 : -1))];
    for (let i = 0; i < brands.length; i++){
      let option = document.createElement("OPTION"), 
      txt = document.createTextNode(brands[i]);
      option.appendChild(txt),
      option.setAttribute("value", brands[i]);
      selectBrand.insertBefore(option, selectBrand.lastChild);
    }

    const selectBT = document.getElementById('select-bodytype');
    const bodytypes = [...new Set(this.bodytypes.sort((a,b) => a > b ? 1 : -1))];
    for (let i = 0; i < bodytypes.length; i++){
      let option = document.createElement("OPTION"), 
      txt = document.createTextNode(bodytypes[i].substring(0,1).toUpperCase() + bodytypes[i].substring(1));
      option.appendChild(txt),
      option.setAttribute("value", bodytypes[i]);
      selectBT.insertBefore(option, selectBT.lastChild);
    }

    const selectDrive = document.getElementById('select-drivetrain');
    const drivetrains = [...new Set(this.drivetrains.sort((a,b) => a > b ? 1 : -1))];
    for (let i = 0; i < drivetrains.length; i++){
      let option = document.createElement("OPTION"), 
      txt = document.createTextNode(drivetrains[i].toUpperCase());
      option.appendChild(txt),
      option.setAttribute("value", drivetrains[i]);
      selectDrive.insertBefore(option, selectDrive.lastChild);
    }  
  },
  methods: {
    filterChange(filter){
      let brand = document.getElementById('filter-brand');
      let year = document.getElementById('filter-year');
      let price = document.getElementById('filter-price');
      let mileage = document.getElementById('filter-mileage');
      let bodytype = document.getElementById('filter-bodytype');
      let drivetrain = document.getElementById('filter-drivetrain');

      if(filter === 'brand'){
        brand.hidden = false;
        year.hidden = true;
        price.hidden = true;
        mileage.hidden = true;
        bodytype.hidden = true;
        drivetrain.hidden = true;
      }else if(filter === 'year'){
        brand.hidden = true;
        year.hidden = false;
        price.hidden = true;
        mileage.hidden = true;
        bodytype.hidden = true;
        drivetrain.hidden = true;
      }else if(filter === 'price'){
        brand.hidden = true;
        year.hidden = true;
        price.hidden = false;
        mileage.hidden = true;
        bodytype.hidden = true;
        drivetrain.hidden = true;
      }else if(filter === 'mileage'){
        brand.hidden = true;
        year.hidden = true;
        price.hidden = true;
        mileage.hidden = false;
        bodytype.hidden = true;
        drivetrain.hidden = true;
      }else if(filter === 'bodytype'){
        brand.hidden = true;
        year.hidden = true;
        price.hidden = true;
        mileage.hidden = true;
        bodytype.hidden = false;
        drivetrain.hidden = true;
      }else if(filter === 'drivetrain'){
        brand.hidden = true;
        year.hidden = true;
        price.hidden = true;
        mileage.hidden = true;
        bodytype.hidden = true;
        drivetrain.hidden = false;
      }
    },
    async resetSelection(){
      this.cars = await CarService.getCars();
      document.getElementById('filter-brand').hidden = true;
      document.getElementById('filter-year').hidden = true;
      document.getElementById('filter-price').hidden = true;
      document.getElementById('filter-mileage').hidden = true;
      document.getElementById('filter-bodytype').hidden = true;
      document.getElementById('filter-drivetrain').hidden = true;
    },
    async byBrand(){
      const select = document.getElementById("select-brand");
      const make = select.options[select.selectedIndex].value;
      if (make === "default")
        this.cars = await CarService.getCars()
      else {
        let cars = await CarService.getCars();
        this.cars = cars.filter(car => car.make === make);
      }
    },
    async byYear(){
      const inputMax = document.getElementById("year-max").value;
      const inputMin = document.getElementById("year-min").value;
      let cars = await CarService.getCars();
      this.cars = cars.filter(car => car.year <= inputMax && car.year >= inputMin);
    },
    async byPrice(){
      const inputMax = document.getElementById("price-max").value;
      const inputMin = document.getElementById("price-min").value;
      let cars = await CarService.getCars();
      this.cars = cars.filter(car => car.price <= inputMax && car.price >= inputMin);
    },
    async byMileage(){
      const MULTIPLIER = 1.609;

      let inputMax = document.getElementById("mileage-max").value;
      let inputMin = document.getElementById("mileage-min").value;
      const unitSelect = document.getElementById("mileage-unit");
      const inputUnit = unitSelect.options[unitSelect.selectedIndex].value;

      let cars = await CarService.getCars();
      let newCars = [];

      if (inputUnit !== 'km') {
        inputMax *= MULTIPLIER;
        inputMin *= MULTIPLIER;
      }
      
      cars.forEach((car) => {
        if(car.mileageunit !== 'km') 
          if (car.mileage*MULTIPLIER <= inputMax && car.mileage*MULTIPLIER >= inputMin) newCars.push(car);
        else if (car.mileage <= inputMax && car.mileage >= inputMin) newCars.push(car);
      });

      this.cars = newCars;
    },
    async byBodytype(){
      const select = document.getElementById("select-bodytype");
      const bodytype = select.options[select.selectedIndex].value;
      if (bodytype === "default")
        this.cars = await CarService.getCars()
      else {
        let cars = await CarService.getCars();
        this.cars = cars.filter(car => car.bodytype === bodytype);
      }
    },
    async byDrivetrain(){
      const select = document.getElementById("select-drivetrain");
      const drivetrain = select.options[select.selectedIndex].value;
      if (drivetrain === "default")
        this.cars = await CarService.getCars()
      else {
        let cars = await CarService.getCars();
        this.cars = cars.filter(car => car.drivetrain === drivetrain);
      }
    },
    async sortBy(mod){
      this.sortmodifier = mod;
      const select = document.getElementById("select-sort");
      const option = select.options[select.selectedIndex].value;
      const pd_as_cars = await CarService.getCars();
      if (this.sortmodifier === "as") {
        if (option === "pd") this.cars = pd_as_cars;
        else if (option === "make") this.cars.sort((a, b) => (a.make.toUpperCase() > b.make.toUpperCase()) ? 1 : -1);
        else if (option === "price") this.cars.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : -1);
        else if (option === "mileage") this.cars.sort((a, b) => (toKM(a) > toKM(b)) ? 1 : -1);
        else if (option === "year") this.cars.sort((a, b) => (parseInt(a.year) > parseInt(b.year)) ? 1 : -1);
      } else if (this.sortmodifier === "des") {
        if (option === "pd") this.cars.reverse()
        else if (option === "make") this.cars.sort((a, b) => (a.make.toUpperCase() > b.make.toUpperCase()) ? -1 : 1);
        else if (option === "price") this.cars.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? -1 : 1);
        else if (option === "mileage") this.cars.sort((a, b) => (toKM(a) > toKM(b)) ? -1 : 1);
        else if (option === "year") this.cars.sort((a, b) => (parseInt(a.year) > parseInt(b.year)) ? -1 : 1);
      }
      function toKM(a){
        const MULTIPLIER = 1.609;
        if(a.mileageunit !== "km") return parseInt(a.mileage)*MULTIPLIER;
        else return parseInt(a.mileage);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p.error {
	border: 1px solid #ff5b5f;
	background-color: #ffc5c1;
	padding: 10px;
	margin-bottom: 15px;
}
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
.car-price{
	float: right;
	color: green;
}
.car-description {
	text-align: left;
}
.filter-button, .sort-button{
	color: black;
	text-align: center;
	padding: 5px 5px;
	margin-right: 3px;
	font-size: 17px;
	border: 2px solid #d9d9d9;
	border-radius: 3px;
	background-color: #e6e6e6;
}
.filter-button:hover, .sort-button:hover{
	background-color: #2f6291;
	border: 2px solid #1a3752;
	color: white;
	cursor: pointer;
}
.reset-filter{
	color: white;
	text-align: center;
	padding: 5px 5px;
	font-size: 16px;
	border: 2px solid #1a3752;
	border-radius: 3px;
	background-color: #2f6291;
}
.reset-filter:hover{
	background-color: #9c2525;
	border: 2px solid #631616;
	color: white;
	cursor: pointer;
}
.inputfield{
	width: 47%;
	padding: 10px 15px;
	margin-top: 8px;
	margin-right: 5px;
	box-sizing: border-box;
	border: 3px solid #ccc;
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
	font-size: 15px;
}
.inputfield:focus{
	border: 3px solid #555;
}
#select-brand, #select-bodytype, #select-drivetrain, #mileage-unit, #select-sort {
	width: 94%;
	padding: 10px 15px;
	margin-top: 8px;
	border: none;
	border-radius: 4px;
	background-color: #f1f1f1;
	font-size: 15px;
}
#search{
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
#search:hover{
	background-color: #2f913e;
	border: 2px solid #1a521f;
	cursor: pointer;
}
</style>
