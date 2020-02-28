//index.js
//获取应用实例
import requset from '../../utils/request.js'

Page({
  data: {
    banners: [],
    menus: []
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
      console.log(newData)
      this.setData({
        menus: newData
      })

    })
  }

})