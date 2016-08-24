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
  top: 25%;
  left: 22.5%;
  width: 55%;
  height: 35%;
  /*background: yellow;*/
}

#panel button {
  width: 40%;
  height: 20%;
  font-size: 2.5rem;
  margin: 40% 30%;
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