import { EventEmitter } from 'events'

const world = new EventEmitter()

export default world

world.intertime = 50

//  注册动画监听事件回调函数，用于动画更新
world.listeners = (() => {
  let listeners = []
  let eventname = 'update'
  return {
    add: function (..._listeners) {
      _listeners.map((_listener) => {
        if (_listener === undefined || typeof _listener !== 'function') return
        listeners.push(_listener)
        world.on(eventname, _listener)
      })
    },
    remove: function (..._listeners) {
      if (_listeners.length === 0) {
        listeners.splice()
        world.removeAllListeners(eventname)
      }
      _listeners.map((_listener) => {
        if (_listener === undefined || typeof _listener !== 'function') return
        listeners.push(_listener)
        world.removeListener(eventname, _listener)
      })
    }
  }
})()

// world的定时器
world.timer = (() => {
  let timer = null
  return {
    start: function () {
      this.stop()
      timer = setInterval(() => {
        world.emit('update')
      }, world.intertime)
    },
    stop: () => {
      clearInterval(timer)
    }
  }
})()
