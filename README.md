###简介
- 基于vue框架做的flappy bird游戏，用vue-cli构建，在src文件夹下开发
- 在线地址[http://keep-writing-codes.github.io/woxixiulayin/example/vflappybird/index.html](http://keep-writing-codes.github.io/woxixiulayin/example/vflappybird/index.html)

####基本思路
- 1.采用vue的模块化方式编写组件（src/componets/），各游戏组件比较清晰，容易修改；
- 2.game.js采用event机制，是游戏的事件中心，提供事件操作函数，各组件内部监听游戏事件响应动作；
- 3.store.js中统一维护公有state，集中管理，对外提供操作函数；
- 4.world.js用于更新页面动画，组件通过world.listeners.add/remove注册监听函数，一旦添加监听就开始更新动画；

####其他
- 1.代码没怎么做兼容，只在chrome和苹果手机上测试过；
- 2.项目的框架没做优化，程序设计方面比较粗糙，留待改进；