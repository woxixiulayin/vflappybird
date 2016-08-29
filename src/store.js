//  游戏运行过程中的状态管理

export default {
  state: {
    score: 0,
    passDownlimit: 800 * 0.865 - 20,
    passUplimit: 0
  },

  setScore (number) {
    if (number !== +number) throw new Error('not a number')
    this.state.score = number
  },

  //  游戏运行时，通过设置鸟可通过的中间值自动设置上下阈值
  setUpDownLimit (up, down) {
    if (up !== +up || down !== +down) throw new Error('not a number')
    this.state.passUplimit = up
    this.state.passDownlimit = down
  }
}
