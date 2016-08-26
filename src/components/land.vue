<template>
  <div id='land'
  :style="{left: left + 'px'}"
  ></div>
</template>

<script>
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
    world.components.push(this)
    console.log(this.$name)
  },
  methods: {
    update () {
      if (this.left < leftlimit) this.left = 0
      this.left -= this.speed
      return this
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