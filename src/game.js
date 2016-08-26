import { EventEmitter } from 'events'
import world from './world'

const game = new EventEmitter()

export default game

// 监听ready事件， 更新新bird和land
game.on('ready', () => {
  world.timer.start()
  world.listeners.add('bird', 'land')
})

// 监听stop事件， 更新新bird和land
game.on('stop', () => {
  world.timer.stop()
  world.listeners.remove()
})
//  监听start事件，更新所有动画
// game.on('start', () => {
//   clearInterval(world.timer)
//   world.timer = setInterval(world.update('all'), world.intertime)
//   setTimeout(() => world.emit('stop'), 5000)
// })

// game.on('over', () => {
//   clearInterval(world.timer)
//   world.timer = setInterval(world.update('all'), world.intertime)
//   setTimeout(() => world.emit('stop'), 5000)
// })
