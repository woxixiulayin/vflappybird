import Vue from 'vue'
import App from './App.vue'
import game from './game'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

document.getElementById('app').focus()
game.setState('ready')
