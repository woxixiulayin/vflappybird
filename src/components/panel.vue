<template>
  <div id='panel'>
  <div class="record">
  <label>Record:</label>
  {{ record }}
  </div>
    <div class="score">
      <img v-for="num in scoreNums"
      :src="numImgsSrc[num]" track-by='$index'>
    </div>
    <button v-show='isshow' @click='click'>{{text}}</button>
  </div>
</template>

<script>
import game from '../game'
import store from '../store'

export default {
  data () {
    return {
      text: 'Start',
      isshow: true,
      score: store.getScore(),
      record: store.getScore(),
      numImgsSrc: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => require(`../assets/img/num_${item}.png`))
    }
  },
  computed: {
    scoreNums () {
      return String(this.score).split('')
    }
  },
  components: {
  },
  attached () {
    game.on('start', () => {
      this.isshow = false
    })
    game.on('ready', () => {
      this.isshow = true
      this.score = 0
    })
    game.on('score', () => {
      store.addScore()
      this.record = store.getRecord()
      this.score = store.getScore()
    })
  },
  methods: {
    click (e) {
      game.setState('start')
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
  z-index: 200;
}

#panel button {
  position: absolute;
  top: 45%;
  left: 50%;
  margin-left: -4rem;
  margin-top: -1.75rem;
  width: 8rem;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 2.5rem;
  /*text-align: center;*/
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
.score {
  position: relative;
  text-align: center;
}
.score img {
  height: 88px;
  width: 48px;
  margin: 2px;
}
.record {
  padding-top: 20px;
  height: 40px;
  font-size: 30px;
  line-height: 40px;
  padding-left: .5em;
  font-weight: bold;
}
</style>