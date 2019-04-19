
Component({
  properties: {
    num: {
      type: Number,
      value: 1,
    },
    max: {
      type: Number,
      value: 1,
    },
    min: {
      type: Number,
      value: 1,
    },
    changeObjText: {
      type: String,
      value: ''
    }
  },
  attached() {
    const pages = getCurrentPages();
    this.page = pages[pages.length - 1];
  },
  methods: {
    inputNum(e) {
      let num = parseInt(e.detail.value);
      this.changeNum(num)
    },
    changeNum(num) {
      let max = this.properties.max,
        min = this.properties.min;
      if (num > max) {
        this.page.$showToast('最多只能选择' + max + '项哦')
        num = max
      }
      if (num < min) {
        this.page.$showToast('最少得选择' + min + '项哦')
        num = min
      }
      this.triggerEvent('change', {
        num: num
      })
    },
    reduce() {
      let num = this.properties.num - 1
      this.changeNum(num)
    },
    add() {
      let num = this.properties.num + 1
      this.changeNum(num)
    }
  }
});