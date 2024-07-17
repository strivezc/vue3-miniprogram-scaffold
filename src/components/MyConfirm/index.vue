<template>
  <myPopup ref="popup" type="center" @closeAction="closeAction" :closeOnOverlay="false">
    <view class="container">
    <view class="confirm-wrap">
      <view class="title">{{title}}</view>
      <template v-if="customHtml">
        <slot name="customHtml"></slot>
      </template>
      <rich-text class="text" v-else :nodes="text" :style="{'text-align':textAlign}"></rich-text>
      <view class="button-wrap">
        <view class="left" v-if="showCancelButton" @click="close">{{cancelText}}</view>
        <view class="right" @click="submit">{{confirmText}}</view>
        <button class="shareMask" open-type="share"
                v-if="isShareButton"></button>
      </view>
    </view>
    </view>
  </myPopup>
</template>

<script>
import myPopup from '@/components/MyPopup'

export default {
  name: 'index',
  components: { myPopup },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    text: {
      type: String,
      default: '内容'
    },
    customHtml: {
      type: Boolean,
      default: false
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    isShareButton: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    textAlign: {
      type: String,
      default: 'center'
    },
  },
  data() {
    return {}
  },
  methods: {
    open() {
      this.$refs.popup.open()
    },
    close() {
      this.$refs.popup.close()
      this.$emit('cancel')
    },
    closeAction() {
      this.$emit('cancel')
    },
    submit() {
      this.$emit('confirm')
      this.$refs.popup.close()
    }
  }
}
</script>

<style scoped lang="scss">
  .container{
    width: 100vw;
  }
  .confirm-wrap {
    position: relative;
    width: 620rpx;
    min-height: 304rpx;
    background: #ffffff;
    border-radius: 14rpx 14rpx 14rpx 14rpx;
    margin: auto;
    margin-top: calc( 40vh - 152rpx);
    box-sizing: border-box;
    .title {
      padding-top: 42rpx;
      padding-bottom: 24rpx;
      font-size: 36rpx;
      font-weight: 400;
      color: #000000;
      line-height: 36rpx;
      text-align: center;
    }

    .text {
      display: block;
      font-size: 28rpx;
      line-height: 42rpx;
      font-weight: 500;
      color: #333333;
      text-align: center;
      padding-bottom: 52rpx;
      padding-left: 42rpx;
      padding-right: 42rpx;
      border-bottom: 1rpx solid #DDDDDD;
    }


    .button-wrap {
      display: flex;
      align-items: center;
      height: 100rpx;
      position: relative;

      .left, .right {
        flex: 1;
        font-size: 36rpx;
        font-weight: 400;
        color: #999999;
        line-height: 100rpx;
        border-right: 1rpx solid #DDDDDD;
        cursor: pointer;
        text-align: center;
      }

      .right {
        color: #0087FF;
        border-right: none;
      }

      .shareMask {
        height: 100rpx;
        width: 310rpx;
        left: 50%;
        top: 50%;
        display: block;
        position: absolute;
        transform: translateY(-50%);
        background: transparent;

        &::after {
          border: none;
        }
      }
    }
  }
</style>
