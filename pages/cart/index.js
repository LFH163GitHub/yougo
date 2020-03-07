// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    goods: [],
    //总价格
    allPrice: 0
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
    this.handleAllPrice()
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
  },
  handleAllPrice() {
    let price = 0
    this.data.goods.forEach(v => {
      // console.log(v)
      //v是数组对象
      price += (v.goods_price * v.number)
    })

    // 修改总价格
    this.setData({
      allPrice: price
    })
    // console.log(this.data.allPrice)
    // 修改本地的数据
    wx.setStorageSync("goods", this.data.goods)
  },
  handleCalc(e) {
    // console.log(e)
    const {
      index,
      number
    } = e.currentTarget.dataset;
    this.data.goods[index].number += number;
    // console.log(this.data.goods[index].number)
    // 重新修改data的goods的值
    this.setData({
      goods: this.data.goods
    })
    // 判断如果数量为0时候，提示用户是否删除商品
    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          // console.log(res)
          if (res.confirm) {
            //删除商品
            this.data.goods.splice(index, 1)
          } else {
            // 如果点击取消的话重新加1
            this.data.goods[index].number += 1;
          }
          // 重新修改data的goods的值
          this.setData({
            goods: this.data.goods
          })
        }
      })
    }
    this.handleAllPrice()
    console.log(this.data.goods)
  },
  bindblur(e) {
    // console.log(e)
    const {
      index
    } = e.currentTarget.dataset;
    let {
      value
    } = e.detail
    //转换数量
    value = Math.floor(Number(value))

    // console.log(this.data.goods[index].number)
    if (value < 1) {
      value = 1;
    }
    this.data.goods[index].number = value
    this.setData({
      goods: this.data.goods
    })
    this.handleAllPrice()
  }
})