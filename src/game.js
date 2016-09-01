import { EventEmitter } from 'events'
import world from './world'
import store from './store'

let game = Object.assign(new EventEmitter(), (() => {
  //  游戏状态 ready->start->over->stop
  //  各游戏状态对应的回调操作
  let readyCallback = () => {
    world.timer.start()
    store.reset()
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

  // 游戏中的几个状态
  let states = {
    ready: 'ready',
    start: 'start',
    over: 'over',
    stop: 'stop'
  }
  //  状态与回调对应的map对象
  let statesCallback = new Map([
    [states.ready, readyCallback],
    [states.start, startCallback],
    [states.over, overCallback],
    [states.stop, stopCallback]
  ])

  let spaceKeyCallback = () => {
    switch (game.state) {
      case 'ready':
        game.setState('start')
        break
      case 'start':
        game.emit('jump')
        break
      default:
        break
    }
  }
  //  按键与回调对应的map对象
  let keyEventCallback = new Map([
    ['space', spaceKeyCallback]
  ])

  return {
    states: states,
    //  记录当前游戏状态
    state: '',
    setState (state) {
      if (!statesCallback.has(state) || this.state === state) return
      this.state = state
      this.emit(state)
      // 执行相应的事件回调函数
      statesCallback.get(state)()
    },
    keyEvent (key) {
      if (!keyEventCallback.has(key)) return
      keyEventCallback.get(key)()
    },
    score () {
      store.addScore()
      game.emit('score')
    }
  }
})())

export default game
