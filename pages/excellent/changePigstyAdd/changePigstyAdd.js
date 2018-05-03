var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    register: {},
    pigId:undefined,
    columnCode:undefined
  },
  
  //页面查询猪信息
  getMatingDetail() {
    let that = this;
    util.request(api.DetailExcellentPig, { id: that.data.pigId }).then(function (res) {
      if (res.errno === 0) {
        if(res.data){
            that.TimeFormat(res.data);
            that.setData({
              register: res.data
            });
        }
      }
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.pigId && options.pigId != 0) {
      this.setData({
        pigId: options.pigId
      })
      this.getMatingDetail();
    }
  },
  onReady: function () {

  },
  bindIsColumnCode(event) {
    this.setData({
      columnCode: event.detail.value
    });
  },
  //取消
  cancelAddress(){
    wx.navigateBack();
  },
  //保存
  saveAddress(){
    let data = this.data;
    let register = this.data.register;
    if (this.isEmpty(data.columnCode)) {
      util.showErrorToast('请目标栏号');
      return false;
    }
    util.request(api.ChangeCCExcellentPig, { 
      id: data.pigId,
      pigStatus: register.pigStatus,
      columnCode: data.columnCode
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
  },
  TimeFormat(data) {
    if (data) {
      if (data.birth) {
        data.birth = data.birth.split("T")[0];
      } else {
        data.birth = "--";
      }
    }
  },
  
})