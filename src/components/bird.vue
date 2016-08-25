<template>
  <div id='bird'
  :style="{top: top + 'px'}">
  </div>
</template>

<script>
import animation from '../animation'

//  state（鸟的状态）: ready(准备状态，上下飞)， contronl(受控制), dead(自由落地)
let state = {ready: 0, contronl: 1, dead: 2}
let speed = {
  init: 3,
  jump: -30,
  gravityPlus: 1
}

export default {
  data () {
    return {
      name: 'bird',
      //  top: 位置，距离顶部的距离
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
          return
      }
    },

    uplimit () {
      switch (this.state) {
        case state.ready:
          return 0
        case state.dead:
          return 0
        case state.contronl:
          return
      }
    }
  },

  attached () {
    this.reset()
    animation.on('update', (...targets) => {
      if (this.isInTargets(targets)) {
        this.update()
        this.stateAction()
      }
    })
  },

  methods: {
    update () {
      this.top += this.speed
      console.log(`bird speed: ${this.speed}`)
      console.log(`bird state: ${this.state}`)
      this.speed += speed.gravityPlus
    },
    isOutOfRange () {
      console.log(this.top < this.uplimit || this.top > this.downlimit)
      return this.top < this.uplimit || this.top > this.downlimit
    },
    reset () {
      //  初始化
      this.setPositionConfig()

      this.top = this.positionConfig.init
      this.speed = speed.init
      this.state = state.ready
    },

    isInTargets (targets) {
      return targets.indexOf(this.name) !== -1 || targets.indexOf('all') !== -1
    },

    stateAction () {
      //  判断当前状态下，下一步动作
      if (!this.isOutOfRange()) return
      switch (this.state) {
        case state.ready:
          this.speed += speed.jump
          break
        case state.contronl:
          this.state = state.dead
          break
        case state.dead:
          break
      }
    },

    setPositionConfig () {
      let appHeight = document.getElementById('app').clientHeight
      console.log(appHeight)
      this.positionConfig = {
        init: appHeight * 0.5,
        readydownlimit: appHeight * 0.6,
        deaddownlimit: appHeight * 0.86
      }
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
}
</style>