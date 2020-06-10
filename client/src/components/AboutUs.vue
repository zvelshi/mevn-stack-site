<template>
    <div class="container">
        <div class="col1">
            <h1>About Us</h1>
            <p><b>We</b> are a non-profit organization (we really don't make any money) who bring people who have cars they want to get rid of and people who need cars, together in glorious harmony. We started our venture on on January 9th of 2020, and didn't know what where we'd end up. We simply had a goal in mind and nothing else. After hours of tireless development and hours of bringing those who have cars they want to get rid of and people who want to buy cars together, we are here - and we cannot be happier with the result.</p>
            <h2>About this Website</h2>
            <p><b>On</b> a more serious note, the development of this website has not been easy. The first time we were introduced the idea of the MEVN (MongoDB, Express, Vue and NodeJS) Stack, the method we learned didn't explain any of the code we were copying and had us installing and adding more than needed which unnecessarily complicated things. After finding a new explanation and taking the time to research each part of the <i>Full Stack</i>, it made much more sense to the point where something like this application could have been developed. The DB is located at websiteurl/api/cars, even if you're running on the localhost. I didn't want to outright not include this feature, but if you want to delete a listing when you click the title to it, at the bottom, there is a button which says "admin settings," once clicked it'll show a "delete post" button, that will remove that car object from the database. I considered and tried to add user and login functionality so the U in CRUD would be utilized (updating a listing), however, after troubleshooting with the user dependencies and what exists for this type of functionality, I decided not to include it. If I wanted to add something like that, I would want to give myself proper time to implement it to the best of my abilities and given the time until submission, I wouldn't be able to do it the way I want to. Having said that, I tried to include it and therefore thought about some of the potential features that would come along with it. These included: the ability to view one's user's listings in "my listings" page, the ability to contact users with the mailto: tag which would prepopulate an email, as well as edit and delete functionalities for listings of a specific user. Until given more time, please enjoy the hours of work put into the "sort by" and "filter by" functionality on the home page. <br> -Zac Velshi, developer of AutoDeal.</p>
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
.container:after {
	content: "";
	display: table;
	clear: both;
}
</style>