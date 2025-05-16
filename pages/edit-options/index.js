Page({
  data: {
    title: '',
    options: ['']
  },
  onTitleInput(e) {
    this.setData({ title: e.detail.value })
  },
  onOptionInput(e) {
    console.log('input'+ e);
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    const options = this.data.options.slice()
    options[index] = value
    console.log('options'+ options);
    this.setData({ options })
  },
  addOption(e) {
    const index = e.currentTarget.dataset.index
    const options = this.data.options.slice()
    options.splice(index + 1, 0, '')
    this.setData({ options })
  },
  removeOption(e) {
    const index = e.currentTarget.dataset.index
    const options = this.data.options.slice()
    if (options.length > 1) {
      options.splice(index, 1)
      this.setData({ options })
    }
  },
  onFinish() {
    const options = this.data.options.filter(item => item.trim())
    const title = this.data.title
    // 保存到本地缓存为map结构
    let wheelMap = wx.getStorageSync('wheel_map') || {}
    if (typeof wheelMap === 'string') {
      try { wheelMap = JSON.parse(wheelMap) } catch(e) { wheelMap = {} }
    }
    wheelMap[title] = options
    wx.setStorageSync('wheel_map', wheelMap)
    // 获取页面栈，回传数据
    const pages = getCurrentPages()
    if (pages.length > 1) {
      const prevPage = pages[pages.length - 2]
      if (prevPage && prevPage.setPrizeOptions) {
        prevPage.setPrizeOptions({ title, options })
      }
    }
    wx.navigateBack()
  }
})
