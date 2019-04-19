// miniprogram/pages/swiperComponent/SwiperPage.js

const app = getApp();

import {
  DNPage,
  API,
  Request
} from '../../common/index.js';

var QRCode = require('../../utils/qrcode.js')
var qrcode;

var emptyConfig = {
  emptyImage: '{{IMAGES_HOST}}/images/empty-icon/vipRightListEmpty.png',
  emptyTitle: '专属权益，敬请期待~'
}


DNPage({
   
  data : {
    isIpx : false,
    pageConfigDataLists: [],
    currentPageIndex: 0,

    vip_list: [],
    emptyConfig: emptyConfig,
  },

  onLoad(options){
    this.getUserRedRightPacketInfo();
   },

  getUserRedRightPacketInfo: function (e) {
    Request.apiRequest('POST', API.userGiftList, {}, true).then(res => {
      if (res.data.code == 0) {
        this.setData({ vip_list: res.data.data.vip_list })
      }
    })
  },


  // 改变swiper的offset
  changeSwiperPageAction: function (e) {
    this.setData({ currentPageIndex: e.currentTarget.dataset.currentindex})
  },
  // 手势触发
  swiperChangeAction: function (e) {
      this.setData({ currentPageIndex: e.detail.current });
  }

})