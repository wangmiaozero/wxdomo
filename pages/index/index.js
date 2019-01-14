const fetch =require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slides:[],
    categories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //     url:'https://api.douban.com/v2/movie/coming_soon',
    //     header:{
    //         'Content-Type':'json'
    //     },
    //     success:function(result){
    //         console.log(result)
    //     }
    // })
    
       fetch('slides').then(res=>{
           this.setData({slides:res.data})
       })

       fetch('categories').then(res=>{
        this.setData({categories:res.data})
    })
   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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