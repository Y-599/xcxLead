// pages/audit/audit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "col1": "身份证", "col2": "第二列1", "col3": "详情", "col4": "点击上传"},
      { "col1": "电子合同", "col2": "第二列2", "col3": "详情", "col4": "点击上传" },
    ],      
    showOk:false ,
    isdetails: false,
    details: "",
    details_id:"",
    isdetails_id_data:false

  },
  iosjesuan: function (res) {
    console.log(res.target.id)
    if(res.target.id==0){
      this.setData({
        isdetails: true,
        isdetails_id_data: false

      })
    }else{
      this.setData({
        isdetails: false,
        isdetails_id_data: true
      })
    }
    
  },

  close: function () {
    this.setData({
      isdetails: false,

    }) 
  }, 
  close_id: function () {
    this.setData({
      isdetails_id_data:false

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://47.108.63.246/getaduite',
      data:{
        phoneAccount: wx.getStorageSync("user_relm")
      },
      success:(res)=>{
      if(res.data.state==200){
        console.log(res.data.data)
        this.setData({
          "listData[0].col2": res.data.data[1],
          details: res.data.data[4],
          "listData[1].col2": res.data.data[2],
          details_id: res.data.data[3],
        })
 
      }else{
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
      }
        if (this.data.listData[0].col2 == "审核通过" || this.data.listData[1].col2 == "审核通过") {
          this.setData({
            showOk: true
          })
        }
      } ,
      fail: function () {
        wx.showToast({
          title: '服务器断开连接',
          icon: "none"
        })
      }
    })

  },
  aa:function(res){
    const index = res.currentTarget.id
    if(index==0){//身份证
      wx.navigateTo({
       
        url: "/pages/contract/contract",
      })
    }else if(index==1){//合同
      wx.navigateTo({
        url: "/pages/aduil/aduil",

      })
    }
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
    console.log(this.data.listData[0].col2)
   
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