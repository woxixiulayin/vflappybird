<template>
  <div id='bird'
  :style="{top: top + 'px', left: left + 'px'}">
  </div>
  <span class='test'>123</span>
</template>

<script>
import world from '../world'
import game from '../game'
import store from '../store'
import config from '../config'

//  state（鸟的状态）: ready(准备状态，上下飞)， contronl(受控制), dead(自由落地)
let state = {ready: 0, contronl: 1, dead: 2}
let speed = {
  init: 3,
  controljump: -20,
  readyjump: -17,
  gravityPlus: 2
}

export default {
  data () {
    return {
      //  top: 位置，距离顶部的距离
      name: 'bird',
      top: Number,
      left: config.bird.left,
      uplimit: Number,
      downlimit: Number,
      speed: Number,
      state: Number,
      height: 43,
      width: 60,
      positionConfig: {
        init: config.app.height * 0.4,
        // 游戏开始前自由起跳的最低位置
        readydownlimit: config.app.height * 0.5 - config.bird.height,
        // 地面位置
        overDownLimit: config.land.top - config.bird.height + 5
      }
    }
  },
  computed: {
    gamestate: {
      cache: false,
      get: function () {
        return game.state
      }
    },
    downlimit: {
      cache: false,
      get: function () {
        //  去掉bird高度
        return store.state.passDownlimit - this.height
      }
    },
    uplimit: {
      cache: false,
      get: function () {
        return store.state.passUplimit
      }
    }
  },

  attached () {
    this.reset()
    this.listenGameEvent()
  },

  methods: {
    update () {
      console.log(this.gamestate)
      switch (this.gamestate) {
        case game.states.ready:
          this.readyUpdate()
          break
        case game.states.start:
          this.startUpdate()
          break
        case game.states.over:
          this.overUpdate()
          break
      }
    },
    readyUpdate () {
      let _top = this.top + this.speed
      let _readydownlimit = this.positionConfig.readydownlimit
      if (_top > _readydownlimit) {
        //  到达底部阈值
        this.top = _readydownlimit
        this.speed = speed.readyjump
        console.log(this.speed)
      } else {
        //  下落
        this.speed += speed.gravityPlus
        this.top = _top
      }
    },
    startUpdate () {
      let _top = this.top + this.speed
      if (this.isOutOfRange(_top)) {
        //  碰到pipe
        game.setState(game.states.over)
      } else {
        //  下落
        this.speed += speed.gravityPlus
        this.top = _top
      }
    },
    overUpdate () {
      let _top = this.top + this.speed
      let _overDownLimit = this.positionConfig.overDownLimit
      console.log(config.land.top)
      if (_top > _overDownLimit) {
        //  到达地面
        this.top = _overDownLimit
        this.speed = 0
        game.setState(game.states.stop)
      } else {
        //  坠落
        this.speed += speed.gravityPlus
        this.top = _top
      }
    },
    isOutOfRange (top) {
      return top < this.uplimit || top > this.downlimit
    },
    reset () {
      this.top = this.positionConfig.init
      this.speed = speed.init
    },
    jumpListener () {
      this.state === state.contronl ? this.speed = speed.controljump : null
    },
    listenGameEvent () {
      game.on('ready', () => {
        this.reset()
        this.state = state.ready
        world.listeners.add(this.update)
      })
      game.on('start', () => {
        this.reset()
        this.state = state.contronl
        game.on('jump', this.jumpListener)
      })
      game.on('over', () => {
        game.removeListener('jump', this.jumpListener)
      })
      game.on('stop', () => {
        world.listeners.remove(this.update)
      })
    },
    getBirdBottom (top) {
      return top + this.height
    }
  }
}
</script>

<style>
#bird {
  position: absolute;
  /*top: 43%;*/
  height: 43px;
  width: 60px;
  background: url(../assets/img/bird0_0.png) -7px -18px no-repeat;
  background-size: 75px 75px;
  z-index: 100;
}
.test {
  position: absolute;
  top: 688px;
  height: 43px;
  width: 60px;
  border: 1px solid black;
}
</style>