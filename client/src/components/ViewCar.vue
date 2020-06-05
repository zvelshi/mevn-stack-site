<template>
    <div id="view-car-container">
        <h1>View Car: {{ this.$route.params.id }}</h1>
        <!--<h1>Viewing: {{ car.year }} {{ car.make }} {{ car.model }}</h1>-->
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
    let test = {};
    console.log(test);

    try {
      test = await CarService.getCarById(this.$route.params.id)
    } catch(err) {
      console.log(err.msg)
    }

    console.log(test);
  }
};
</script>

<style scoped>

</style>>
