// pages/search/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: "",
    // 搜索建议
    recommend: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  // 监听输入框的输入事件
  handleInput(e) {
    // console.log(e)
    //输入框的值
    const {
      value
    } = e.detail
    this.setData({
      inputValue: value
    });
    // 如果value有值才发起请求
    if (!value) {
      // 把搜索建议的数组清空
      this.setData({
        recommend: []
      });
      return;
    }
    // 请求搜索建议
    request({
      url: "/goods/qsearch",
      data: {
        query: value
      }
    }).then(res => {
      // console.log(res.data.message)
      const {
        message
      } = res.data
      //保存数据
      this.setData({
        recommend: message
      })
    })
  },
  handleCancel() {
    // 把搜索建议的数组清空
    this.setData({
      inputValue: "",
      recommend: []
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})