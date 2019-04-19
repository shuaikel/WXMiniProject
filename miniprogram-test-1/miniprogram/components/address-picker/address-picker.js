import { area } from '../../common/area.js';
let deep1List = [], deep2List = [], deep3List = [];

area.RECORDS.forEach(item => {
  switch (item.area_deep) {
    case '1':
      deep1List.push(item)
      break;
    case '2':
      deep2List.push(item)
      break;
    case '3':
      deep3List.push(item)
      break;
  }
})

Component({
  properties: {
    areaIds: {
      type: Array,
      value: [],
      observer(newVal) {
        if (newVal.length == 0) return false;

        let multiArray = this.data.multiArray;
        let multiIndex = [];
        deep1List.forEach((item, index) => {
          if (item.area_id == newVal[0]) {
            multiIndex[0] = index
          }
        })
        multiArray = this.getCity(multiArray, multiIndex[0]);
        for (let i = 0; i < multiArray[1].length; i++) {
          if (multiArray[1][i].area_id == newVal[1]) {
            multiIndex[1] = i
            break;
          }
        }
        multiArray = this.getArea(multiArray, multiIndex[1]);
        for (let i = 0; i < multiArray[2].length; i++) {
          if (multiArray[2][i].area_id == newVal[2]) {
            multiIndex[2] = i
            break;
          }
        }

        this.setData({
          multiIndex,
          multiArray,
          selected: true
        }, () => {
          let areaObj = this.getSelectedObj();
          this.page.setData({
            areaObj: areaObj
          })
        })
      }
    }
  },
  data: {
    multiArray: [deep1List, [], []],
    multiIndex: [0, 0, 0],
    selected: false,
  },
  attached() {
    const pages = getCurrentPages();
    this.page = pages[pages.length - 1];
    let multiArray = this.data.multiArray;
    multiArray = this.getCity(multiArray, 0);
    multiArray = this.getArea(multiArray, 0);
    this.setData({
      multiArray
    })
  },
  methods: {
    getCity(multiArray, index) {
      let cityList = [],
        province = multiArray[0][index];
      deep2List.forEach(item => {
        if (item.area_parent_id == province.area_id) {
          cityList.push(item)
        }
      })
      multiArray[1] = cityList;
      return multiArray
    },
    getArea(multiArray, index) {
      let areaList = [],
        city = multiArray[1][index];
      deep3List.forEach(item => {
        if (item.area_parent_id == city.area_id) {
          areaList.push(item)
        }
      })
      multiArray[2] = areaList;
      return multiArray
    },
    bindMultiPickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      let areaObj = this.getSelectedObj();
      console.log(areaObj)
      this.setData({
        selected: true,
        multiIndex: e.detail.value
      })
      this.page.setData({
        areaObj: areaObj
      })
    },

    bindMultiPickerColumnChange(e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
      const data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      }
      data.multiIndex[e.detail.column] = e.detail.value
      switch (e.detail.column) {
        case 0:
          //修改了省份
          data.multiArray = this.getCity(data.multiArray, e.detail.value);
          data.multiIndex[1] = 0;
          data.multiArray = this.getArea(data.multiArray, 0);
          data.multiIndex[2] = 0;
          break
        case 1:
          //修改了市
          data.multiArray = this.getArea(data.multiArray, e.detail.value);
          data.multiIndex[2] = 0;
          break
      }
      this.setData(data)
    },

    getSelectedObj() {
      let multiIndex = this.data.multiIndex,
        multiArray = this.data.multiArray;
      let selected = {
        province: multiArray[0][multiIndex[0]],
        city: multiArray[1][multiIndex[1]],
        area: multiArray[2][multiIndex[2]]
      };
      return selected
    },
  }
});