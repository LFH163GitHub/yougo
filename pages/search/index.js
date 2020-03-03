// pages/search/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: "",
    // 上次输入框的值
    lastValue: "",
    // 搜索建议
    recommend: [],
    //开关
    loading: false,
    // 本地的存储历史记录
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取本地的存储
    let arr = wx.getStorageSync("history");
    // 如果本地没有数据或者arr不是一个数组
    if (!Array.isArray(arr)) {
      arr = [];
    }

    this.setData({
      history: arr
    })

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
    this.getRecommend();
  },


  handleCancel() {
    // 把搜索建议的数组清空
    this.setData({
      inputValue: "",
      recommend: []
    });
  },


  getRecommend() {

    if (this.data.loding === false) {
      this.setData({
        loading: true,
        // 记录当前搜索的输入框的值
        lastValue: this.data.inputValue
      })
    }
    // 请求搜索建议
    request({
      url: "/goods/qsearch",
      data: {
        query: this.data.inputValue
      }
    }).then(res => {
      // console.log(res.data.message)
      const {
        message
      } = res.data
      //保存数据
      this.setData({
        recommend: message,
        loading: false
      })

      //判断是否最新的值
      if (this.data.lastValue == this.data.inputValue) {
        this.getRecommend();
      }
    })
  },
  // 输入框失去焦点时候触发
  handleBlur() {
    this.setData({
      recommend: []
    })
  },

  // 清空本地的存储
  handleClear() {
    // 清空data中的数据
    this.setData({
      history: []
    })

    // 清空本地的历史数据
    wx.setStorageSync('history', [])
  },

  // 按下回车按钮时候触发的事件
  handleEnter() {
    // 每次存储之前先把本地的数据先获取回来
    let arr = wx.getStorageSync("history");

    // 如果本地没有数据或者arr不是一个数组
    if (!Array.isArray(arr)) {
      arr = [];
    }

    // 添加到数组的第一位
    arr.unshift(this.data.inputValue);

    // 数组去重
    arr = [...new Set(arr)]

    // 把搜索关键字保存到本地
    wx.setStorageSync('history', arr)

    // 跳转到商品搜索列表页
    wx.redirectTo({
      url: "/pages/product-list/index?keyword=" + this.data.inputValue
    })
  }
})