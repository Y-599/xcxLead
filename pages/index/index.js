//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '快速登录',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iosDialog:false,
    num:0
  },
savaInfo:function(res){
 console.log("ssssssssssssssssssssss")
  

},
  //事件处理函数 
  bindViewTap: function() { 
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){ 
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        } 
      })
    }
   

  },
  getUserInfo: function(e) {
    console.log(JSON.parse(e.detail.rawData))
    wx.setStorage({
      key: 'UseInfo', 
      data: JSON.parse(e.detail.rawData),
    })
   
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  isnot:function(res){
    if (this.data.motto == this.data.userInfo.nickName){
      wx.navigateTo({
        url: '/pages/login/login',
        success: function (res) {
          _this.setData({
            iosDialog: false

          })
        },
       

      })
    }else{
      this.setData({
        iosDialog: true, 
        motto: this.data.userInfo.nickName
      })
    }
   
  },
  returns:function(){
     this.setData({
      iosDialog:false

     })
  },
  logined:function(){
    var _this = this
    wx.navigateTo({
      url: '/pages/login/login',
      success: function(res){
        _this.setData({
          iosDialog: false

        })      },
      fail: function() {

      },
     
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  showzi:function(){
    console.log("是是是是是是所所所所所")
  },
  onLoad: function (options) {
    var nickName = wx.getStorageSync("UseInfo") 
    if(!nickName.nickName==""){
      this.setData({
        hasUserInfo:true,
         canIUse:true, 
        userInfo:nickName,
         
      })

    }
    var _this = this
    wx.request({
      url: 'http://47.108.63.246/background/getjifen',
      data: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      success: function (res) {
        console.log(res.data.data)
        _this.setData({
          num: res.data.data
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.showzi()
  },
   
 
 
})
