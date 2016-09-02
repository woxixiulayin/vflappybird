import Vue from 'vue'
import App from './App.vue'
import game from './game'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

//  设置页面大小，适配移动端
let viewport = document.querySelector('meta[name=viewport]')
viewport.setAttribute('content', 'width=600,user-scalable=no')

game.setState('ready')
