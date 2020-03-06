// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取本地的收获地址
    this.setData({
      // 如果本地没有address就等于一个空对象
      address: wx.getStorageSync("address") || {}
    })

  },
  onShow() {
    // 因为data和onload只会执行一次，所以需要在每次打开页面都获取一次本地的数据
    this.setData({
      goods: wx.getStorageSync("goods") || []
    })
  },
  //获取收获地址
  handleGetAddress() {
    wx.chooseAddress({
      success: (res) => {
        // 把收货地址保存到data
        this.setData({
          address: {
            // 收货人
            name: res.userName,
            // 手机号码
            tel: res.telNumber,
            // 详细地址
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        console.log(res)
        //保存本地
        wx.setStorageSync('address', this.data.address)
      }
    })
  }
})