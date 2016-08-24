import { EventEmitter } from 'events'
import animation from './animation'

const game = new EventEmitter()

export default game

game.on('start', () => {
  console.log('game start')
  animation.emit('start')
})
