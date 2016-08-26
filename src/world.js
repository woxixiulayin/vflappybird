import { EventEmitter } from 'events'

const world = new EventEmitter()

export default world

// 游戏中的所有组件
world.components = []

world.intertime = 50

//  注册动画监听事件回调函数，用于动画更新更新
world.listeners = (() => {
  let listeners = []
  return {
    add: (...names) => {
      if (names.length === 0) {
        world.components.map(compt => {
          listeners.push(compt.update)
          world.on('update', compt.update)
        })
      } else {
        names.map(name => world.components.map(compt => {
          if (name === compt.name) {
            listeners.push(compt.update)
            world.on('update', compt.update)
          }
        }))
      }
    },
    remove: (...names) => {
      if (names.length === 0) {
        listeners = []
        world.removeAllListeners('update')
      } else {
        names.map(name => world.components.map(compt => {
          if (name === compt.name) {
            listeners.splice(listeners.indexOf(compt.update), 1)
            world.removeListener('update', compt.update)
          }
        }))
      }
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
