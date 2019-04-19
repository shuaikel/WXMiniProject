import Loading from '../components/loading/loading.js';
import Toast from '../components/toast/toast';

const addPageUIUtil = function (pageObj){

  /**
   * 弹出toast
   * @param  {String} msg 消息
   * @param  {Object} options 选项
   */
  pageObj.$showToast = function (msg, options) {
    if (!this.$toast) {
      let that = this;
      this.$toast = new Toast({
        setDataFunc: function (toastData) {
          that.setData({
            $toastData: toastData
          });
        },
        page: that
      });
    }
    if (msg) {
      if (this.$toast && this.$toast.setText) {
        this.$toast.setText(msg).show(options);
      }
    }
  }
  
 /**
  * 判断是否是ipx系列
  */
  wx.getSystemInfo({
    success: function (res) {
      pageObj.data.isIpx = res.model.indexOf('iPhone X') >= 0
    }
  })
  /**
   * 显示loading
   */
    pageObj.$showLoading = function (opt, delayTime) {
      if (!this.$loading) {
        let self = this;
        this.$loading = new Loading({
          setDataFunc: function (loadingData) {
            self.setData({
              $loadingData: loadingData
            });
          }
        });

      }
      if (delayTime) {
        this.$loading.delayShow(opt, delayTime);
      } else {
        this.$loading.show(opt);
      }
    };
    /**
     * 隐藏loading
     */
    pageObj.$hideLoading = function () {
      if (this.$loading) {
        this.$loading.hide();
      }
    };

}


export default addPageUIUtil