<template>
  <view class="phoneLogin">
    <view class="type_area">
      <view :class="{ active: currentPage === 'CodeLogin' }" @click="switchTo('CodeLogin')"
        >验证码注册登录</view
      >
      <view class="gap"></view>
      <view :class="{ active: currentPage === 'PasswordLogin' }" @click="switchTo('PasswordLogin')"
        >密码登录</view
      >
    </view>
    <view class="form" v-if="currentPage === 'CodeLogin'">
      <input type="number" v-model="form.phone" placeholder="请输入手机号" class="normal-input" />
      <view class="input-wrap">
        <input type="number" v-model="pictureCode" placeholder="请输入图片验证码" class="input" />
        <image :src="imgBase64" @click="getBase64ImgCode" class="code-img"></image>
      </view>
      <view class="input-wrap">
        <input v-model="form.captcha" type="number" placeholder="请输入验证码" class="input" />
        <text class="code" @click="sendCode" v-show="countdown === 0">获取验证码</text>
        <text class="code" @click="sendCode" v-show="countdown > 0">{{ countdown }}S</text>
      </view>
    </view>
    <view class="form" v-else-if="currentPage === 'PasswordLogin'">
      <input v-model="form.phone" placeholder="请输入账号" class="normal-input" />
      <input
        v-model="form.password"
        placeholder="请输入密码"
        type="password"
        class="normal-input"
      />
    </view>
    <view class="agreement-wrap">
      <checkbox-group @change="changeCheck">
        <checkbox :value="true" checked="true" color="#ffffff" class="myRadioCheck right">
          该账号默认绑定小程序
        </checkbox>
      </checkbox-group>
    </view>
    <button
      class="btn-login login"
      @click="login"
      :style="disable ? 'background:rgba(0,133,255,0.3)!important' : ''"
      >{{ currentPage === 'CodeLogin' ? '登录/注册' : '登录' }}</button
    >
  </view>
</template>

<script>
  import { getAppletLoginStatus} from '@/utils/auth'
  import { validateMobile } from '@/utils/validate.js';
  import { useUserStore } from '@/store';
  import UserService from '@/api/UserService';

  const TIME_COUNT = 60;
  export default {
    name: 'phoneLogin',
    data() {
      return {
        form: {
          phone: '',
          captcha: '',
          status: '',
          recommendCode: '',
          loginCode: '',
          password: '',
        },
        currentPage: 'CodeLogin',
        redirect: '',
        imgBase64: '',
        pictureCode: '',
        code: '',
        countdown: 0,
        timer: null,
        checked: true,
        appletLoginStatus: getAppletLoginStatus(),
      };
    },
    onLoad(option) {
      console.log(option, 'option');
      this.redirect = option.redirect
    },
    computed: {
      disable() {
        if (this.currentPage === 'CodeLogin') {
          return !(this.form.phone && this.form.captcha);
        } else {
          return !(this.form.phone && this.form.password);
        }
      },
    },
    created() {
      this.getBase64ImgCode();
    },
    methods: {
      switchTo(pageName) {
        this.currentPage = pageName;
      },
      changeCheck(e) {
        if (e.detail.value.length > 0) {
          this.checked = e.detail.value[0];
        } else {
          this.checked = false;
        }
      },
      async getBase64ImgCode() {
        try {
          const { resultData } = await UserService.getPictureCode();
          this.imgBase64 = resultData.picture;
          this.code = resultData.code;
        } catch (e) {
          console.log(e, 'error');
        }
      },
      async sendCode() {
        if (this.timer) return;
        if (!this.form.phone) {
          uni.showToast({
            title: '手机号码不能为空！',
            icon: 'none',
            duration: 3000,
          });
          return;
        }
        if (!validateMobile(this.form.phone)) {
          uni.showToast({
            title: '手机号码格式不正确！',
            icon: 'none',
            duration: 3000,
          });
          return;
        }
        if (!this.pictureCode) {
          uni.showToast({
            title: '图形验证码不能为空！',
            icon: 'none',
            duration: 3000,
          });
          return;
        }
        try {
          uni.showLoading({});
          await UserService.sendSmsCodeByCaptcha({
            phone: this.form.phone,
            pictureCode: this.pictureCode,
            code: this.code,
          });
          uni.hideLoading();
          this.countdown = TIME_COUNT; // 短信验证码倒数
          this.timer = setInterval(() => {
            if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
              this.countdown--;
            } else {
              clearInterval(this.timer);
              this.countdown = 0;
              this.timer = null;
            }
          }, 1000);
        } catch (e) {
          console.log(e, 'error');
        }
      },
      async login() {
        if (this.disable || this.loading) return;
        if (this.currentPage === 'CodeLogin' && !validateMobile(this.form.phone)) {
          uni.showToast({
            title: '手机号码格式不正确！',
            icon: 'none',
            duration: 3000,
          });
          return;
        }
        uni.showLoading({
          title: '登录中',
        });
        uni.login({
          provider: 'weixin',
          success: async (loginRes) => {
            this.form.loginCode = loginRes.code;
          },
        });
      },
      navigateTo(url) {
        uni.navigateTo({ url });
      },
    },
    onUnload() {
      clearInterval(this.timer);
    },
  };
</script>

<style scoped lang="scss">
  .phoneLogin {
    .type_area {
      height: 67rpx;
      padding: 0 70rpx;
      margin-top: 80rpx;
      font-size: 48rpx;
      font-weight: 400;
      color: #999999;
      line-height: 67rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .gap {
      background: #cecece;
      display: inline-block;
      width: 1rpx;
      height: 38rpx;
    }
    .active {
      color: #333333;
    }
    .form {
      margin: 42rpx 40rpx;
      margin-bottom: 0;
    }
    .login {
      color: #ffffff;
      background: #0087ff !important;
      margin-top: 25rpx;
    }
  }
  .agreement-wrap {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    margin-top: 10rpx;
    margin-left: 40rpx;
    /*margin-bottom: 50px;*/
    .right {
      font-size: 24rpx;
      font-weight: 400;
      color: #909399;
    }
    .left {
      flex-shrink: 0;
    }
  }
</style>
