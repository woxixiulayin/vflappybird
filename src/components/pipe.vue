<template>
<div class='pipe'
  :style="{width: pipeWidth + 'px', height: pipeHeight + 'px',
  left: left + 'px', top: top + 'px'}">
  <img src="../assets/img/pipe_down.png" alt="pipe_down">
  <div :style="{height: passHeight + 'px'}"></div>
  <img src="../assets/img/pipe_up.png" alt="pipe_up">
</div>
</template>

<script>
let defaultSize = {
  pipeWidth: 84,
  pipeHeight: 1000,
  passHeight: 140
}

export default {
  props: {
    left: Number
  },
  data () {
    return {
      pipeWidth: defaultSize.pipeWidth,
      pipeHeight: defaultSize.pipeHeight,
      passHeight: defaultSize.passHeight,
      passMiddlePosition: Math.random() * (538 - 150) + 150
    }
  },
  computed: {
    top () {
      return this.passMiddlePosition - (this.pipeHeight + this.passHeight) / 2
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