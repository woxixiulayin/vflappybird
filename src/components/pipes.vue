<template>
  <ul id='pipes'>
    <template
    v-for="leftposition in initLeftPositon" track-by="$index">
    <li is='pipe' :left.sync="leftposition"></li>
    </template>
  </ul>
</template>

<script>
import pipe from './pipe'
import game from '../game'

let screenwidth = 600

export default {
  components: {
    pipe
  },
  data () {
    return {
      gutter: 300,
      initLeftPositon: [0, 1, 2].map((item) => screenwidth + item * this.gutter)
    }
  },
  attached () {
    game.on('ready', this.reset)
  },
  methods: {
    reset () {
      this.initLeftPositon = [0, 1, 2].map((item) => screenwidth + item * this.gutter)
    }
  }
}

</script>

<style>
#pipes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>