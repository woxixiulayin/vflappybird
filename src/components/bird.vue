<template>
  <div id='bird'
  style="{top: top + 'px'}">
  </div>
</template>

<script>
let screenheight = window.screen.height
//  state: 游戏状态 ready fly dead
let state = {ready: 1, fly: 2, dead: 3}
//  可活动区域
let updwonrange = screenheight * 0.1
// 中间位置
let middleposition = screenheight * 0.43

export default {
  data () {
    return {
      //  top: 位置，距离顶部的距离
      top: screenheight * 0.43,
      //  up/downlimit 上下可活动区间
      uplimit: middleposition - updwonrange * 0.5,
      downlimit: middleposition + updwonrange * 0.5,
      state: state.ready
    }
  },

  methods () {
    return {
      update: function () {
      },
      isOutOfRange () {
        return this.top < this.uplimit || this.top < this.downlimit
      }
    }
  }
}
</script>

<style>
#bird {
  position: absolute;
  top: 43%;
  left: 25%;
  height: 10%;
  width: 10%;
  margin-left: -5%;
  margin-top: -5%;
  /*background-color: white;*/
  background: url(../assets/img/bird0_0.png) no-repeat center;
  background-size: cover;
}
</style>