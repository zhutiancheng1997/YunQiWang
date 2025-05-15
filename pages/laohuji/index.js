const app = getApp()
Page({
  data: {
    // 背景 blocks
    blocks: [
      {
        borderRadius: 20,
        background: '#869cfa',
        padding: '10px'
      },
      {
        borderRadius: 20,
        background: '#e9e8fe',
        padding: '10px'
      }
    ],
    // 奖品 prizes
    prizes: [
      {
        borderRadius: 20,
        background: '#fff7a2',
        fonts: [
          {
            text: '6',
            top: '15%',
            fontColor: '#333',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 'bold',
            lineHeight: '32px',
            wordWrap: 'break-word',
            lengthLimit: 2,
            lineClamp: 1
          }
        ]
      },
      {
        borderRadius: 20,
        background: '#b8c5f2',
        fonts: [
          {
            text: '9',
            top: '15%',
            fontColor: '#333',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 'bold',
            lineHeight: '32px',
            wordWrap: 'break-word',
            lengthLimit: 2,
            lineClamp: 1
          }
        ]
      }
    ],
    // 插槽 slots
    slots: [
      { order: [1, 0, 1], speed: 30, direction: 1 },
      { order: [1, 0, 1], speed: 30, direction: 1 },
      { order: [0, 1, 0], speed: 30, direction: 1 }
    ],
    // 默认样式
    defaultStyle: {
      borderRadius: 20,
      background: '#bac5ee',
      fontColor: '#333',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: '32px',
      wordWrap: 'break-word',
      lengthLimit: 2,
      lineClamp: 1
    },
    // 默认配置
    defaultConfig: {
      rowSpacing: '25px',
      colSpacing: '10px',
      mode: 'vertical',
      direction: 1,
      speed: 30,
      accelerationTime: 250,
      decelerationTime: 250
    },
    buttons: [
      { radius: '50px', background: '#617df2' },
      { radius: '45px', background: '#afc8ff' },
      {
        radius: '40px', background: '#869cfa',
        pointer: true,
        fonts: [{ text: '开始\n抽奖', top: '-20px' }]
      },
    ],
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
    // 中奖奖品详情
    wx.showToast({
      title: '中奖: ' + (event.detail && event.detail.fonts ? event.detail.fonts[0].text : ''),
      icon: 'none'
    })
    console.log('中奖详情', event.detail)
  }
})
