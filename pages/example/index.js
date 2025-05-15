const app = getApp()
Page({
  data: {
    blocks: [{ padding: '10px', background: '#869cfa' }],
    prizes: [
      { background: '#afc8ff', fonts: [{ text: '奖品1', rotate: true, fontStyle: 'radial' }] },
      { background: '#fff7a2', fonts: [{ text: '奖品2', rotate: true, fontStyle: 'radial' }] },
      { background: '#ffb6b6', fonts: [{ text: '奖品3', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6ffd7', fonts: [{ text: '奖品4', rotate: true, fontStyle: 'radial' }] },
      { background: '#ffd6b6', fonts: [{ text: '奖品5', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品6', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品7', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品8', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品9', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品10', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品11', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品12', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品13', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品14', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品15', rotate: true, fontStyle: 'radial' }] },
      { background: '#b6d7ff', fonts: [{ text: '奖品16', rotate: true, fontStyle: 'radial' }] },
      
    ],
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
  start () {
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    
    // 调用play方法开始旋转
    child.lucky.play()
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引 (随机抽奖)
      const index = Math.floor(Math.random() * this.data.prizes.length)
      console.log(index)
      // 调用stop方法然后缓慢停止
      child.lucky.stop(index)
    }, 3000)
  },
  end (event) {
    // 中奖奖品详情
    console.log(event.detail)
  },
  onSuccess(e) {
    // 中奖回调
  },
  onError(e) {
    // 错误回调
  }
})