<template>
  <div id='bird'
  :style="{top: top + 'px',
  left: left + 'px',
  width: width + 'px'}" 
  :class="[birdimg]">
  </div>

<!--显示bird的通过管子时的上下阈值  -->
<!--   <div class='test'
  v-show='isShowLimit'
  :style="{top: uplimit + 'px', height: downlimit - uplimit + 'px',left: left + 'px', width: width + 'px'}">
  </div> -->
</template>

<script>
import world from '../world'
import game from '../game'
import store from '../store'
import config from '../config'

let speed = {
  //  初始速度
  init: 0,
  //  空格起跳速度
  controljump: -8.5,
  // ready阶段自由起跳速度
  readyjump: -8,
  gravityPlus: 0.3
}

let positionfix = 5

export default {
  data () {
    return {
      name: 'bird',
      //  位置大小相关属性
      top: Number,
      left: config.bird.left,
      speed: Number,
      height: 43,
      width: 60,
      //  飞行上下阈值
      uplimit: Number,
      downlimit: Number,
      //  bird图片，用于飞行翅膀动画
      birdimg: 'birdimg1',
      //  一些默认参数
      positionConfig: {
        init: config.app.height * 0.4,
        // 游戏开始前自由起跳的最低位置
        readydownlimit: config.app.height * 0.5 - config.bird.height,
        // 地面位置
        overDownLimit: config.land.top - config.bird.height + 5
      },
      isShowLimit: false
    }
  },
  computed: {
    gamestate: {
      cache: false,
      get: function () {
        return game.state
      }
    }
  },

  attached () {
    this.reset()
    this.listenGameEvent()
  },

  methods: {
    update () {
      switch (this.gamestate) {
        case game.states.ready:
          this.readyUpdate()
          break
        case game.states.start:
          //  修正上下阈值
          this.downlimit = store.state.passDownlimit - this.height + 2 * positionfix
          this.uplimit = store.state.passUplimit - positionfix
          this.startUpdate()
          break
        case game.states.over:
          this.overUpdate()
          break
      }
      this.updateBirdImg()
    },
    readyUpdate () {
      let _top = this.top + this.speed
      let _readydownlimit = this.positionConfig.readydownlimit
      if (_top > _readydownlimit) {
        //  到达底部阈值
        this.top = _readydownlimit
        this.speed = speed.readyjump
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
    },
    updateBirdImg () {
      let birdimgs = ['birdimg0', 'birdimg1', 'birdimg2']
      if (this.gamestate === game.states.over) {
        this.birdimg = birdimgs[2]
      } else {
      }
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
  background-position: -7px -18px;
  background-repeat: no-repeat;
  background-size: 75px 75px;
  z-index: 100;
  /*border: solid 1px black;*/
}

.birdimg0 {
  background-image: url(../assets/img/bird0_0.png)
}
.birdimg1 {
  background-image: url(../assets/img/bird0_1.png)
}
.birdimg2 {
  background-image: url(../assets/img/bird0_2.png)
}
/*.test {
  position: absolute;
  width: 84px;
  border: 1px solid black;
}*/
</style>