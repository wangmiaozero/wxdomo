const fetch = require('../../utils/fetch')
function fecth1(val){
  return new Promise((resolve,reject)=>{
    wx.request({
      url:`http://apis.juhe.cn/cook/query.php?menu=${val}&key=fd075da6f7c344cbbb8948ce659312ff`,
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    foo:null,
    category: null,
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    hasMore: true,
  },
 
  loadMore () {
    let { pageIndex, pageSize, searchText } = this.data
    const params = { _page: ++pageIndex, _limit: pageSize }
    if (searchText) params.q = searchText
    return fetch(`categories/${this.data.category.id}/shops`, params)
      .then(res => {
        //console.log(this.data.category)
        //拿到响应头 条数  转换数字
        const totalCount = parseInt(res.header['X-Total-Count'])
        //                  0 * 20 < 80
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
          //连接字符数据

         const shops = this.data.shops.concat(res.data)
        //console.log(shops)
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch(`categories/${options.cat}`)
      .then(res => {
      //console.log(res)
        this.setData({ category: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })
        this.loadMore()
      
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    //重新加载数据  初始化数据
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
   // 停止当前页面下拉刷新。
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    //在这里加载下一页的数据
    //需要判断是否正在加载,否则会有多次加载
    // TODO：节流
   // console.log(this.loadMore())
    this.loadMore()
  },

  searchHandle () {
    let value = this.data.searchText
    console.log(value)
    fecth1(value)
    .then(res =>{
      //console.log(res)
      this.data.shops=[]
     var  shops= res.data.result.data
     this.setData({shops})
     console.log(shops)
    })
    // this.setData({ shops: [], pageIndex: 0, hasMore: true })
  },

  showSearchHandle () {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle () {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle () {
    this.setData({ searchText: '' })
  },
  searchChangeHandle (e) {
    //console.log(e.detail.value)
     this.setData({foo: e.detail.value})
    this.setData({ searchText: e.detail.value })
  }
})
