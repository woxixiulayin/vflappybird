<template>
  <div id='panel'
  v-show='isshow'>
    <button @click='click'>{{text}}</button>
  </div>
</template>

<script>
import game from '../game'

export default {
  data () {
    return {
      text: 'Start',
      isshow: true
    }
  },
  attached () {
    game.on('start', () => {
      this.isshow = false
    })
    game.on('stop', () => {
      this.isshow = true
    })
  },
  methods: {
    click () {
      game.emit('start')
    }
  }
}
</script>

<style scoped>
#panel {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
}

#panel button {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -4rem;
  margin-top: -1.75rem;
  width: 8rem;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 2.5rem;
  text-align: center;
  background: rgb(26,188,156);
  color: white;
  border: none;
  border-radius: 10px;
}
#panel button:hover {
  background: rgb(47,228,191);
}
#panel button:active {
  background: rgb(26,188,156);
  outline: none;
}
#panel button:focus {
  outline: none;
}
</style>