var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    vaccineList: [],
    page: 1,
    size: 10,
    totalPages: 1,
    total: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // if (this.data.page == 1) {
    //   this.getAddressList();
    // }
    //this.getAddressList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    // if (this.data.page == 1) {
    //   return;
    // }
    this.setData({
      page: 1
    });
    this.getAddressList();
  },
  getAddressList() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.ListExcellentVaccine, { page: that.data.page, size: that.data.size }).then(function (res) {
      if (res.errno === 0) {
        that.TimeFormat(res.data.vaccineList);
        that.setData({
          vaccineList: that.data.vaccineList.concat(res.data.vaccineList),
          totalPages: res.data.totalPages,
          total: res.data.total
        });
      }
      wx.hideLoading();
    });
  },
  //下拉刷新
  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      return false;
    }

    this.getAddressList();
  },
  vaccineAddOrUpdate (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/excellent/vaccineAdd/vaccineAdd?id=' + event.currentTarget.dataset.addressId
    })
  },
  deleteAddress(event){
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除种猪？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.ExcellentPigDelete, { id: addressId }, 'POST').then(function (res) {
            if (res.errno === 0) {
              that.getAddressList();
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;
  },
  TimeFormat(data){
    if(data){
      for(let i in data){
        if(data[i].vaccineTime){
          data[i].vaccineTime = data[i].vaccineTime.replace('T00:00:00', '');
        }
      }
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})