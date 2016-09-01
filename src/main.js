import Vue from 'vue'
import App from './App.vue'
import game from './game'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

document.onkeydown = function (e) {
  if (e.keyCode !== 32) return
  if (game.state === game.states.ready) {
    game.setState(game.states.start)
  } else if (game.state === game.states.start) {
    game.keyEvent('space')
  }
  return false
}

// document.getElementById('app').focus()
game.setState('ready')
