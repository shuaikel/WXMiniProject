import Promise from '../libs/es6-promise.min'
import { API, ObjectUtil, DevConfig } from './index';
let app = null;
let device = 'IOS';
const NETWORK_ERROR = '网络请求失败，请重试';

wx.getSystemInfo({
  success: function (res) {
    if (res.platform == "devtools") {
      device = 'ANDROID'
    } else if (res.platform == "ios") {
      device = 'IOS'
    } else if (res.platform == "android") {
      device = 'ANDROID'
    }
  }
})

const Request = {
  /**
   * 发起请求
   * @param  {string} method           请求方法
   * @param  {string} url              请求路由
   * @param  {Object} params           请求参数
   * @param  {Object=} opts            额外可选参数 opts.type = 'member' || 'mini'
   * @return {Object}                  返回请求的Promise
   */
  hostMap: undefined,
  apiRequest(method, sourceUrl, params, needLogin = false, opts = {}) {

    let requestData = this.requestDataWithUrl(method, sourceUrl, params, needLogin, opts);
    return this.runRequest(requestData);
  },

  // 请求前处理
  requestDataWithUrl(method, sourceUrl, params, needLogin, opts) {
    if (!app) {
      app = getApp()
    }
    let requestData = {};
    let requestConfig = {};
    params.device = params.device || device;
    //确定访问域名url
    if (!this.hostMap) {
      this.hostMap = DevConfig.getDevEnvConfigAction();
    }
    let host = this.hostMap.host;
    host = opts && opts.type && opts.type != '' ? this.hostMap[opts.type] : host;
    let url = sourceUrl.includes('http') ? sourceUrl : host + sourceUrl;

    //是否需要加上时间戳
    if (opts.timeStamp) {
      let timeStamp = new Date().getTime();
      url = url.indexOf('?') >= 0 ? (url + '&t=' + timeStamp) : (url + '?t=' + timeStamp);
    }
    //是否需要加accessToken 
    if (needLogin && app.globalData.accessToken) {
      params.access_token = app.globalData.accessToken
    }
    //是否需要扁平化请求参数  数组会变成arr[0]=0,arr[1]=1
    if (opts && opts.needDevelop) {
      params = ObjectUtil.flatten(params)
    }

    requestConfig.url = url;
    requestConfig.method = method;
    requestConfig.data = params
    requestConfig.header = {
      'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
    };
    requestData.requestConfig = requestConfig;
    requestData.opts = opts;
    return requestData;
  },
  //发起请求
  runRequest(requestData) {
    let that = this;
    wx.showNavigationBarLoading()
    let requestConfig = requestData.requestConfig;
    return new Promise((resolve, reject) => {
      requestConfig.success = function (res) {
        that.requestSuccess(res, requestData.opts)
        resolve(res)
      };
      requestConfig.fail = reject;
      requestConfig.complete = function (e) {
        wx.hideNavigationBarLoading()
      }
      wx.request(requestConfig)
    })
  },
  //回调成功
  requestSuccess(res, opts) {
    let data = res.data;
    let pages = getCurrentPages();
    let page = pages[pages.length - 1];
    if (data.code != 0 && data.code != '10003' && !data.toLogin) {
      if (opts && opts.noFailMsg) { }
      else {
        data.msg && page.$showToast(data.msg)
      }
    }
    if (data.toLogin && !opts.dontNeedReLogin) {
      app.getAccessToken((status) => {
        if (!status) {
          if (app.globalData.unionId != '') {
            wx.navigateTo({
              url: '/pages/personal/bind_phone/index?callbackUrl=back',
            })
          }
          else {
            wx.navigateTo({
              url: '/pages/authorization/index?callbackUrl=back',
            })
          }
        }
        else {
          let queryStr = ObjectUtil.objQueryToString(page.options);
          page.onLoad(queryStr)
          setTimeout(() => {
            page.onShow();
          }, 0)
        }
      });
    }

    if (res.statusCode == 500) {
      page.$hideLoading();
      page.$showToast(NETWORK_ERROR);
    }
  },

  //上传图片
  uploadFile(tempFilePath, cb) {
    if (!app) {
      app = getApp()
    }
    return new Promise((resolve, reject) => {
      //确定访问域名url
      let hostMap = DevConfig.getDevEnvConfigAction();
      wx.uploadFile({
        url: hostMap.file + API.uploadFile,
        filePath: tempFilePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: {
          'access_token': app.globalData.accessToken,
          'name': 'file',
        },
        success: (e) => {
          let data = JSON.parse(e.data);
          resolve(data)
        },
        fail: (e) => {
          reject({ code: -1 })
        },
        complete: (e) => {
        }
      })
    })

  },


}

export default Request;