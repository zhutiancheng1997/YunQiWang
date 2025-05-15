const app = getApp()
// const prizeImg = {
//   src: 'https://en.wikipedia.org/wiki/Cat#/media/File:Cat_August_2010-4.jpg',
//   width: '50%',
//   top: '25%'
// }
Page({
  data: {
    containerHeight: 0,
    containerWidth: 0,
    width: 300,
    height: 300,
    // 背景 blocks
    blocks: [
      { padding: '10px', background: '#F5F5F5' }, // 浅灰背景
      { padding: '10px', background: '#2E7DFF' } // 科技蓝主色
    ],
    // 九宫格奖品，需指定 x, y
    prizes: [
      {
        x: 0, y: 0,
        fonts: [{ text: '谢谢参与', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://pica.zhimg.com/v2-6067c0140199c6cf5960b34b90376f0c_1440w.jpg', width: '80%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 1, y: 0,
        fonts: [{ text: '1元红包', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 2, y: 0,
        fonts: [{ text: '一包辣条', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 2, y: 1,
        fonts: [{ text: '5元红包', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 2, y: 2,
        fonts: [{ text: '可乐可乐', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 1, y: 2,
        fonts: [{ text: '雪碧雪碧', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 0, y: 2,
        fonts: [{ text: '卫龙卫龙', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      },
      {
        x: 0, y: 1,
        fonts: [{ text: '谢谢参与', top: '60%', fontColor: '#333333' }],
        imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }],
        background: '#F5F5F5'
      }
    ],
    // 九宫格中间按钮
    buttons: [
      {
        x: 1, y: 1,
        background: '#2E7DFF', // 科技蓝按钮
        fonts: [{ text: '抽奖', top: '40%', fontColor: '#fff' }]
      }
    ],
    activeStyle: {
      fontColor: '#f9bdbd',
      background: '#9c9cdd'
    },
    defaultStyle: {
      background: '#F5F5F5',
      fontColor: '#333333'
    }
  },
  onLoad() {
    this.initContainer();
  },

  initContainer() {
    const that = this;
    wx.getSystemInfo({
      success(res) {
        const screenWidth = res.windowWidth; // 获取屏幕宽度
        const containerWidth = screenWidth * 0.9; // 假设宽度占屏幕的70%
        const containerHeight = (containerWidth * 4) / 3; // 高宽比4:3
  
        // 如果高度超过屏幕高度的70%，则重新计算
        if (containerHeight > res.windowHeight * 0.7) {
          const containerHeight = res.windowHeight * 0.7;
          const containerWidth = (containerHeight * 3) / 4;
          that.setData({
            containerHeight: containerHeight,
            containerWidth: containerWidth
          });
        } else {
          that.setData({
            containerHeight: containerHeight,
            containerWidth: containerWidth
          });
        }
      }
    });
  },
  start() {
    const child = this.selectComponent('#myLucky')
    if (!child) {
      wx.showToast({ title: '组件未找到', icon: 'none' })
      return
    }
    child.lucky.play()
    setTimeout(() => {
      // 随机中奖索引
      const index = Math.floor(Math.random() * this.data.prizes.length)
      child.lucky.stop(index)
    }, 3000)
  },
  end(event) {
    wx.showToast({
      title: '恭喜你获得: ' + (event.detail && event.detail.fonts ? event.detail.fonts[0].text : ''),
      icon: 'none',
      duration: 2000,
      mask: true
    })
    // 可在这里加高亮动画等金色高亮效果
    console.log('中奖详情', event.detail)
  }
})
