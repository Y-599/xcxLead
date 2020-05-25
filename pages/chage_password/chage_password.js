// pages/chage_password/chage_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account_phone:"",
    old_password: "",
    new_password: "",
    newPwFlog:false

  },
//判断账号
  account_phone:function(res){
      this.setData({
        account_phone:res.detail.value
      })
  },

//判断旧密码
  old_password: function (res) {
    this.setData({
      old_password: res.detail.value
    })  },

  //判断新密码
  new_password: function (res) {
    this.setData({
      new_password: res.detail.value
    })  },

  //验证新密码
  tNew_password: function (res) {
    console.log(this.data.new_password)
    console.log(res.detail.value)
    if (this.data.new_password != res.detail.value ){
      wx.showToast({
        title: '俩次密码不一致',
        icon:"none"
      })
    }else{
      this.setData({
        newPwFlog:true
      })
    }
  },



  chage_passwrod: function () {
    if (this.data.account_phone == "") {
      wx.showToast({
        title: '账号不能为空',
        icon: "none"
      })
    
    } else if (this.data.new_password==""){

      wx.showToast({
        title: '新密码不能为空',
        icon: "none"
      })

    } else if (this.data.old_password == "") {

      wx.showToast({
        title: '旧密码不能为空',
        icon: "none"
      })

    } else if (!this.data.newPwFlog) {

      wx.showToast({
        title: '验证密码异常',
        icon: "none"
      })

    }else{
      wx.request({
        url: 'http://47.108.63.246/phone_login/change',
          data: {
            phoneAccount: this.data.account_phone,
            password: this.data.old_password,
          newPassword: this.data.new_password,
        },
        header: {
          token:wx.getStorageSync("token")
        },
        method: 'POST',
        success:function(res){
            if(res.data.state==200){
              wx.showToast({
                title: '密码修改成功',
              })
              wx.setStorage({
                key: 'token',
                data: '',
              })
              setTimeout(function () { 
                wx.navigateTo({
                  url: '/pages/login/login',

                })
              }, 2000)
              
            } else if (res.data.msg == "运行时异常:token过期") {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              })
              wx.navigateTo({
                url: "/pages/login/login"
              })

            }else{
              wx.showToast({
                title: res.data.message,
                icon:"none"
              })
            }
        },
        fail: function () {
          wx.showToast({
            title: '服务器断开连接',
            icon: "none"
          })
        }
      })
    }
  },























  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})