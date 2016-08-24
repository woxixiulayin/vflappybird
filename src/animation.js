import { EventEmitter } from 'events'
import game from './game'

const animation = new EventEmitter()

export default animation

animation.intertime = 50
animation.move = () => animation.emit('move')

animation.on('start', () => {
  animation.timer = setInterval(animation.move, animation.intertime)
  setTimeout(() => animation.emit('stop'), 5000)
})

animation.on('stop', () => {
  clearInterval(animation.timer)
  game.emit('stop')
})
