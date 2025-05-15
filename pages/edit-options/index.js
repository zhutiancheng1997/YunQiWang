Page({
  data: {
    title: '',
    options: ['']
  },
  onTitleInput(e) {
    this.setData({ title: e.detail.value })
  },
  onOptionInput(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    const options = this.data.options.slice()
    options[index] = value
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
  }
})
