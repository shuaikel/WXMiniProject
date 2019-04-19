const app = getApp();

import { 
  DNPage ,
  API,
  Request 
} from '../../common/index.js';

var QRCode = require('../../utils/qrcode.js')
var qrcode;


DNPage({

  data:{
    isIpx : false,
    areaIds: [], //编辑地址的时候需要传3个area_id进去
  },


  onLoad(options){
    // 显示loading
    this.$showLoading();
    // 隐藏loading
    setTimeout(()=>{
      this.$hideLoading();
    },3000)

    this.$showToast('12312312');

    this.testNetRequest();

    // 二维码测试
    this.createQRCode('1234?invite=10086');
  },
// 选择地区
  selectareaAction : function(param){
    console.log("123");
  },
// 网络测试
testNetRequest : function(){
  
          console.log('api ：' + API);
      Request.apiRequest("post",  
                API.homePageInformation + '?t=' + new Date().getTime() ,{},false).then(res=>{
                  console.log("res:"+res);
                })
},
//  生成二维码
  // 生成二维码
  createQRCode: function (e) {

    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "",
      width: 230,
      height: 230,
      colorDark: "black",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    qrcode.makeCode(e);
  },

  // 查看左右滑动组件
  handleUserCheckSwiper:function(options){
     console.log('123');

     wx.navigateTo({
       url: '../swiperComponent/SwiperPage',
     })

  }




  


})

