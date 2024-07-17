<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url: '',
      };
    },
    onLoad: function (options) {
      this.url = decodeURIComponent(options.url)
      const title = decodeURIComponent(options.title)
      console.log(this.url, 'url')
      if (title) {
        uni.setNavigationBarTitle({
          title
        })
      }

    },
  };
</script>
