// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    data:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const messages = this.data.messages
    const data=this.data.data
    let caipu= new Promise((resolve,reject)=>{
      wx.request({
        // url:"http://apis.juhe.cn/cook/query.php?menu=红烧肉&key=fd075da6f7c344cbbb8948ce659312ff&dtype=json",
        url:"http://apis.juhe.cn/cook/query.php?menu=沙拉&key=fd075da6f7c344cbbb8948ce659312ff&dtype=json",
        data:data,
        success:resolve,
        fail:reject
      })
    })
    caipu.then(res =>{
     this.setData({data:res.data})
     // console.log(res.data.result.data)
       for (var i = 0; i < res.data.result.data.length; i++) {
        res.data.result.data.forEach(element => {
          messages.push({
            title: element.title,
            date: element.tags,
            image: element.albums,
            summary: element.ingredients,
            burden:element.burden            
          })
        });
        this.setData({
          messages
        })
    }
   
    })
 
    
    // for (var i = 0; i < 10; i++) {
    //   messages.push({
    //     title: '免费送票!超有内涵的门票.',
    //     date: i + 'September',
    //     image: 'https://unsplash.it/400/300',
    //     summary: '最糟糕的,也许就是最幸运的'
    //   })
    // }
    // this.setData({
    //   messages
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
    // query.exec(res => wx.pageScrollTo({scrollTop:res[0].top+200}))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})