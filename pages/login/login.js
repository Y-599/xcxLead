// pages/login/login.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_password:"",
    phone_account:"",

  },
  write_account: function (res) {
    const account = res.detail.value
    this.setData({
      phone_account: account
    })
  },
  write_password:function(res){
   const password =res.detail.value
    this.setData({
      phone_password:password
    })
  },
//用户登录
  phone_login:function(){
    if(this.data.phone_account.length==0){
      wx.showToast({
        title: '请输入账号',
        icon:"none"
      })
    } else if (this.data.phone_password.length == 0){
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
    }else{
      wx.request({
        url: 'http://47.108.63.246/phone_login/p_login',
        method:"POST",
        data:{ 
          phoneAccount:this.data.phone_account,
          password:this.data.phone_password
        }, 
        success:(res)=>{
          if(res.data.state==200){
            wx.showToast({
              title: '登录成功', 
            })

            wx.setStorage({
              key: 'token',
              data: res.data.data, 
            })
            wx.setStorage({
              key: 'user_relm',
              data: this.data.phone_account,
            }) 
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000)
          }else{ 
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon:"none"
            })
          }
        },
        complete:function(){
    
 
        
        },
        fail:function(){
          wx.showToast({
            title: '服务器断开连接',
            icon:"none"
          })
        }
        
      })
    }
  },
  //跳转到注册页面
  toRexUser:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/rex/rex',
   
    })
  },
  //跳转到忘记密码
  forgetPasswrod: function (e) {
    console.log(e)
    wx.navigateTo({ 
      url: "/pages/forgetPassword/forgetPassword",


    })
  },
  

  
  onShareAppMessage: function () {
   
    
  }
}) 