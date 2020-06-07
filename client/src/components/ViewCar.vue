<template>
    <div id="view-car-container">
        <h1>Viewing: {{ car.year }} {{ car.make }} {{ car.model }}</h1>
        <button class="delete" v-on:click="deleteCar(car._id)">Delete</button>
    </div>
</template>

<script>
import CarService from '../CarService'

export default {
name: 'ViewCar',
  data() {
    return {
      car: {}
    }
  },
  async created() {  
    try {
      this.car = await CarService.getCarById(this.$route.params.id);
    } catch(err) {
      console.log(err.msg)
    }
  },
  methods: {
    async deleteCar(id) {
      await CarService.deleteCar(id);
      this.cars = await CarService.getCars();
    },
  }
};
</script>

<style scoped>

</style>
