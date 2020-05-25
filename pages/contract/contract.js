// pages/aduil/aduil.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath1: '',
    updataImage1: '',
    updataImage1Flog: false,

    imgpath2: '',
    updataImage2:'',
    updataImage2Flog:false

  },
  getImg: function () {
    var _this = this;
    //选择图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //预览显示
        _this.setData({
          imgpath1: res.tempFilePaths[0]
        });
      },
    })
  },
  //上传合同
  uploadImg: function () {
    var _this = this;
  
    _this.setData({
      updataImage1Flog: true
    })
    //上传处理
    var update1 = wx.uploadFile({
      url: 'http:/47.108.63.246/email/savaIdCard', //上传地址
      filePath: _this.data.imgpath1,//上传图片路径
      name: 'file',
      formData: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      header: {

        "Content-Type": "multipart/form-data",

        'accept': 'application/json'

      },
      success: res => {
        var data = JSON.parse(res.data);
        console.log(data.state)

        if (data.state == 200) {
          console.log("返回成功")
          wx.showToast({
            title: '成功',

          })
          _this.setData({
            updataImage1Flog: false,
            updataImage1: 0
          })
        } else {
          wx.showToast({
            title: data.message,
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
    update1.onProgressUpdate(function (res) {
      _this.setData({
        updataImage1: res.progress
      })


    })
  },


  getImg2: function () {
    var _this = this;
    //选择图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //预览显示
        _this.setData({
          imgpath2: res.tempFilePaths[0]
        });
      },
    })
  },
  //上传合同
  uploadImg2: function () {
    var _this = this;
   
   _this.setData({
     updataImage2Flog:true
   })
    //上传处理
   var  update=wx.uploadFile({
     url: 'http://47.108.63.246/email/savaIdCard2', //上传地址
      filePath: _this.data.imgpath2,//上传图片路径
      name: 'file',
      formData: {
        phoneAccount: wx.getStorageSync("user_relm")
      },
      header: {

        "Content-Type": "multipart/form-data",

        'accept': 'application/json'

      },
      success: res => {
        var data = JSON.parse(res.data);
        console.log(data.state)

        if (data.state == 200) {
          console.log("返回成功")
          wx.showToast({
            title: '成功',

          })
          _this.setData({
            updataImage2Flog:false,
            updataImage2:0
          })
        } else {
          wx.showToast({
            title: data.message,
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
    update.onProgressUpdate(function (res){
      _this.setData({
        updataImage2:res.progress
      }) 
      console.log(res.progress/100)
     
      
    })
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