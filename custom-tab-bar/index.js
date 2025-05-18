Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/roulette-list/index",
        text: "列表",
        iconPath: "/pages/image/icon_component.png",
        selectedIconPath: "/pages/image/icon_component_HL.png",
      },
      {
        pagePath: "/pages/yunqiwang/index",
        text: "抽",
        iconPath: "/pages/image/icon_component.png",
        selectedIconPath: "/pages/image/icon_component_HL.png",
      },
      {
        pagePath: "/pages/liebiao/index",
        text: "更多",
        iconPath: "/pages/image/icon_component.png",
        selectedIconPath: "/pages/image/icon_component_HL.png",
      }
    ]
  },
  methods: {
    onTabChange(e) {
      const { pagePath } = e.detail.item;
      this.setData({
        selected: e.detail.index
      });
      wx.switchTab({ url: pagePath });
    },
    onShow() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({ selected: 0 });
      }
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
}) 