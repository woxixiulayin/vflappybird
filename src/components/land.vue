<template>
  <div id='land'
  :style="{left: left + 'px'}"
  ></div>
</template>

<script>
import game from '../game'
import world from '../world'

const leftlimit = -20

export default {
  data () {
    return {
      name: 'land',
      speed: 5,
      left: 0,
      leftlimit
    }
  },
  attached () {
    this.listenGameEvent()
  },
  methods: {
    update () {
      if (this.left < leftlimit) this.left = 0
      this.left -= this.speed
      return this
    },

    listenGameEvent () {
      game.on('ready', () => world.listeners.add(this.update))
      game.on('over', () => world.listeners.remove(this.update))
    }
  }
}

</script>

<style>
#land {
  position: absolute;
  top: 86%;
  left: 0;
  width: 120%;
  height: 14%;
  background: url(../assets/img/land.png) repeat-x;
}
</style>