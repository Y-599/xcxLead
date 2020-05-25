// pages/loveProduct/loveProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
     
    ],  
    showWarn: false,

    showData:true,
    details:"",
    isdetails:false
  },
  iosjesuan:function(res){
    console.log(this.data.listData[res.target.id].productResult)
    this.setData({
      isdetails:true,
      details: this.data.listData[res.target.id].productResult
    })
  },
  
  close: function () {
    this.setData({
      isdetails: false,
    
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
      wx.request({
        url: 'http://47.108.63.246/background/product_schedule',
        data:{
          'phoneAccount'  : wx.getStorageSync('user_relm')
        },
  
        success:(res)=>{   
console.log(res.data.data) 
          this.setData({     
            listData:res.data.data
          }) 
          console.log(this.data.listData.length)
          if (this.data.listData.length < 1) {
            this.setData({
              showWarn: true,
              showData:false
            })
          }
        }
      })
    
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