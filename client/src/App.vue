<template>
  <div id="app">
    <h1>AutoDeal</h1>
    <div class="topnav">
      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a style="float: right;" href="/add">Sell My Car</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.topnav {
  background-color: #333;
  overflow: hidden;
  width: 100%;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #2f6291;
  color: white;
}
</style>
