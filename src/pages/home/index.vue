<template>
  <view class="container">
    <view class="title" :style="'padding-top:' + titleHeight + 'px'">标题</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      titleHeight: '',
    }
  },
  onLoad(query) {
    this.getHeight()
  },
  methods: {
      getHeight() {
        let res = wx.getMenuButtonBoundingClientRect();
        this.titleHeight = res.top;
      },
    },
  };
</script>

<style scode lang="scss">
  .container {
    margin: 0 31rpx;
    padding-bottom: 100rpx;
    .title {
      position: fixed;
      top: 0;
      z-index: 99;
      width: 100%;
      background: #ffffff;
      font-size: 48rpx;
      font-weight: 500;
      color: #333333;
      line-height: 64rpx;
      margin-left: -31rpx;
      padding-left: 31rpx;
    }
  }
</style>
