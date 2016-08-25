<template>
  <div id='land'
  :style="{left: left + 'px'}"
  ></div>
</template>

<script>
import animation from '../animation'
const leftlimit = -20

export default {
  data () {
    return {
      speed: 5,
      left: 0,
      leftlimit
    }
  },
  attached () {
    animation.on('update', () => {
      this.update()
    })
  },
  methods: {
    update () {
      if (this.left < leftlimit) this.left = 0
      this.left -= this.speed
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