//  游戏运行过程中的状态管理
import config from './config'

let store = {
  state: {
    score: 0,
    record: 0,
    passUplimit: 0,
    passDownlimit: config.land.top
  },
  getScore () {
    return this.state.score
  },
  addScore () {
    this.state.score++
    this.doRecord()
  },
  //  游戏运行时，通过设置鸟可通过的中间值自动设置上下阈值
  setUpDownLimit (up, down) {
    if (up !== +up || down !== +down) throw new Error('not a number')
    this.state.passUplimit = up
    this.state.passDownlimit = down
  },
  reset () {
    this.state.score = 0
    this.setUpDownLimit(0, config.land.top)
  },
  doRecord () {
    this.state.record < this.state.score ? this.state.record = this.state.score : null
  },
  getRecord () {
    return this.state.record
  }
}

export default store
