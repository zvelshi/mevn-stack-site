<template>
    <div id="view-car-container">
        <h1>View Car: {{ $route.params.id }}</h1>
        <!--<h1>Viewing: {{ car.make }} {{ car.model }}</h1>-->
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
        /* -- DOESN'T WORK, NEEDS TO BE FIXED, SEE NOTES --
        this.car = await CarService.getCarById(this.$route.params.id);
        console.log(this.car.make);
        */
    }
}
</script>

<style scoped>

</style>>
