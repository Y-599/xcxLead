
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    showxuanfu:true,
    jiesuan:"结算",
    listData: [
    ],
    id:"",
    showWarn: false,
    showData: true,
    iosjesuan:false,  
    product_name: "", 
    date_begin:"", 
    date_end:"",
    array: [],
    iosDialog:false,
    nowDate:"",
    backcolor:"backcolor"
  },

checkEarns:function(){
  if(this.data.product_name==""){
    wx.showToast({
      title: '作品名称未选择',
      icon:"none" 
    })
  } else  if (this.data.date_begin == "") {
    wx.showToast({
      title: '开始时间未选择',
      icon: "none"
    })
  } else if (this.data.date_end == "") {
    wx.showToast({
      title: '结束时间未选择',
      icon: "none"
    })
  }else{
wx.request({
  url: 'http://47.108.63.246/background/checkhistry',
  data:{ 
       production:this.data.product_name,
      beginDate:this.data.date_begin, 
      beginEnd:this.data.date_end
  }, 
  header:{ 
    token:wx.getStorageSync("token")
  },
  success:function(res){
    console.log(res.data.data) 
    if(res.data.state==200){
      wx.setStorage({
        key: 'checkHistry',
        data: res.data.data,
      })
      wx.showToast({
        title: '记录查询成功',
      })
      wx.navigateTo({ 
        url: "/pages/checkHistry/checkHistry"
      })
    } else if (res.data.msg =="运行时异常:token过期"){
      wx.showToast({
        title: res.data.msg,
        icon: "none"
      })
      wx.navigateTo({
        url:"/pages/login/login"
      })

    }
      else{
      wx.showToast({
        title: res.data.message,
        icon: "none"

      })
    }
  },
  fail:function(){
    wx.showToast({
      title: '服务器连接失败',
      icon:"none"
    })
  }
})

  }


},










  returns: function () {
    this.setData({
      iosDialog: false

    })
  },
  returnss: function (res) {
   
    this.setData({
      iosjesuan: false

    })
  },
  begina: function () {
    this.setData({
      iosDialog: true

    })
  },
  iosjesuan:function(res){
    const id = res.target.id

    this.setData({
      iosjesuan:true,
      id:id
    })
  },
  closeMoney:function(res){ 
    const id = this.data.id
    if (this.data.listData[id].addearnYear<1){
      wx.showToast({
        title: '收益不足无法提现',
        icon:"none"
      }) 
    }else if(this.data.nowDate>14){ 
     wx.request({
       url: 'http://47.108.63.246/background/crealXcxmoney',
       data: {
         pruoduction: this.data.listData[id].production
       },
       header:{
         token:wx.getStorageSync("token")
       },
       success:(res)=>{
         if(res.data.state==200){
           wx.showToast({ 
             title: '结算中',
           })
           this.setData({
             jiesuan:"结算中",
             backcolor:"backcolor"
           })
         }
       }
     })
   }else{ 
     wx.showToast({
       title: '结算时间未到',
       icon:"none"
     })
   }
  },


  showEarns: function (res) {
    wx.request({
      url: 'http://47.108.63.246/background/addxcxEarn',
      data: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      success: (res) => {
        if (res.data.state == 200) {
          this.setData({
            listData: res.data.data,
          })
         
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',

          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接失败',
          icon: "none"
        })
      }

    })
    wx.request({
      url: 'http://47.108.63.246/background/getproduct',
      data: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      success: (res) => {

        if (res.data.state == 200) {
          const data = res.data.data
          for (let i in data) {
            this.setData({
              array: this.data.array.concat(data[i].production)
            })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接失败',
          icon: "none"
        })
      }

    })
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    console.log(D)
    this.setData({
      nowDate: D
    })
    if (this.data.nowDate > 15) {
      this.setData({
        backcolor: ""
      })
    } else {
      this.setData({
        backcolor: "backcolor"
      })
    }



  },
  //作品名称
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      product_name: this.data.array[e.detail.value]
    })
  },
  //开始时间

  bindDateChange: function (e) {
    this.setData({
      date_begin: e.detail.value
    })
  },
  //结束时间

  bindTimeChange: function (e) {
    this.setData({
      date_end: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载  
   */ 
  onLoad: function (options) {  
     },


onShow:function(e){
    wx.request({
      url: 'http://47.108.63.246/background/addxcxEarn',
      data: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      success: (res) => {
        if (res.data.state == 200) {
          this.setData({
            listData: res.data.data,
          })
          console.log(this.data.listData.length)
          console.log(this.data.listData.length>0)

          if (this.data.listData.length <1) {
            this.setData({
              showxuanfu: false,

              showWarn: true,
              showData: false
            })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',

          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接失败',
          icon: "none"
        })
      }

    })
    wx.request({
      url: 'http://47.108.63.246/background/getproduct',
      data: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      success: (res) => {

        if (res.data.state == 200) {
          const data = res.data.data
          for (let i in data) {
            this.setData({
              array: this.data.array.concat(data[i].production)
            })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器连接失败',
          icon: "none"
        })
      }

    })
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    console.log(D)
    this.setData({ 
      nowDate: D
    })
    if (this.data.nowDate > 15) {
      this.setData({
        backcolor: ""
      })
    } else {
      this.setData({
        backcolor: "backcolor"
      })
    }

  if (this.data.listData <1) {
    console.log("ssssssss")
  }

  },


  //作品名称
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      product_name: this.data.array[e.detail.value]
    })
  }, 
  //开始时间

  bindDateChange: function (e) {
    this.setData({
      date_begin: e.detail.value
    })
  },
  //结束时间

  bindTimeChange: function (e) {
    this.setData({
      date_end: e.detail.value
    })

},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})