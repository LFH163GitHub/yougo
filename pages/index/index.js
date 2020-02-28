//index.js
//获取应用实例
import requset from '../../utils/request.js'

Page({
  data: {
    banners: [],
    menus: [],
    floors: [],
    // 是否显示回到顶部
    isShowTop: false
  },
  onLoad() {
    //轮播图请求
    requset({
      //请求图片
      url: "/home/swiperdata"
    }).then((res) => {
      // message数组
      // console.log(res)
      const {
        message
      } = res.data
      this.setData({
        banners: message
      })
      // console.log(message)
    })
    //导航栏的请求
    requset({
      url: "/home/catitems"
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      // console.log(message)
      const newData = message.map((v, i) => {
        // console.log(v)
        //代表分类
        if (i === 0) {
          v.url = "/pages/category/index"
        }
        return v
      })
      // console.log(newData)
      this.setData({
        menus: newData
      })

    })

    //楼层数据
    requset({
      url: '/home/floordata'
    }).then(res => {
      console.log(res.data.message)
      const {
        message
      } = res.data
      this.setData({
        floors: message
      })
    })

  },
  // 小程序回到顶部
  handleToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onPageScroll(e) {
    // console.log(e)
    const {
      scrollTop
    } = e
    let isShow = this.data.isShowTop
    if (scrollTop > 100) {
      isShow = true
    } else {
      isShow = false
    }
    // 避免频繁的操作setData，所以如果下面两个值是相同就没必要再赋值了
    if (isShow == this.data.isShowTop) return;

    this.setData({
      isShowTop: isShow
    })
  }
})