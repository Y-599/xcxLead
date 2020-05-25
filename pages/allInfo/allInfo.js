// pages/allInfo/allInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    username: "",
    phone_account: "",
    bank_card: "",
    address: "",
    //获取信息
    showUsername: "",
    showPhone_account: "",
    showBanks_card: "",
    showAddress: "",
    //显示勾勾
    usernameFlog: false,
    phone_accountFlog: false,
    bank_cardFlog: false,
    addressFlog: false,
    id_card: false,
    //判断是否合法
    showImage: true,
    clause: false,//合同
    index: 1


  },
  //判断姓名合法
  check_username: function (res) {
    const username = res.detail.value
    if ((username.length < 0 || username.length > 5)) {
      wx.showToast({
        title: '名字长度为五个字以内',
        icon: "none"
      })
      this.setData({
        username: "",
        showUsername: "",
        usernameFlog: false
      })
    } else if ((/^[u4E00-u9FA5]+$/).test(username)) {
      wx.showToast({
        title: '请输入正确的名字',
        icon: "none"
      })
      this.setData({
        username: "",
        showUsername: "",
        usernameFlog: false
      })
    } else if (username.length != 0) {
      this.setData({
        username: username,
        showUsername: "weui-icon-success",
        usernameFlog: true
      })
    }
  },
  //判断手机号合法
  check_phone: function (res) {

    const check_phones = res.detail.value
    if (check_phones == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      this.setData({
        phone_account: "",
        showPhone_account: "",
        phone_accountFlog: false
      })
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(check_phones)) {
      wx.showToast({
        title: '邮箱账号有误，请重新输入',
        icon: "none"
      })
      this.setData({
        phone_account: "",
        showPhone_account: "",
        phone_accountFlog: false
      })
    } else {
      this.setData({
        phone_account: check_phones,
        showPhone_account: "weui-icon-success",
        phone_accountFlog: true
      })
    }

  },

  //判断银行卡合法6228 4812 6904 0908 170
  check_bankCard: function (res) {

    const check_bankCards = res.detail.value
    if (check_bankCards == "") {
      wx.showToast({
        title: '银行卡号不能为空',
        icon: "none"
      })
      this.setData({
        bank_card: "",
        showBanks_card: "",
        bank_cardFlog: false
      })
    } else if (!(/^([1-9]{1})(\d{14}|\d{18})$/).test(check_bankCards)) {
      wx.showToast({
        title: '银行卡号有误，请重新输入',
        icon: "none"
      })
      this.setData({
        bank_card: "",
        showBanks_card: "",
        bank_cardFlog: false
      })
    } else {
      this.setData({
        bank_card: check_bankCards,
        showBanks_card: "weui-icon-success",
        bank_cardFlog: true
      })
    }

  },

  //判断地址合法
  check_address: function (res) {

    const check_address = res.detail.value
    if (check_address == "") {
      wx.showToast({
        title: '地址不能为空',
        icon: "none"
      })
      this.setData({
        address: "",
        showAddress: "",
        addressFlog: false
      })
    } else if ((/^[u4E00-u9FA5]+$/).test(check_address)) {
      wx.showToast({
        title: '地址有误，请重新输入',
        icon: "none"
      })
      this.setData({
        address: "",
        showAddress: "",
        addressFlog: false
      })
    } else {
      this.setData({
        address: check_address,
        showAddress: "weui-icon-success",
        addressFlog: true
      })
    }

  },



  //信息填写
  emailInput: function () {
    if (!this.data.usernameFlog) {
      wx.showToast({
        title: '姓名异常',
        icon: "none"
      })
    } else if (!this.data.phone_accountFlog) {
      wx.showToast({
        title: '邮箱账号异常',
        icon: "none"
      })
    } else if (!this.data.bank_cardFlog) {
      wx.showToast({
        title: '银行卡异常',
        icon: "none"
      })
    } else if (!this.data.addressFlog) {
      wx.showToast({
        title: '地址异常',
        icon: "none"
      })
      // } else if (!this.data.id_card) {
      //   wx.showToast({
      //     title: '身份证异常',
      //     icon: "none"
      //   })

    } else {
      wx.request({
        url: 'http://47.108.63.246/email/savaInfo',
        method: "POST",
        data: {
          username: this.data.username,
          mailAccount: this.data.phone_account,
          bankCard: this.data.bank_card,
          address: this.data.address,
          phoneAccount: wx.getStorageSync("user_relm")

        },
        header: {
          token: wx.getStorageSync("token")
        },
        success: function (res) {
          if (res.data.state == 200) {
            wx.showToast({
              title: '信息输入成功',
            })

          } else if (res.data.msg == "运行时异常:token过期") {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            wx.navigateTo({
              url: "/pages/login/login"
            })

          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})