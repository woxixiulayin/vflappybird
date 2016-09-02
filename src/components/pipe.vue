<template>
<div class='pipe'
  :style="{width: width + 'px', height: height + 'px',
  left: left + 'px', top: top + 'px'}">
  <img src="../assets/img/pipe_down.png" alt="pipe_down">
  <div :style="{height: passHeight + 'px'}"></div>
  <img src="../assets/img/pipe_up.png" alt="pipe_up">
</div>
</template>

<script>
import world from '../world'
import game from '../game'
import store from '../store'
import config from '../config'

let defaultConfig = {
  pipeWidth: 84,
  pipeHeight: 1160,
  passHeight: 160,
  birdHorizontalPositon: 0.25 * 600,
  widthfix: 10
}

function generatePassHeight () {
  return Math.random() * (500 - 220) + 220
}

export default {
  props: {
    left: Number
  },
  data () {
    return {
      defaultConfig: defaultConfig,
      speed: 4,
      gutter: 300,
      width: defaultConfig.pipeWidth,
      height: defaultConfig.pipeHeight,
      passHeight: defaultConfig.passHeight,
      passMiddlePosition: generatePassHeight(),
      //  是否正在通过管子的标志
      passFlag: false,
      birPassedRange: config.bird.left + defaultConfig.widthfix - defaultConfig.pipeWidth,
      birdEnterRange: config.bird.left + config.bird.width
    }
  },
  computed: {
    top () {
      return this.passMiddlePosition - this.height / 2
    }
  },
  attached () {
    game.on('start', () => {
      world.listeners.add(this.update)
    })
    game.on('over', () => {
      world.listeners.remove(this.update)
    })
    game.on('ready', () => {
      this.passFlag = false
    })
  },
  methods: {
    update () {
      this.left -= this.speed
      if (this.isOutOfLeftBorder()) {
        this.moveToTheLast()
      } else {
        this.changePassLimit()
      }
    },
    isOutOfLeftBorder () {
      return this.left < -this.width
    },
    moveToTheLast () {
      this.left = world.width * 1.5 - this.width
      this.passMiddlePosition = generatePassHeight()
    },
    changePassLimit () {
      //  通过管子之后执行一次
      if (this.passFlag === true && this.left < this.birPassedRange) {
        store.setUpDownLimit(0, config.land.top)
        this.passFlag = false
      } else if (this.passFlag === false && this.left > this.birPassedRange && this.left < this.birdEnterRange) {
      //  进入管子执行一次
        store.setUpDownLimit(this.passMiddlePosition - 80, this.passMiddlePosition + 80)
        this.passFlag = true
      }
    }
  }
}
</script>

<style>
.pipe {
  position: absolute;
}

.pipe img {
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.pipe>div {
  width: 100%;
}
</style>