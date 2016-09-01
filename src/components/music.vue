<template>
  <audio id='audio'
  ></audio>
</template>

<script>
import game from '../game'

let musicSrcMap = new Map([
  ['swooshing', '/static/music/swooshing.ogg'],
  ['die', '/static/music/die.ogg'],
  ['hit', '/static/music/hit.ogg'],
  ['score', '/static/music/score.ogg'],
  ['wing', '/static/music/wing.ogg']
])

export default {
  data () {
    return {
      src: String
    }
  },
  attached () {
    game.on('jump', () => {
      this.playMusic('swooshing')
    })
    game.on('over', () => {
      this.playMusic('hit')
    })
    game.on('stop', () => {
      this.playMusic('die')
    })
    game.on('score', () => {
      this.playMusic('score')
    })
  },
  methods: {
    playMusic (music) {
      if (typeof music !== 'string' || !musicSrcMap.has(music)) return
      this.$el.src = musicSrcMap.get(music)
      this.$el.play()
    }
  }
}
</script>
