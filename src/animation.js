import { EventEmitter } from 'events'
import game from './game'

const animation = new EventEmitter()

export default animation

animation.intertime = 50
// targets表示更新的目标列表,下面返回一个闭包函数，用作定时器回调函数
animation.update = (...targets) => {
  return function () {
    animation.emit('update', ...targets)
  }
}

animation.on('stop', () => {
  clearInterval(animation.timer)
  game.emit('stop')
})
