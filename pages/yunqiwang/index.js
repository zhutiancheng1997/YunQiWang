const app = getApp()
Page({
  data: {
    mode: 'wheel', // 'wheel' 或 'slot'
    showMenu: false,
    wheel_data: {
      blocks: [
        { padding: '10px', background: '#2E7DFF' }
      ],
      prizes: [
        { background: '#fff7a2', fonts: [{ text: '一等奖' }] },
        { background: '#b8c5f2', fonts: [{ text: '二等奖' }] },
        { background: '#ffd6b6', fonts: [{ text: '三等奖' }] },
        { background: '#b6ffd7', fonts: [{ text: '谢谢参与' }] }
      ],
      buttons: [
        { radius: '50px', background: '#2E7DFF', fonts: [{ text: '开始', fontColor: '#fff' }] }
      ]
    },
    slot_data: {
      blocks: [
        { padding: '10px', background: '#869cfa' },
        { padding: '10px', background: '#e9e8fe' }
      ],
      prizes: [
        { fonts: [{ text: '6', top: '15%' }] },
        { fonts: [{ text: '9', top: '15%' }] }
      ],
      slots: [
        { order: [1, 0, 1], speed: 30, direction: 1 },
        { order: [1, 0, 1], speed: 30, direction: 1 },
        { order: [0, 1, 0], speed: 30, direction: 1 }
      ],
      defaultStyle: {
        background: '#bac5ee',
        fontSize: '32px',
        fontColor: '#333'
      },
      defaultConfig: {
        rowSpacing: '25px',
        colSpacing: '10px',
        mode: 'vertical',
        direction: 1,
        speed: 30,
        accelerationTime: 250,
        decelerationTime: 250
      }
    },
    grid_data: {
      blocks: [
        { padding: '10px', background: '#F5F5F5' },
        { padding: '10px', background: '#2E7DFF' }
      ],
      prizes: [
        { x: 0, y: 0, fonts: [{ text: '谢谢参与', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://pica.zhimg.com/v2-6067c0140199c6cf5960b34b90376f0c_1440w.jpg', width: '80%', top: '15%' }], background: '#F5F5F5' },
        { x: 1, y: 0, fonts: [{ text: '1元红包', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' },
        { x: 2, y: 0, fonts: [{ text: '一包辣条', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' },
        { x: 2, y: 1, fonts: [{ text: '5元红包', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' },
        { x: 2, y: 2, fonts: [{ text: '可乐可乐', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' },
        { x: 1, y: 2, fonts: [{ text: '雪碧雪碧', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' },
        { x: 0, y: 2, fonts: [{ text: '卫龙卫龙', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' },
        { x: 0, y: 1, fonts: [{ text: '谢谢参与', top: '60%', fontColor: '#333333' }], imgs: [{ src: 'https://9tuay9kz5ajucd7vwvq62v748kfq324am.png', width: '50%', top: '15%' }], background: '#F5F5F5' }
      ],
      buttons: [
        { x: 1, y: 1, background: '#2E7DFF', fonts: [{ text: '抽奖', top: '40%', fontColor: '#fff' }] }
      ],
      defaultStyle: {
        background: '#F5F5F5',
        fontColor: '#333333'
      }
    }
  },
  showMenu() {
    this.setData({ showMenu: true })
  },
  hideMenu() {
    this.setData({ showMenu: false })
  },
  chooseMode(e) {
    const mode = e.currentTarget.dataset.mode
    this.setData({ mode, showMenu: false })
  },
  switchMode() {
    this.setData({
      mode: this.data.mode === 'wheel' ? 'slot' : 'wheel'
    })
  },
  start() {
    if (this.data.mode === 'wheel') {
      const child = this.selectComponent('#myLucky')
      if (!child) {
        wx.showToast({ title: '组件未找到', icon: 'none' })
        return
      }
      child.lucky.play()
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.wheel_data.prizes.length)
        child.lucky.stop(index)
      }, 3000)
    } else if (this.data.mode === 'slot') {
      const child = this.selectComponent('#mySlot')
      if (!child) {
        wx.showToast({ title: '组件未找到', icon: 'none' })
        return
      }
      child.lucky.play()
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.slot_data.prizes.length)
        child.lucky.stop(index)
      }, 3000)
    } else if (this.data.mode === 'grid') {
      const child = this.selectComponent('#myGrid')
      if (!child) {
        wx.showToast({ title: '组件未找到', icon: 'none' })
        return
      }
      child.lucky.play()
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.grid_data.prizes.length)
        child.lucky.stop(index)
      }, 3000)
    }
  },
  end(event) {
    wx.showToast({
      title: '恭喜你获得: ' + (event.detail && event.detail.fonts ? event.detail.fonts[0].text : ''),
      icon: 'none',
      duration: 2000,
      mask: true
    })
    console.log('中奖详情', event.detail)
  },
  slotEnd(event) {
    wx.showToast({
      title: '老虎机中奖: ' + (event.detail && event.detail.fonts ? event.detail.fonts[0].text : ''),
      icon: 'none',
      duration: 2000,
      mask: true
    })
    console.log('老虎机中奖详情', event.detail)
  },
  goEdit() {
    wx.navigateTo({ url: '/pages/edit-options/index' })
  }
})