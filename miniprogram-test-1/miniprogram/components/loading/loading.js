class Loading {

  constructor(opts) {
    this.dataObj = {
      loadingVisible: false,
      top: false //若传入top，则将loading位置调高到20%
    };
    /**
     * 记录loading显示状态,(延迟若干ms显示网络请求需求)
     * pending: 初始化
     * rejected: 不需要显示了
     * resolved: 已显示过
     */
    this.state = "pending";

    if (opts) {
      this.setDataFunc = opts.setDataFunc;
    }
  }

  show(options) {
    if (options && options.top) {
      this.dataObj.top = true;
    }
    this.dataObj.loadingVisible = true;

    /*免密loading设置*/
    if (options && options.showPayLoading) {
      //免密支付loading
      if (options.showPayLoading) {
        this.dataObj.showPayLoading = options.showPayLoading;
      }
      //支付成功icon
      if (options.showPaySuccess) {
        this.dataObj.showPaySuccess = options.showPaySuccess;
      }
      //支付提示文案
      if (options.loadingTips) {
        this.dataObj.loadingTips = options.loadingTips;
      }
    } else {
      //如果不显示免密loading,清除免密支付loading数据
      this.clearPayloadingObj();
    }

    if (this.setDataFunc) {
      this.setDataFunc(this.dataObj);
    }
    /*无延迟修正state*/
    if (this.state === "pending") this.state = "resolved";
    if (this.state === "rejected") this.state = "pending";
  }
  delayShow(top, delayTime) {
    setTimeout(() => {
      if (this.state === "pending") {
        if (top) {
          this.dataObj.top = true;
        }
        this.dataObj.loadingVisible = true;
        if (this.setDataFunc) {
          this.setDataFunc(this.dataObj);
        }
      }
      if (this.state === "rejected") this.state = "pending";
    }, delayTime);
  }
  hide() {
    this.dataObj.top = false;
    this.dataObj.loadingVisible = false;

    /*清除免密支付loading数据*/
    this.clearPayloadingObj();
    if (this.setDataFunc) {
      this.setDataFunc(this.dataObj);
    }
    if (this.state === "pending") this.state = "rejected";
    if (this.state === "resolved") this.state = "pending";
  }

  /*清除免密支付loading数据*/
  clearPayloadingObj() {
    if (this.dataObj.hasOwnProperty('showPayLoading')) {
      delete this.dataObj.showPayLoading;
    }
    if (this.dataObj.hasOwnProperty('showPaySuccess')) {
      delete this.dataObj.showPaySuccess;
    }
    if (this.dataObj.hasOwnProperty('loadingTips')) {
      delete this.dataObj.loadingTips;
    }
  }
}
export default Loading;
