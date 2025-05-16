Component({
  data: {
    selected: 0,
    color: "#888888",
    selectedColor: "#0052d9",
    list: [
      {
        pagePath: "/pages/roulette-list/index",
        text: "列表",
        iconPath: "/assets/tabbar/list.png",
        selectedIconPath: "/assets/tabbar/list_selected.png"
      },
      {
        pagePath: "/pages/yunqiwang/index",
        text: "抽",
        iconPath: "/assets/tabbar/draw.png",
        selectedIconPath: "/assets/tabbar/draw_selected.png"
      },
      {
        pagePath: "/pages/more/index",
        text: "更多",
        iconPath: "/assets/tabbar/more.png",
        selectedIconPath: "/assets/tabbar/more_selected.png"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({ selected: data.index })
    }
  }
}) 