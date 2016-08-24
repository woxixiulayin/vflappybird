<template>
  <div id="app">
  <div id='building'></div>
  <div id='building-back'></div>
  </div>
</template>

<script>
import ground from './components/ground.vue'

export default {
  data () {
    return {
      msg: 'vue flappybird!'
    }
  },
  components () {
    return {
      ground
    }
  }
}
</script>

<style>
@import './assets/css/normalize.css';

* {
  box-sizing: border-box;
}
html {
  height: 100%;
}

body {
  font-family: Helvetica, sans-serif;
  height: 100%;
}

#app {
  width: 650px;
  height: 900px;
  margin: 0 auto;
  border: 5px solid black;
  background: url(./assets/img/bg_day.png) no-repeat;
  background-size: 100% 100%;
}

@media screen and (max-width: 650px) {
  #app {
    width: 100%;
    height: 100%;
    border: none;
  }
}

</style>
