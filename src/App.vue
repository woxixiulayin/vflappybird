<template>
  <div id="app">
  <panel></panel>
  <bird></bird>
  <land></land>
  </div>
</template>

<script>
import land from './components/land.vue'
import panel from './components/panel.vue'
import bird from './components/bird.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    bird,
    panel,
    land
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
  position: relative;
  width:  600px;
  height: 800px;
  margin: auto;
  border: 5px solid black;
  background: url(./assets/img/bg_day.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

@media screen and (max-width: 600px) {
  #app {
    width: 100%;
    height: 100%;
    border: none;
  }
}

</style>
