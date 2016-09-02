<template>
  <audio id='bird'></audio>
  <audio id='bgm'></audio>
</template>

<script>
import game from '../game'

let musicSrcMap = new Map([
  ['swooshing', '/static/music/swooshing'],
  ['die', '/static/music/die'],
  ['hit', '/static/music/hit'],
  ['score', '/static/music/point'],
  ['wing', '/static/music/wing']
])

export default {
  data () {
    return {
      src: String,
      birdAudio: {},
      bgmAudio: {}
    }
  },
  attached () {
    this.birdAudio = document.getElementById('bird')
    this.bgmAudio = document.getElementById('bgm')
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
      let audio = music === 'score' ? this.bgmAudio : this.birdAudio
      // audio.autoplay = true
      // audio.isLoadedmetadata = false
      // audio.touchstart = true
      // audio.audio = true
      audio.src = musicSrcMap.get(music) + '.ogg'
      audio.src = musicSrcMap.get(music) + '.mp3'
      audio.play()
    }
  }
}
</script>
