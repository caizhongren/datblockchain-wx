const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    powers: []
  },
  onShareAppMessage: function () {
    return {
      title: 'blackPig360',
      desc: '涪陵黑猪',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          powers: res.data.powers
        });
      }
    });
  },
  onLoad: function (options) {
      //this.getIndexData();
    // if (app.globalData.hasLogin) {
    // } else {
    //   wx.navigateTo({ url: "/pages/auth/login/login" });
    // }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // if (!app.globalData.hasLogin){
    //   console.log("index跳转到微信登陆");
    //   wx.navigateTo({ url: "/pages/auth/wxLogin/login" });
    // }
    user.checkLogin().then(res => {
      console.log("index判断已登录");
    }).catch(() => {
      console.log("index跳转到微信登陆");
      wx.navigateTo({ url: "/pages/auth/wxLogin/login" });
    });
    let power = wx.getStorageSync('power');
    if(power){
      this.getIndexData();
    }else{
      wx.navigateTo({ url: "/pages/auth/login/login" });
    }
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
