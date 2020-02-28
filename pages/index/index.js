//index.js
//获取应用实例
import requset from '../../utils/request.js'

Page({
  data: {
    banners: []
  },
  onLoad() {
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
      console.log(message)
    })
  }

})