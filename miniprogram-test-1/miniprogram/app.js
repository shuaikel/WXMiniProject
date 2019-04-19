
import { 
  ISPRODUCT, 
  VERSIONS, 
  NODE_ENV
  } from './common/index.js'

//app.js
App({
  onLaunch: function () {
    
    this.globalData = {
      userInfo: null,
      versions: VERSIONS,
      ISPRODUCT: ISPRODUCT,
      node_env: ISPRODUCT ? "prod" : (wx.getStorageSync('node_env') || NODE_ENV),
      sessionKey: '', // 
      unionId: '',  // 同一个微信平台下的不同应用，unionid是相同的，
      openId: '',  // 
      accessToken: 'wx_bf4a00b393bb75e563d6b0be81e5042f'

    }
  }
})
