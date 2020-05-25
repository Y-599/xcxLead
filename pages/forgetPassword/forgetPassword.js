
// pages/rex/rex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",//手机账号
    //显示勾勾    
    phonegg: "",
    mailgg: "",
    phoneOnePasswordgg: "",
    phoneCheckPasswordgg: "",
    //显示勾勾    
    phonePasword: "",//密码

    phoneCode: "",//验证码
    //输入合法
    codeFlog: false,
    phoneFlog: false,
    phoneOnePassword: false,
    phoneCheckpassword: false,
    mailFlog: false,//邮箱合法
    //输入合法

    getcode: "获取验证码",//邮箱
    index: 60,//邮箱倒计时
    showmail: true,
    showphone: true,
    mail: {
      mailaccount: ""
    },

    mailRexShow: false,
    phoneRexshow: true

  },
  //跳到手机号注册
  toPhoneRex: function () {
    this.setData({
      phoneRexshow: true,
      mailRexShow: false,
      mailgg: "",
      phoneOnePasswordgg: "",
      phoneCheckPasswordgg: "",
      phoneFlog: false,
      phoneOnePassword: false,
      phoneCheckpassword: false,
      codeFlog: false

    })
  },
  //点击手机号注册
  phone_rex: function () {
    if (!this.data.phoneFlog) {
      wx.showToast({
        title: '手机账号异常',
        duration: 2000,
        icon: 'none'
      })
    } else if (!this.data.phoneOnePassword) {
      wx.showToast({
        title: '密码异常',
        duration: 2000,
        icon: 'none'
      })
    } else if (!this.data.phoneCheckPasswordgg) {
      wx.showToast({
        title: '检测密码异常',
        duration: 2000, 
        icon: 'none'
      })
    } else if (!this.data.codeFlog) {
      wx.showToast({
        title: '验证码异常',
        duration: 2000,
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'http://47.108.63.246/email/forgetPassword',
        method: 'post',
        data: {
          'check': wx.getStorageSync("Phone_check"),

          'phoneAccount': this.data.phone,

          'mailCode': this.data.phoneCode,

          'password': this.data.phonePasword
        },
        success: function (res) {
          if (res.data.state == 200) {
            wx.setStorage({
              key: 'user_relm',
              data: res.data.data,
            })
            wx.showToast({
              title: "修改成功",
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/login/login',

              })
            }, 2000)
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }

        },
        fail:function(){
          wx.showToast({
            title: '服务器连接失败',
            icon:'none'
          })
        }
      })
    }

  },
  //手机验证码
  getPhoneCheck: function () {
    if (!this.data.phone == "") {
      wx.showToast({
        title: '验证码已经发送，请注意查收',
        duration: 2000,
      });
      wx.request({
        url: 'http://47.108.63.246/email/sendcode',
        data: {
          "toPhone": this.data.phone
        },
        success: function (res) {
          console.log(res)
          const check = res.data.data
          if (res.data.state == 200) {
            wx.setStorage({
              key: 'Phone_check',
              data: check,
            })
          } else {
            wx.showToast({
              title: res.data.messsage,
              icon: 'none'
            })
          }
        },

      })
      // 60秒后重新获取验证码
      var inter = setInterval(function () {
        this.setData({
          showPhone: true,
          getcode: this.data.index + 's后重发',
          index: this.data.index - 1
        });
        if (this.data.index < 0) {
          clearInterval(inter)
          this.setData({
            getcode: '发送验证码',
            index: 60,
            showPhone: false,
          });
        }
      }.bind(this), 1000);
    } else {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
    }




  },
  //判断手机号格式
  getPhone: function (res) {

    const phone = res.detail.value

    if (!(/^1[3456789]\d{9}$/).test(phone)) {

      wx.showToast({

        title: '手机号码格式有误',

        duration: 2000,

        icon: 'none'

      });
      this.setData({
        phoneFlog: false,
        phonegg: ""
      })
    } else {
      this.setData({
        phoneFlog: true,
        phonegg: "weui-icon-success",
        phone: phone
      })
    }
  },
  //检测是否输入密码
  inputPasswrods: function (res) {
    const phonePasword = res.detail.value
    if (phonePasword.length < 8) {
      wx.showToast({
        title: '密码的长度不得小于八位',
        duration: 2000,
        icon: 'none'
      })
      this.setData({
        phoneOnePassword: false,
        phoneOnePasswordgg: ""

      })
    } else {
      this.setData({
        phonePasword: phonePasword,
        phoneOnePassword: true,
        phoneOnePasswordgg: "weui-icon-success"
      })
    }
  },
  //判断俩次输入密码是否正确     
  checkPassword: function (res) {
    const phonePasword = this.data.phonePasword
    console.log(res)
    if (phonePasword == "" || phonePasword == 0) {
      wx.showToast({
        title: '密码不能为空',
        duration: 2000,
        icon: 'none'
      });
      this.setData({
        phoneCheckPasswordgg: "",
        phoneCheckpassword: false
      })
    } else if (phonePasword == res.detail.value) {
      this.setData({
        phoneCheckpassword: true,
        phoneCheckPasswordgg: "weui-icon-success"

      })
    } else {
      wx.showToast({
        title: '俩次密码不一致',
        duration: 2000,
        icon: 'none'
      })
      this.setData({
        phoneCheckpassword: false,
        phoneCheckPasswordgg: "",

      })

    }
  },


  //---------------------------------------------------------------------------------------------









  //跳到邮箱注册
  toMailRex: function () {
    this.setData({
      phoneRexshow: false,
      mailRexShow: true,

      phonegg: "",
      phoneOnePasswordgg: "",
      phoneCheckPasswordgg: "",
      phoneFlog: false,
      phoneOnePassword: false,
      phoneCheckpassword: false,
      codeFlog: false


    })
  },
  //邮箱发送验证码
  getCheck: function () {
    if (this.data.mail.mailAccount == "") {

    } else {
      wx.showToast({
        title: '验证码已经发送，请注意查收',
        duration: 2000,
      });
      wx.request({
        url: 'http://47.108.63.246/email/emailInfo',
        data: {
          "toEmail": this.data.mail.mailaccount
        },
        success: function (res) {
          const check = res.data.data.check
          wx.setStorage({
            key: 'check',
            data: check,
          })
        },

      })
      // 60秒后重新获取验证码
      var inter = setInterval(function () {
        this.setData({
          showmail: true,
          getcode: this.data.index + 's后重发',
          index: this.data.index - 1
        });
        if (this.data.index < 0) {
          clearInterval(inter)
          this.setData({
            getcode: '发送验证码',
            index: 60,
            showmail: false,
          });
        }
      }.bind(this), 1000);



    }
  },

  //判断邮箱格式
  getmail: function (res) {
    console.log(res)
    const mail = res.detail.value
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(mail))) {
      wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
      });
      this.setData({
        mailgg: "",
        mailFlog: false,



      })
    } else {
      this.setData({
        'mail.mailaccount': mail,
        showmail: false,
        mailFlog: true,
        mailgg: "weui-icon-success"
      })
    }
  },



  //点击邮箱注册
  mail_rex: function () {
    if (!this.data.mailFlog) {
      wx.showToast({
        title: '邮箱账号异常',

        duration: 2000,

        icon: 'none'
      })
    } else if (!this.data.phoneOnePassword) {
      wx.showToast({
        title: '密码异常',

        duration: 2000,

        icon: 'none'
      })
    } else if (!this.data.phoneCheckPasswordgg) {
      wx.showToast({
        title: '检测密码异常',

        duration: 2000,

        icon: 'none'
      })
    } else if (!this.data.codeFlog) {
      wx.showToast({
        title: '验证码异常',

        duration: 2000,

        icon: 'none'
      })
    } else {
      wx.request({
        url: 'http://47.108.63.246/email/emailrex',
        method: 'post',
        data: {
          'check': wx.getStorageSync("check"),


          'mailAccount': this.data.mail.mailaccount,
          'mailCode': this.data.phoneCode,
          'password': this.data.phonePasword
        },
        success: function (res) {
          if (res.data.state == 200) {
            wx.showToast({
              title: "注册成功",
            })
            wx.navigateTo({
              url: '/pages/allInfo/allInfo',

            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }

        }
      })
    }

  },
  //验证码的真假
  codeFolg: function (res) {
    const code = res.detail.value

    if (code.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      this.setData({
        codeFlog: false
      })
    } else {
      this.setData({
        codeFlog: true,
        phoneCode: code
      })
    }

  },











  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})