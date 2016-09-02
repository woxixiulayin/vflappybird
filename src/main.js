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

//  设置页面大小，适配移动端
let viewport = document.querySelector('meta[name=viewport]')
viewport.setAttribute('content', 'width=600,user-scalable=no')

game.setState('ready')
