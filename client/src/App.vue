<template>
  <div id="app">
    <h1>AutoDeal</h1>
    <div class="centered">
      <div class="topnav">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a style="float: right;" href="/add">Sell My Car</a>
      </div>
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

.centered{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.topnav {
  background-color: #333;
  overflow: hidden;
  width: 75%;
  border-radius: 6px;;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.topnav a:hover {
  background-color: #2f6291;
  color: white;
}
</style>
