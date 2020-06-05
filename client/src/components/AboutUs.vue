<template>
    <div class="container">
        <div class="col1">
            <h1>About Us</h1>
            <p><b>We</b> are a non-profit organization (we really don't make any money) who bring people who have cars they want to get rid of and people who need cars, together in glorious harmony. We started our venture on on January 9th of 2020, and didn't know what where we'd end up. We simply had a goal in mind and nothing else. After hours of tireless development and hours of bringing those who have cars they want to get rid of and people who want to buy cars together, we are here - and we cannot be happier with the result.</p>
            <h2>About this Website</h2>
            <p><b>On</b> a more serious note, the development of this website has not been easy. The first time we were introduced the idea of the MEVN (MongoDB, Express, Vue and NodeJS) Stack, the method we learned didn't explain any of the code we were copying and had us installing and adding more than needed which unnecessarily complicated things. After finding a new explination and taking the time to reseach each part of the <i>Full Stack</i>, it made much more sense to the point where something like this application could have been developed. I don't know what the final url for this will be (depends on if I get Heroku working), the DB is located at /api/cars, even if you're running on localhost:8080. Enjoy this picture of the concept for the <a href="https://goo.gl/maps/rJvsh332wu81Q2XR9">Bayview Glen Prep/Upper School</a>:</p>
            <img style="width: 85%;" src="https://media-exp1.licdn.com/dms/image/C4D1BAQHpxtF9hpNSKw/company-background_10000/0?e=2159024400&v=beta&t=J9LpmvRe6TMsZCQ_kPqsBRqYG32DJYcYuEf53daYABg">
        </div>
        <div class="col2">
            <h1>Useful Links</h1>
            <h2>The Traversy Trio on the MEVN Stack </h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/j55fHUJqtyw" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="420" height="236.25" src="https://www.youtube.com/embed/X-JZ-QPApUs" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="420" height="236.25" src="https://www.youtube.com/embed/W-b9KGwVECs" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>
export default ({
    
})
</script>

<style scoped>
.col1{
  float: left;
  width: 40%;
  padding-left: 75px;
  padding-right: 75px;
  line-height: 1.6;
}

.col2 {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.container:after {
  content: "";
  display: table;
  clear: both;
}
</style>