// pages/product-detail/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品的详情
    detail: {},
    // 记录tab当前的索引
    current: 0,
    // 需要做图片预览的数组
    picUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: "/goods/detail",
      data: {
        goods_id: options.id
      }
    }).then(res => {
      const {
        message
      } = res.data
      // 获取图片的链接，给预览图片的接口使用
      const picUrls = message.pics.map(v => {
        return v.pics_big
      });
      this.setData({
        detail: message,
        picUrls // 给预览图片的接口使用
      })
    })
  },
  handleTab(e) {
    const {
      index
    } = e.currentTarget.dataset;

    this.setData({
      current: index
    })
  },
  // 预览图片
  handlePreview(e) {
    // console.log(e)
    const {
      index
    } = e.target.dataset
    wx.previewImage({
      current: this.data.picUrls[index], // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表

    })
  },
  // 跳转到购物车页
  handleToCart() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  handleToCart() {
    // 每次加入商品之前应该先判断本地有没有数据，如果没有就等于一个空数组
    const goods = wx.getStorageSync("goods") || [];
    // 判断当前的商品是否已经在goods的数组中
    // 存在就数量加一，不存在就unshift
    // some循环数组，return的结果“只要有一个是true就会返回true”，反之就false
    const exit = goods.some(v => {
      const isExit = v.goods_id === this.data.detail.goods_id;
      if (isExit) {
        v.number += 1;
        wx.showToast({
          title: '数量+1',
          icon: 'success'
        })
      }
      return isExit
    })
    console.log(exit)
    if (!exit) {
      wx.showToast({
        title: '数量+1',
        icon: 'success'
      })
      // 把当前的商品添加到本地的数组中
      goods.unshift({
        goods_id: this.data.detail.goods_id,
        goods_name: this.data.detail.goods_name,
        goods_price: this.data.detail.goods_price,
        goods_small_logo: this.data.detail.goods_small_logo,
        number: 1
      })
    }
    // 保存到本地
    wx.setStorageSync("goods", goods);
  }
})