<template>
  <div id='bird'
  :style="{top: top + 'px', left: left + 'px', width: width + 'px'}">
  </div>
  <div class='test'
  v-show='isShowLimit'
  :style="{top: uplimit + 'px', height: downlimit - uplimit + 'px',left: left + 'px', width: width + 'px'}">
  </div>
</template>

<script>
import world from '../world'
import game from '../game'
import store from '../store'
import config from '../config'

//  state（鸟的状态）: ready(准备状态，上下飞)， contronl(受控制), dead(自由落地)
let speed = {
  init: 0,
  controljump: -8.5,
  readyjump: -8,
  gravityPlus: 0.3
}

let positionfix = 5

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
      height: 43,
      width: 60,
      //  显示上下阈值用于测试
      isShowLimit: false,
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
    }
    // downlimit: {
    //   cache: false,
    //   get: function () {
    //     //  去掉bird高度
    //     return store.state.passDownlimit - this.height
    //   }
    // },
    // uplimit: {
    //   cache: false,
    //   get: function () {
    //     return store.state.passUplimit
    //   }
    // }
  },

  attached () {
    this.reset()
    this.listenGameEvent()
  },

  methods: {
    update () {
      console.log(this.speed)
      switch (this.gamestate) {
        case game.states.ready:
          this.readyUpdate()
          break
        case game.states.start:
          this.downlimit = store.state.passDownlimit - this.height + positionfix
          this.uplimit = store.state.passUplimit - positionfix
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
      this.top = _top
      if (_top < this.uplimit) {
        //  碰到上管子
        // this.top = this.uplimit
        this.speed = 0
        game.setState(game.states.over)
      } else if (_top > this.downlimit) {
        //  碰到下管子
        // this.top = this.downlimit
        this.speed = 0
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
    reset () {
      this.top = this.positionConfig.init
      this.speed = speed.init
    },
    jumpListener () {
      this.gamestate === game.states.start ? this.speed = speed.controljump : null
    },
    listenGameEvent () {
      game.on('ready', () => {
        this.reset()
        world.listeners.add(this.update)
      })
      game.on('start', () => {
        this.reset()
        game.on('jump', this.jumpListener)
      })
      game.on('over', () => {
        //  碰到管子后，停留半秒
        game.removeListener('jump', this.jumpListener)
        world.listeners.remove(this.update)
        setTimeout(() => {
          world.listeners.add(this.update)
        }, 500)
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

<style scoped>
#bird {
  position: absolute;
  /*top: 43%;*/
  height: 43px;
  width: 60px;
  background: url(../assets/img/bird0_0.png) -7px -18px no-repeat;
  background-size: 75px 75px;
  z-index: 100;
  /*border: solid 1px black;*/
}
.test {
  position: absolute;
  width: 84px;
  border: 1px solid black;
}
</style>