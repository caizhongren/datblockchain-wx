var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    register: {
      matingType:1,
      sowEarNotch: undefined,
      sowEarTag:undefined,
      boarEarNotch:undefined,
      boarEarTag:undefined,
      matingTime: util.formatTimeDate(new Date()),
      sowId:undefined,
      boarId:undefined
    },
    isQuick:true,
    matingCheck:0
  },
  //母猪耳缺
  bindinputSowEarNotch(event){
    let register = this.data.register;
    register.sowEarNotch = event.detail.value;
    this.setData({
      register: register
    });
  },
  //公猪耳缺
  bindinputBoarEarNotch(event) {
    let register = this.data.register;
    register.boarEarNotch = event.detail.value;
    this.setData({
      register: register
    });
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    let register = this.data.register;
    register.matingTime = e.detail.value;
    this.setData({
      register: register
    })
  },
  //配种类型
  radioChange: function (e) {
    let radioValue = e.detail.value;
    //切换显示
    let register = this.data.register;
    register.matingType = radioValue;
    this.setData({
      register: register
    })
  },
  //页面查询猪信息
  getMatingDetail() {
    let that = this;
    util.request(api.DetailExcellentPig, { sowId: that.data.sowId,boarId:that.data.boarId }).then(function (res) {
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
 
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.boarId && options.boarId != 0) {
      if(options.sowId && options.sowId != 0){
        let register = this.data.register;
        register.sowId = options.sowId;
        register.boarId = options.boarId;
        this.setData({
          register: register,
          isQuick:false
        })
        //this.getMatingDetail();
      }
    }
  },
  onReady: function () {

  },
  //取消
  cancelAddress(){
    wx.navigateBack();
  },
  //耳缺扫一扫
  earTabAdd(event){
    console.log(event.currentTarget.dataset.value);
    let name = event.currentTarget.dataset.value;
    let that = this;
    wx.scanCode({
      success: (res) => {
        let scanValue = res.result;
        util.request(api.QrCodeCheck, { url: scanValue,type:'check'}, 'POST').then(function (res) {
          //校验url是否合法
          //校验二维码是否已绑定
          let register = that.data.register;
          if (res.errno === 0) {
            if (name == 'sow'){
              register.sowEarTag = res.data;
            }
            if(name == 'boar'){
              register.boarEarTag = res.data;
            }
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
  //配种族谱检查
  matingCheckFun(){
    let that = this;
    let register = this.data.register;
    if (this.isEmpty(register.sowId) && this.isEmpty(register.sowEarNotch) && this.isEmpty(register.sowEarTag)) {
      util.showErrorToast('请输入母猪耳缺或耳标信息');
      return false;
    }

    if (this.isEmpty(register.boarId) && this.isEmpty(register.boarEarNotch) && this.isEmpty(register.boarEarTag)) {
      util.showErrorToast('请输入公猪耳缺或耳标信息');
      return false;
    }
    util.request(api.ExcellentPigMatingCheck, {
      sowId: register.sowId,
      sowEarNotch: register.sowEarNotch,
      sowEarTag: register.sowEarTag,
      boarId: register.boarId,
      boarEarNotch: register.boarEarNotch,
      boarEarTag: register.boarEarTag,
      matingType: register.matingType,
      matingTime: register.matingTime.replace('T00:00:00', '') + "T00:00:00"
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          matingCheck: res.data
        })
      }
    });
  },
  //保存
  saveAddress(){
    let register = this.data.register;
    let data = this.data;
    if (register.sowId == '' && register.sowEarNotch == '' && register.sowEarTag == '' ) {
      util.showErrorToast('请输入母猪耳缺或耳标信息');
      return false;
    }

    if (register.boarId == '' && register.boarEarNotch == '' && register.boarEarTag == '' ) {
      util.showErrorToast('请输入公猪耳缺或耳标信息');
      return false;
    }

    if (register.matingTime == '') {
      util.showErrorToast('请选择配种日期');
      return false;
    }
    console.log(data.matingCheck);
    if (data.matingCheck == 0){
      util.showErrorToast('请进行族谱检查');
      return false;
    }
    if (data.matingCheck == 2) {
      util.showErrorToast('请变更种猪信息');
      return false;
    }
    let that = this;
    util.request(api.ExcellentPigMatingAdd, { 
      sowId: register.sowId,
      sowEarNotch: register.sowEarNotch,
      sowEarTag: register.sowEarTag,
      boarId: register.boarId,
      boarEarNotch: register.boarEarNotch,
      boarEarTag: register.boarEarTag,
      matingType: register.matingType,
      matingTime: register.matingTime.replace('T00:00:00', '') +"T00:00:00"
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

  },
  isEmpty(data){
    if(data == '' || data == undefined){
      return true;
    }else{
      return false;
    }
  }
  
})