// pages/aduil/aduil.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    imgpath3: '',
    updataImage3Flog:false,
    updataImage3:""

  },
  getImg3: function () {
    var _this = this;
    //选择图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //预览显示
        _this.setData({ 
          imgpath3: res.tempFilePaths[0]
        }); 
      },
    })
  },

  //上传合同
  uploadContarct: function () {
    var _this = this;
      _this.setData({
        updataImage3Flog: true
      })
      //上传处理
    var update1 = wx.uploadFile({
        url: 'http://47.108.63.246/email/savaIdCard3', //上传地址
        filePath: _this.data.imgpath3,//上传图片路径
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
              updataImage3Flog: false,
              updataImage3: 0
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
          updataImage3: res.progress,
        })


      })
  },









   
   downLoad: function () {
     const downloadTask = wx.downloadFile({
       url: "http://47.108.63.246/profile/download/hetong.jpg",
      success: function (res) {
        if (res.statusCode === 200) {
          console.log("成功") 
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wx.showToast({
                title: '下载成功',
              })
            }
          })
        } else {
          console.log("失败")

        }

      },
      fail: function () {
        wx.showToast({
          title: '服务器断开连接',
          icon: "none"
        })
      }


    })
     downloadTask.onProgressUpdate((res) => {
       wx.showLoading({
         title: res.progress+'%',
       })
       console.log('下载进度', res.progress)
       console.log('已经下载的数据长度', res.totalBytesWritten)
       console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
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