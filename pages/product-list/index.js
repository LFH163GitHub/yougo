// pages/product-list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      keyword
    } = options;
    this.setData({
      keyword: keyword
    })
    request({
      url: "/goods/search",
      data: {
        query: this.data.keyword,
        pagenum: 1,
        pagesize: 10
      }
    }).then(res => {
      const {
        message
      } = res.data
      console.log(message)
      //遍历修改goods的价格
      const list = message.goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      // 把message商品列表保存到list
      this.setData({
        list
      })
    })

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