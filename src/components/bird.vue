<template>
  <div id='bird'
  :style="{top: top + 'px',
  left: left + 'px',
  width: width + 'px'}" 
  :class="[birdimg, {roate90: isRotate}]">
  </div>

<!--显示bird的通过管子时的上下阈值  -->
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
      //  当撞到管子后旋转90度
      isRotate: false,
      //  记录上次的临界点，用于判断得分
      lastDownlimit: Number,
      //  保存对应state的Update处理函数
      stateUpdate: Object,
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
      this.top += this.speed
      this.stateUpdate()
      this.updateBirdImg()
    },
    readyUpdate () {
      let _readydownlimit = this.positionConfig.readydownlimit
      if (this.top > _readydownlimit) {
        //  到达底部阈值
        this.speed = speed.readyjump
      } else {
        //  下落
        this.speed += speed.gravityPlus
      }
    },
    startUpdate () {
      if (this.top < this.uplimit) {
        //  碰到上管子
        // this.top = this.uplimit
        this.speed = 0
        game.setState(game.states.over)
      } else if (this.top > this.downlimit) {
        //  碰到下管子
        // this.top = this.downlimit
        this.speed = 0
        game.setState(game.states.over)
      } else {
        // 继续飞行
        this.speed += speed.gravityPlus
        // 得分
        if (this.lastDownlimit !== this.downlimit && store.state.passDownlimit === config.land.top) {
          game.score()
        }
        this.lastDownlimit = this.downlimit
      }
    },
    overUpdate () {
      let _overDownLimit = this.positionConfig.overDownLimit
      if (this.top > _overDownLimit) {
        //  到达地面
        this.speed = 0
        game.setState(game.states.stop)
      } else {
        //  坠落
        this.speed += speed.gravityPlus
      }
    },
    reset () {
      this.top = this.positionConfig.init
      this.speed = speed.init
      this.lastDownlimit = config.land.top - this.height + 2 * positionfix
    },
    jumpListener () {
      this.speed = speed.controljump
    },
    listenGameEvent () {
      game.on('ready', () => {
        this.reset()
        //  扶正bird
        this.isRotate = false
        world.listeners.add(this.update)
        this.stateUpdate = this.readyUpdate
      })
      game.on('start', () => {
        this.reset()
        game.on('jump', this.jumpListener)
        this.stateUpdate = this.startUpdate
      })
      game.on('over', () => {
        //  碰到管子后，停留半秒，开始下落
        game.removeListener('jump', this.jumpListener)
        world.listeners.remove(this.update)
        this.stateUpdate = this.overUpdate
        setTimeout(() => {
          //  bird旋转90度
          this.isRotate = true
          world.listeners.add(this.update)
        }, 500)
      })
      game.on('stop', () => {
        world.listeners.remove(this.update)
      })
      game.on('updownLimit', () => {
        this.downlimit = store.state.passDownlimit - this.height + 2 * positionfix
        this.uplimit = store.state.passUplimit - positionfix
      })
    },
    getBirdBottom (top) {
      return top + this.height
    },
    updateBirdImg () {
      if (this.gamestate === 'over' ||
          this.gamestate === 'stop') {
        this.birdimg = 'birdimg1'
      } else {
        this.birdimg = this.speed > 0 ? 'birdimg0' : 'birdimg2'
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
.roate90 {
  transform: rotate(90deg);
  transition: transform 0.5s;
}
.test {
  position: absolute;
  width: 84px;
  border: 1px solid black;
}
</style>