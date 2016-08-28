<template>
  <div id='bird'
  :style="{top: top + 'px'}">
  </div>
</template>

<script>
import world from '../world'
import game from '../game'

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
      uplimit: Number,
      downlimit: Number,
      speed: Number,
      state: Number,
      positionConfig: {}
    }
  },

  computed: {
    downlimit () {
      switch (this.state) {
        case state.ready:
          return this.positionConfig.readydownlimit
        case state.dead:
          return this.positionConfig.deaddownlimit
        case state.contronl:
          return this.positionConfig.deaddownlimit
      }
    },

    uplimit () {
      switch (this.state) {
        case state.ready:
          return 0
        case state.dead:
          return 0
        case state.contronl:
          return 0
      }
    }
  },

  attached () {
    this.reset()
    this.listenGameEvent()
  },

  methods: {
    update () {
      let topTemp = this.top + this.speed
      if (this.isOutOfRange(topTemp)) {
        this.outRangeAct()
      } else {
        this.speed += speed.gravityPlus
        this.top = topTemp
      }
    },
    isOutOfRange (top) {
      return top < this.uplimit || top > this.downlimit
    },
    reset () {
      //  初始化
      this.setPositionConfig()

      this.top = this.positionConfig.init
      this.speed = speed.init
      this.state = state.ready
    },

    outRangeAct () {
      let topTemp = this.top + this.speed
      if (topTemp < this.uplimit) {
        topTemp = this.uplimit
      } else {
        topTemp = this.downlimit
      }
      this.top = topTemp
      this.speed = 0
      switch (this.state) {
        case state.ready:
          this.readyOutRangeAct()
          break
        case state.contronl:
          this.contronlOutRangeAct()
          break
        case state.dead:
          this.deadOutRangeAct()
          break
      }
    },

    setPositionConfig () {
      let appHeight = document.getElementById('app').clientHeight
      this.positionConfig = {
        init: appHeight * 0.4,
        // 游戏开始前自由起跳的最低位置
        readydownlimit: appHeight * 0.52,
        // 地面位置
        deaddownlimit: appHeight * 0.875 - 20
      }
    },
    readyOutRangeAct () {
      // ready状态下，每次起跳的状态一致
      this.speed = speed.readyjump
      this.top = this.positionConfig.readydownlimit
    },
    contronlOutRangeAct () {
      //  设置死亡状态，继续跌落到地面
      this.state = state.dead
      game.setState('over')
      //  如果是地面，则直接进入停止动画
      // if (this.downlimit === this.positionConfig.deaddownlimit) {
      //   this.deadOutRangeAct()
      // }
    },
    deadOutRangeAct () {
      this.speed = 0
      // this.top = this.positionConfig.deaddownlimit
      game.setState('stop')
    },
    jumpListener () {
      this.state === state.contronl ? this.speed = speed.controljump : null
    },
    listenGameEvent () {
      game.on('ready', () => {
        this.reset()
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
    }
  }
}
</script>

<style>
#bird {
  position: absolute;
  /*top: 43%;*/
  left: 25%;
  height: 43px;
  width: 60px;
  margin-left: -5%;
  margin-top: -5%;
  /*background-color: white;*/
  background: url(../assets/img/bird0_0.png) -7px -18px no-repeat;
  background-size: 75px 75px;
  z-index: 100;
}
</style>