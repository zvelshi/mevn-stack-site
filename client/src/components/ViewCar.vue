<template>
    <div id="view-car-container">
        <h1>View Car: {{ $route.params.id }}</h1>
        <h1>Viewing: {{ car.make }} {{ car.model }}</h1>
    </div>
</template>

<script>
//import CarService from '../CarService';

export default {
name: 'ViewCar',
  data() {
    return {
      car: {}
    }
  },
  async created() {
    /*
    try {
      this.car = await CarService.findCarById(this.$route.params.id);
    } catch (err) {
      console.log(err);
    }
    */
  }
};
</script>

<style scoped>

</style>>
