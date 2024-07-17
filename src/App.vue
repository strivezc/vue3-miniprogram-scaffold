<script>
  export default {
    onLaunch: function () {
      console.log('App Launch');
    },
    onShow: function () {
      console.log('App Show');
    },
    onHide: function () {
      console.log('App Hide');
    },
  };
</script>

<style lang="scss">
  /* 全局样式 */
  .tabbar-item-text {
    color: #333; /* 修改文字颜色为黑色 */
  }

  @import './wxcomponents/vant/common/index.wxss';
  /*每个页面公共css */
  @import './styles/public.scss';
  @import './styles/animate.min.css';
</style>
