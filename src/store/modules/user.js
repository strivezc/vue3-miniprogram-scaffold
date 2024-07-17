import { defineStore } from 'pinia';
import UserService from '@/api/UserService';
import { getToken,setToken,setUserId, clearStorageSync,setRecommendCode,setMobileArea,setUserPhone } from '@/utils/auth';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      userName: '',
      userType: '',
      userImg: '',
      phone: '',
      mobileArea: '',// 课程顾问电话
      courseAdviserQrCode: '',// 课程顾问微信二维码
      userId: '',
    };
  },
  persist: {
    enabled: true,
    detached: true, // 设置订阅与组件分离
  },
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    setRecommendCode(recommendCode) {
      this.recommendCode = recommendCode;
      setRecommendCode(recommendCode);
    },
    setMobileArea(mobileArea) {
      this.mobileArea = mobileArea;
      setMobileArea(mobileArea);
    },
    setToken(token) {
      setToken(token);
      this.token = token;
    },
    setUserName(userName) {
      this.userName = userName;
    },
    setUserType(userType) {
      this.userType = userType;
    },
    setUserImg(userImg) {
      this.userImg = userImg;
    },
    setUserId(userId) {
      setUserId(userId)
      this.userId = userId;
    },
    setUserPhone(phone) {
      this.phone = phone;
      setUserPhone(phone)
    },
    // user logout
    logout() {
      return new Promise((resolve, reject) => {
        UserService.logout(this.token)
          .then(() => {
            this.setToken('');
            clearStorageSync();
            this.$reset();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken() {
      return new Promise((resolve) => {
        this.setToken('');
        this.setUserImg('');
        this.setUserName('');
        this.$reset();
        clearStorageSync();
        resolve();
      });
    },
  },
});
