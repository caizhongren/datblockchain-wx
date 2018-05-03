var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    register: {
      id:0,
      columnCodes: undefined,
      earNotchs:undefined,
      earTags: undefined,
      vaccineCode:undefined,
      vaccine:undefined,
      selectType:4,
      vaccineTime: util.formatTimeDate(new Date())
    },
    addressId: 0,
    openSelectRegion: false,
    regionType: 1,
    regionList: [],
    selectRegionDone: false,
    varietiesIndex: undefined,
    varietiesArr: [] 
  },
  bindPickerChange: function (e) {
    let register = this.data.register;
    register.vaccine = this.data.varietiesArr[e.detail.value];
    this.setData({
      varietiesIndex: e.detail.value,
      register: register
    })
  },
  bindinputMobile(event) {
    let register = this.data.register;
    register.mobile = event.detail.value;
    this.setData({
      register: register
    });
  },
  bindinputColumnCode(event) {
    let register = this.data.register;
    register.columnCodes = event.detail.value;
    this.setData({
      register: register
    });
  },
  bindinputEarNotch(event){
    let register = this.data.register;
    register.earNotchs = event.detail.value;
    this.setData({
      register: register
    });
  },
  bindinputSource (event){
    let register = this.data.register;
    register.vaccineCode = event.detail.value;
    this.setData({
      register: register
    });
  },
  bindinputWeight(event) {
    let register = this.data.register;
    register.weight = event.detail.value;
    this.setData({
      register: register
    });
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    let register = this.data.register;
    register.vaccineTime = e.detail.value;
    this.setData({
      register: register
    })
  },
  radioChange: function (e) {
    let radioValue = e.detail.value;
    //切换显示
    // if(radioValue == 1){

    // }else if(radioValue == 2){

    // }else{

    // }
    let register = this.data.register;
    register.selectType = radioValue;
    this.setData({
      register: register
    })
  },
  bindIsDefault(){
    let register = this.data.register;
    register.isDefault = !register.isDefault;
    this.setData({
      register: register
    });
  },
  getAddressDetail() {
    let that = this;
    util.request(api.DetailExcellentPig, { id: that.data.addressId }).then(function (res) {
      if (res.errno === 0) {
        if(res.data){
          console.log(res.data);
            that.setData({
              register: res.data
            });
        }
      }
    });
  },
  geDictionary() {
    let that = this;
    util.request(api.GetDictionary, { dictionaryId: 2 }).then(function (res) {
      if (res.errno === 0) {
        if (res.data) {
          let dictdataNames = res.data;
          let register_dic = [];
          for (var i = 0; i < dictdataNames.length; i++) {
            register_dic[i] = dictdataNames[i].dictdataName;
          }
          that.setData({
            varietiesArr: register_dic
          });
        }
      }
    });
  },
  onLoad: function (options) {
    //加载字典值
    // 页面初始化 options为页面跳转所带来的参数
    this.geDictionary();
    console.log(options)
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }
  },
  onReady: function () {

  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });

  },
  cancelAddress(){
    wx.navigateBack();
  },
  //耳缺扫一扫
  earTabAdd(){
    //"结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
    let that = this;
    wx.scanCode({
      success: (res) => {
        //方案二:
        let scanValue = res.result;
        util.request(api.QrCodeCheck, { url: scanValue,type:'check'}, 'POST').then(function (res) {
          //校验url是否合法
          //校验二维码是否已绑定
          let register = that.data.register;
          if (res.errno === 0) {
            register.earTags = register.earTags ? register.earTags + (" " + res.data) : res.data;
            that.setData({
              register: register
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            // register.earTags = undefined;
            // that.setData({
            //   register: register
            // })
            wx.showToast({
              title: res.errmsg,
              icon: 'loading',
              duration: 2000
            })
          }
        });
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },
  saveAddress(){
    console.log(this.data.register)
    let register = this.data.register;
    if (register.columnCodes == '') {
      util.showErrorToast('请输入栏号');

      return false;
    }
    if (register.earNotchs == '') {
      util.showErrorToast('请输入耳缺');

      return false;
    }
    
    // if (register.vaccineCode == '') {
    //   util.showErrorToast('请输入疫苗编号');
    //   return false;
    // }


    if (register.vaccine == 0) {
      util.showErrorToast('请选择疫苗');
      return false;
    }

    if (register.vaccineTime == '') {
      util.showErrorToast('请选择时间');
      return false;
    }

    let that = this;
    util.request(api.ExcellentVaccineAdd, { 
      id: register.id,
      columnCodes: register.columnCodes,
      earNotchs: register.earNotchs,
      vaccineCode: register.vaccineCode,
      vaccine: register.vaccine,
      selectType: register.selectType,
      vaccineTime: register.vaccineTime.replace('T00:00:00', '') +"T00:00:00"
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.navigateBack();
      }
    });

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
  
})