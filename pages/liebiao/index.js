Page({
    data: {
      title: "休息多长时间",
      options: [
        { text: "5分钟", selected: false, weight: 1, color: "#ff6b81" },
        { text: "半小时", selected: false, weight: 1, color: "#ff8ea9" },
        { text: "15分钟", selected: false, weight: 1, color: "#a67bff" },
        { text: "两小时", selected: false, weight: 1, color: "#d6a2ff" },
        { text: "不限时", selected: false, weight: 1, color: "#fbc2eb" },
        { text: "再转一次", selected: false, weight: 1, color: "#fbc2eb" },
        { text: "不休息", selected: false, weight: 1, color: "#fbc2eb" },
        { text: "10秒", selected: false, weight: 1, color: "#fbc2eb" }
      ]
    },
  
    // 选择选项
    selectOption(e) {
      const index = e.currentTarget.dataset.index;
      let options = this.data.options;
      
      options.forEach((item, i) => {
        item.selected = i === index;
        item.color = i === index ? "#ff6b81" : "#fbc2eb";
      });
      
      this.setData({ options });
    },
  
    // 添加新选项
    addOption() {
      const options = this.data.options;
      const newOption = {
        text: `新选项${options.length + 1}`,
        selected: false,
        weight: 1,
        color: "#fbc2eb"
      };
      
      options.push(newOption);
      this.setData({ options });
    },
  
    // 批量添加选项
    batchAddOptions() {
      wx.showModal({
        title: '批量添加选项',
        content: '请输入以逗号分隔的选项列表',
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            const newOptions = res.content.split(',').map(item => ({
              text: item.trim(),
              selected: false,
              weight: 1,
              color: "#fbc2eb"
            }));
            
            this.setData({
              options: [...this.data.options, ...newOptions]
            });
          }
        }
      });
    },
  
    // 保存转盘
    saveWheel() {
      if (!this.data.title) {
        wx.showToast({
          title: '请输入转盘标题',
          icon: 'none'
        });
        return;
      }
      
      if (this.data.options.length < 2) {
        wx.showToast({
          title: '至少需要2个选项',
          icon: 'none'
        });
        return;
      }
      
      // 保存逻辑...
      wx.showToast({
        title: '转盘已保存',
        icon: 'success'
      });
    }
  })