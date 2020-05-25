// compon/xuanfukuang.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

    top: ' ',

    left: ' ',

    windowWidth: '',

    windowHeight: ''

  },

  setTouchMove: function (e) {
    console.log("---------------- e.touches[0].clientX----------------8==" + e.touches[0].clientX)
    console.log("---------------- e.touches[0].clientY----------------8=======" + e.touches[0].clientY)
    //此处clientY与clientX为拖动悬浮窗超过设定的大小会返回默认显示位置
    if (e.touches[0].clientX < 350 && e.touches[0].clientY < 550 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
      this.setData({
        left: e.touches[0].clientX,
        top: e.touches[0].clientY
      })
    } else {
      this.setData({
        left: 0, //默认显示位置 left距离
        top: 250  //默认显示位置 top距离
      })
    }
  },




  /**
  * 返回首页
  */
  goToHome: () => {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})
