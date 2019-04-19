const DEFAULT_SHOW_DURATION = 2000;

class Toast {
  constructor(opts) {
    this.dataObj = {
      toastMessage: '',
      visible: null
    };
    this.page = opts.page;
    this.setDataFunc = null;
    this.hideToastFunc = null;

    //默认为居中
    if (opts.showCenterInWindow === undefined) {
      opts.showCenterInWindow = true;
    }
    this.showCenterInWindow = !!opts.showCenterInWindow;
    this.showDuration = opts.showDuration || DEFAULT_SHOW_DURATION;

    // fixed布局中的top值
    this.topValueInFixedPositon = opts.topValueInFixedPositon;

    this.dataObj.showCenterInWindow = this.showCenterInWindow;
    this.dataObj.topValueInFixedPositon = this.topValueInFixedPositon;
    if (opts) {
      this.setDataFunc = opts.setDataFunc;
    }

  }

  setText(text) {
    if (text) {
      this.dataObj.toastMessage = text.toString();
      if (this.setDataFunc) {
        this.setDataFunc(this.dataObj);
      }
    }
    return this;
  }

  show(opts) {
    opts = opts || {};
    this.hideToastFunc = opts.hideToastFunc;

    // 显示的时间
    let showDuration = opts.showDuration || this.showDuration;

    this.dataObj.visible = true;
    if (opts.showCenterInWindow !== undefined) {
      this.dataObj.showCenterInWindow = opts.showCenterInWindow;
    }
    if (opts.topValueInFixedPositon) {
      this.topValueInFixedPositon = opts.topValueInFixedPositon;
      this.dataObj.topValueInFixedPositon = opts.topValueInFixedPositon;
    } else {
      this.topValueInFixedPositon = null;
      this.dataObj.topValueInFixedPositon = null;
    }

    if (this.setDataFunc) {
      this.setDataFunc(this.dataObj);
    }
    setTimeout(() => this.hide(), showDuration);
  }

  hide() {
    this.dataObj.showCenterInWindow = this.showCenterInWindow;
    this.dataObj.visible = false;
    if (this.setDataFunc) {
      this.setDataFunc(this.dataObj);
    }
    if (this.page && this.page.data && typeof this.hideToastFunc === 'function') {
      this.hideToastFunc();
      this.hideToastFunc = null;
    }
  }

}
export default Toast;
