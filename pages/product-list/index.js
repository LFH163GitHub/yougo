// pages/product-list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    list: [],
    more: true,
    pagenum: 1,
    loading: true
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
    this.getGoods();

  },
  getGoods() {
    if (this.data.more === false) {
      return
    }
    setTimeout(v => {
      //请求商品列表
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
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
          list: [...this.data.list, ...list],
          //当前请求完毕
          loading: false
        })
        console.log(this.data.list)
        //判断是否最后一页
        if (this.data.list.length >= message.total) {
          this.setData({
            more: false
          })
        }
      })

    }, 2000)
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
    // 需要等到上一次的请求回来了再执行下一页的数据
    if (this.data.loading === false) {
      this.setData({
        // 每次发起请求前重新设置loadig为正在加载
        loading: true,
        pagenum: this.data.pagenum + 1
      })
      this.getGoods();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})