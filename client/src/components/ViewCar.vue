<template>
    <div class="container">
        <div class="post-title">
          <div class="title home"><a href="/">Back to Home</a></div>
          <div class="title main"><h1>{{ car.year }} {{ car.make }} {{ car.model }}</h1></div>
          <div class="title price"><h1> ${{ car.price }} </h1></div>
        </div>

        <div class="post-image"></div>

        <div class="post-highlights">
          <h3>Highlights</h3>
          <div class="highlights mileage"><p><b>Mileage</b> <br> {{ car.mileage }} {{ car.mileageunit }}</p></div>
          <div class="highlights transmission"><p><b>Transmission</b> <br> {{ car.transmission }}</p></div>
          <div class="highlights drivetrain"><p><b>Drivetrain</b> <br> {{ car.drivetrain }}</p></div>
        </div>

        <div class="post-ad"></div>
        <div class="post-ad"></div>

        <div class="post-description">
          <h3>Description</h3>
          <p>{{ car.description }}</p>
        </div>
        
        <div class="post-specs">
          <h3>All Specifications</h3>
          <p><b>Mileage</b> {{ car.mileage }} {{ car.mileageunit }} <br> <b>Year</b> {{ car.year }}<br> <b>Brand</b> {{ car.make }} <br> <b>Body Style</b> {{ car.bodytype }} <br> <b>Body Colour</b> {{ car.colour }} <br> <b>Engine</b> {{ car.engineinfo }} <br> <b>Drivetrain</b> {{ car.drivetrain }} <br> <b>Transmission</b> {{ car.transmission }}</p>
        </div>

        <div class="post-alsoviewed">
          <h3>People Also Viewed</h3>
          <div class="alsoviewed-listing" v-for="(car, index) in cars" v-bind:item="car" v-bind:index="index" v-bind:key="car._id">
            <router-link class="car-name" :to="{ name: 'view', params: { id: car._id } }">{{ car.year }} {{ car.make }} {{ car.model }}</router-link>
            <p class="car-price"><b>${{ car.price }}</b></p>
            <p class="car-mileage"><b>Mileage </b>{{ car.mileage }}{{ car.mileageunit }}</p>
            <p class="car-created-at"><b>Posted On </b>{{ `${car.createdAt.toDateString()}` }}</p> 
          </div>
        </div>
        <br>
        <button id="button-admin" style="float:right;" v-on:click="adminSettings()">Admin Settings</button>
        <button id="button-delete" v-on:click="deleteCar(car._id)" style="float:right;" hidden>Delete Listing</button>
    </div>
</template>

<script>
import CarService from '../CarService'

export default {
name: 'ViewCar',
  data() {
    return {
      car: {},
      cars: []
    }
  },
  async created() {  
    try {
      this.car = await CarService.getCarById(this.$route.params.id);
    } catch(err) {
      console.log(err.msg)
    }

    this.car.bodytype = this.car.bodytype.substring(0,1).toUpperCase() + this.car.bodytype.substring(1);
    this.car.transmission = this.car.transmission.substring(0,1).toUpperCase() + this.car.transmission.substring(1);

    let maxPrice = parseInt(this.car.price) + 5000;
    let minPrice = parseInt(this.car.price) - 5000;
    let cars = await CarService.getCars();
    this.cars = cars.filter(car => car.price < maxPrice && car.price > minPrice && car._id !== this.car._id); //show cars in the same price range +-5000
    if(this.cars.length < 2) this.cars = cars.filter(car => car.price < maxPrice+5000 && car.price > minPrice-5000 && car._id !== this.car._id); //if no cars in +-5000, show in +-10000
    if(this.cars.length < 2) this.cars = cars.filter(car => car.bodytype == this.car.bodytype && car._id !== this.car._id); //if no cars in +-10000, show same bodytype
    this.cars.slice(0,3);
  },
  methods: {
    async deleteCar(id) {
      await CarService.deleteCar(id);
    },
    adminSettings(){
      document.getElementById('button-admin').hidden = true;
      document.getElementById('button-delete').hidden = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 55%;
	margin: 0 auto;
}

.post-title{
  position: relative;
	border-radius: 3px;
	background-color: #e6e6e6;
	padding: 5px;
  margin-top: 20px;
}

.title{
  float: left;
  padding: 10px;
}

.home{
  width: 20%;
}

.home a{
  float: left;
  text-decoration: none;
  color: white;
	text-align: center;
	padding: 5px 5px;
	font-size: 16px;
	border: 2px solid #1a3752;
	border-radius: 3px;
	background-color: #2f6291;
}

.home a:hover {
  background-color: #9c2525;
	border: 2px solid #631616;
	color: white;
	cursor: pointer;
}

.price {
  margin-top: 0.25%;
  color: green;
  width: 20%;
}

.main {
  width: 50%;
  text-align: center;
	font-weight: bold;
	color: #2f6291;
	font-size: 18px;
}

.post-title:after, .post-highlights:after, .post-alsoviewed:after{
  content: "";
  display: table;
  clear: both;
}

.post-highlights, .post-description, .post-specs{
  position: relative;
	border-radius: 3px;
	background-color: #e6e6e6;
	padding: 5px;
  margin-top: 20px;
  line-height: 50%;;
}

.post-alsoviewed {
	border-radius: 3px;
	background-color: #e6e6e6;
	padding: 5px;
  margin-top: 20px;
  line-height: 50%;;
}

.alsoviewed-listing{
  width: 30.5%;
  padding: 10px 0px 10px 0px;
  margin: 10px;
  border: 2px solid #2f6291;
  border-radius: 3px;
  box-sizing: border-box;
  float: left;
  background-color: white;
}

.car-name{
  text-decoration: none;
	font-weight: bold;
	color: #2f6291;
}

.car-name:hover{
	color: #0e385e;
}

h3 {
  text-align: left;
  padding-left: 2.5%; 
  color: grey;
}

.highlights {
  float: left;
}

.mileage, .transmission, .drivetrain{
  width: 32.9%;
  font-size: 17px;
  line-height: 175%;
}

.post-specs p {
  line-height: 175%;
}
</style>
