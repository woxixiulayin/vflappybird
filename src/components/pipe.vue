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
  pipeHeight: 1000,
  passHeight: 160,
  birdHorizontalPositon: 0.25 * 600
}

export default {
  props: {
    left: Number
  },
  data () {
    return {
      defaultConfig: defaultConfig,
      speed: 10,
      gutter: 300,
      width: defaultConfig.pipeWidth,
      height: defaultConfig.pipeHeight,
      passHeight: defaultConfig.passHeight,
      passMiddlePosition: Math.random() * (538 - 150) + 150
    }
  },
  computed: {
    top () {
      return this.passMiddlePosition - (this.height + this.passHeight) / 2
    },
    isBirdIn () {
      return this.left < config.bird.left - config.bird.width / 2 && this.left + this.width > config.bird.left + config.bird.width / 2
    }
  },
  attached () {
    game.on('start', () => {
      world.listeners.add(this.update)
    })
    game.on('over', () => {
      world.listeners.remove(this.update)
    })
  },
  methods: {
    update () {
      this.left -= this.speed
      if (this.isOutOfLeftBorder()) {
        this.moveToTheLast()
      }
      this.changePassLimit()
    },
    isOutOfLeftBorder () {
      return this.left < -this.width
    },
    moveToTheLast () {
      this.left = world.width * 1.5 - this.width
      this.passMiddlePosition = this.generatePassHeight()
    },
    generatePassHeight () {
      return Math.random() * (538 - 150) + 150
    },
    changePassLimit () {
      //  通过管子之后
      if (this.left + this.width < config.bird.left - config.bird.width / 2) {
        store.setUpDownLimit(-500, config.land.top)
      }
      //  正在通过管子
      if (this.isBirdIn) {
        store.setUpDownLimit(this.passMiddlePosition - this.passHeight, this.passMiddlePosition + this.passHeight)
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
}

.pipe>div {
  width: 100%;
}

</style>