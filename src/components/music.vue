<template>
<div></div>
</template>

<script>
import game from '../game'

let audioPrefix = '/static/music/'

export default {
  data () {
    return {
      musics: ['wing', 'hit', 'die', 'score'],
      audios: {}
    }
  },
  attached () {
    this.musics.map(music => (this.audios[music] = this.addAuido(music)))
    game.on('jump', () => {
      this.playMusic('wing')
    })
    game.on('over', () => {
      this.playMusic('hit')
      setTimeout(() => this.playMusic('die'), 900)
    })
    game.on('score', () => {
      this.playMusic('score')
    })
  },
  methods: {
    playMusic (music) {
      this.audios[music].play()
    },
    addAuido (music) {
      // let audio = new window.Audio()
      let audio = document.createElement('AUDIO')
      audio.src = audioPrefix + music + '.mp3'
      return audio
    }
  }
}
</script>
