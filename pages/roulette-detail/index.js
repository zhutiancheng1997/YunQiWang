var app = getApp()
Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    showRecordModal: false,   // 控制弹窗显示
    recordList: []            // 中奖记录数组
  },
  gotoList: function() {
    // 读取中奖记录
    var winAwards = wx.getStorageSync('winAwards') || {data: []};
    this.setData({
      showRecordModal: true,
      recordList: winAwards.data
    });
  },
  closeRecordModal: function() {
    this.setData({
      showRecordModal: false
    });
  },
  getLottery: function () {
    var that = this
    var awardsConfig = app.awardsConfig,
        runNum = 8
    var awards = awardsConfig.awards
    var awardIndex = Math.random() * awards.length >>> 0;
    console.log(awardIndex)

    // 初始化 rotate
  /*  var animationInit = wx.createAnimation({
      duration: 10
    })
    this.animationInit = animationInit;
    animationInit.rotate(0).step()
    this.setData({
      animationData: animationInit.export(),
      btnDisabled: 'disabled'
    })*/

    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / awards.length))
    console.log('deg', app.runDegs)

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

     // 记录奖品
    var winAwards = wx.getStorageSync('winAwards') || {data:[]}
    winAwards.data.push({
      name: awardsConfig.awards[awardIndex].name + '1个',
      time: new Date().toLocaleString()
    });
    wx.setStorageSync('winAwards', winAwards)

    // 中奖提示
    setTimeout(function() {
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })
      if (awardsConfig.chance) {
        that.setData({
          btnDisabled: ''
        })  
      }
    }, 4000);
    

    /*wx.request({
      url: '../../data/getLottery.json',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log(data)
      },
      fail: function(error) {
        console.log(error)
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })*/
  },
  onReady: function (e) {

    var that = this;

    // getAwardsConfig
    app.awardsConfig = {
      chance: true,
      awards:[
        {'index': 0, 'name': '1元红包'},
        {'index': 1, 'name': '5元话费'},
        {'index': 2, 'name': '6元红包'},
        {'index': 3, 'name': '8元红包'},
        {'index': 4, 'name': '10元话费'},
        {'index': 5, 'name': '10元红包'},
        {'index': 6, 'name': '11元红包'},
        {'index': 7, 'name': '12元红包'},
        {'index': 8, 'name': '13元红包'},
        {'index': 9, 'name': '14元红包'},
        {'index': 10, 'name': '15元红包'},
        {'index': 11, 'name': '16元红包'},
        {'index': 12, 'name': '17元红包'},
        {'index': 13, 'name': '18元红包'},
      ]
    }
    
    // 彩色数组
    var sectorColors = [
      '#FFB800', '#FF5722', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63', '#00BCD4', '#8BC34A', '#FFC107', '#FF9800', '#795548', '#607D8B', '#3F51B5', '#CDDC39'
    ];
    // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))
    

    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
        len = awardsConfig.length,
        rotateDeg = 360 / len / 2 + 90,
        html = [],
        turnNum = 1 / len  // 文字旋转 turn 值
    that.setData({
      btnDisabled: app.awardsConfig.chance ? '' : 'disabled'  
    })
    var ctx = wx.createContext()
    for (var i = 0; i < len; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(150, 150);
      ctx.moveTo(0, 0);
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI/180);
      ctx.arc(0, 0, 150, 0,  2 * Math.PI / len, false);
      ctx.setFillStyle(sectorColors[i % sectorColors.length]);
      ctx.fill();
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('red');
      ctx.stroke();
      ctx.restore();
      html.push({turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name, color: sectorColors[i % sectorColors.length]});    
    }
    that.setData({
        awardsList: html
      });
    
    // wx.drawCanvas({
    //   canvasId: 'lotteryCanvas',
    //   actions: ctx.getActions()
    // })
  },
  deleteRecord: function(e) {
    const index = e.currentTarget.dataset.index;
    let recordList = this.data.recordList;
    recordList.splice(index, 1);
    this.setData({ recordList });
    wx.setStorageSync('winAwards', { data: recordList });
  }
}) 