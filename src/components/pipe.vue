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

let defaultSize = {
  pipeWidth: 84,
  pipeHeight: 1000,
  passHeight: 160
}

export default {
  props: {
    left: Number
  },
  data () {
    return {
      defaultSize: defaultSize,
      speed: 10,
      gutter: 300,
      width: defaultSize.pipeWidth,
      height: defaultSize.pipeHeight,
      passHeight: defaultSize.passHeight,
      passMiddlePosition: Math.random() * (538 - 150) + 150
    }
  },
  computed: {
    top () {
      return this.passMiddlePosition - (this.height + this.passHeight) / 2
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