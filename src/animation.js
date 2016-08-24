import { EventEmitter } from 'events'

const animation = new EventEmitter()

export default animation

animation.intertime = 50

animation.on('start', () => {
  setInterval(() => animation.emit('move'), animation.intertime)
})
