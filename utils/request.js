/**
 * 封装一个异步的请求工具库
 * 基于 wx.request (ajax) 来实现axios的部分功能
 * 
 * 1.调用返回一个promise （以axios举例）
 * 
 * request({
 *  ...配置
 * }).then(res => {}).catch(err => {})
 * 
 * 
 * 2.配置基准路径
 * 
 * request.defaults.baseURL = "路径"
 * 
 * 
 * 3.错误拦截
 * 
 * request.onError(res => {
 *  // 处理错误
 * })
 *
 */

/**
 * 主函数
 * 
 * @params
 * 参数 | 类型 | 默认值
 * config | Oject | {}
 */

const request = (config = {}) => {
  if (config.url.search(/^http/) === -1) {
    config.url = request.defaults.baseURL + config.url
  }

  return new Promise((resolve, reject) => {
    //发起请求
    wx.request({
      ...config,
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      },
      complete(res) {
        request.errors(res)
      }
    })
  })

}
//对外暴露
request.defaults = {
  //基准路径
  baseURL: ""
}

request.errors = () => {}
//错误拦截
request.onError = (callback) => {
  if (typeof callback === "function") {
    request.errors = callback
  }
}
export default request;