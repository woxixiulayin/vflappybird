<template>
  <div id="app"
  tabindex = 0>
  <music></music>
  <panel></panel>
  <bird></bird>
  <pipes></pipes>
  <land></land>
  </div>
</template>

<script>
import land from './components/land.vue'
import panel from './components/panel.vue'
import bird from './components/bird.vue'
import pipes from './components/pipes'
import music from './components/music'

export default {
  data () {
    return {
      width: 600,
      height: 800
    }
  },
  components: {
    music,
    bird,
    panel,
    land,
    pipes
  }
}
</script>

<style>
@import './assets/css/normalize.css';

* {
  box-sizing: border-box;
}

ul {
  list-style: none;
}
html {
  height: 100%;
}

body {
  font-family: Helvetica, sans-serif;
  height: 100%;
}

#app {
  position: absolute;
  top: 50%;
  left: 50%;
  width:  600px;
  height: 800px;
  margin-top: -400px;
  margin-left: -300px;
  border: 5px solid black;
  background: url(./assets/img/bg_day.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

</style>
