// pages/category/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  handclick(e) {
    // console.log(e.target.dataset.index)
    const {
      index
    } = e.target.dataset

    this.setData({
      current: index
    })
    // console.log(this.data.current)
  }

})