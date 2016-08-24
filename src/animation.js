import { EventEmitter } from 'events'

const animation = new EventEmitter()

export default animation

animation.intertime = 50
animation.move = () => animation.emit('move')

animation.on('start', () => {
  animation.timer = setInterval(animation.move, animation.intertime)
  setInterval(() => animation.emit('stop'), 5000)
})

animation.on('stop', () => {
  clearInterval(animation.timer)
})
