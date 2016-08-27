import { EventEmitter } from 'events'
import world from './world'

let game = Object.assign(new EventEmitter(), (() => {
  //  游戏状态 ready->start->over->stop
  //  各游戏状态对应的回调操作
  let readyCallback = () => {
    world.timer.start()
  }
  let startCallback = () => {
  }
  let overCallback = () => {
  }
  let stopCallback = () => {
    world.timer.stop()
    world.listeners.remove()
    setTimeout(() => game.setState('ready'), 2000)
  }

  //  状态与回调对应的map对象
  let statesCallback = new Map([
    ['ready', readyCallback],
    ['start', startCallback],
    ['over', overCallback],
    ['stop', stopCallback]
  ])

  return {
    //  记录当前游戏状态
    state: '',
    setState (state) {
      if (!statesCallback.has(state) || this.state === state) return
      statesCallback.get(state)()
      this.state = state
      this.emit(state)
      console.log(`emit ${state}`)
      // 执行相应的事件回调函数
    }
  }
})())

export default game
