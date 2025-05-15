Page({
  data: {
    currentTab: 'hot',
    hotRoulettes: [
      { id: 1, title: '喝什么奶茶' },
      { id: 2, title: '午餐吃什么' }
    ],
    myRoulettes: [
      { id: 3, title: '选数字（从1到6）' },
      { id: 4, title: '大鸟转转转' }
    ]
  },
  onTabChange(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab });
  },
  onCreateRoulette() {
    wx.navigateTo({ url: '/pages/roulette-detail/index' });
  },
  onShare(e) {
    wx.showToast({ title: '分享功能待实现', icon: 'none' });
  },
  onEdit(e) {
    wx.navigateTo({ url: `/pages/roulette-detail/index?id=${e.currentTarget.dataset.id}` });
  },
  onDelete(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除该转盘吗？',
      success: (res) => {
        if (res.confirm) {
          const id = e.currentTarget.dataset.id;
          let listKey = this.data.currentTab === 'hot' ? 'hotRoulettes' : 'myRoulettes';
          let newList = this.data[listKey].filter(item => item.id !== id);
          this.setData({ [listKey]: newList });
        }
      }
    });
  },
  gotoExample: function() {
    wx.navigateTo({
      url: '/pages/example/index'
    })
  },
  gotoLaohuji: function() {
    wx.navigateTo({
      url: '/pages/laohuji/index'
    })
  },
  gotoJiugongge: function() {
    wx.navigateTo({
      url: '/pages/jiugongge/index'
    })
  }
}); 