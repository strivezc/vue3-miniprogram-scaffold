const TokenKey = 'token';
const UserId = 'userId';
const UserType = 'userType';
const UserName = 'userName';
const UserPhone = 'userPhone';
const UserImg = 'userImg';
const RecommendCode = 'recommendCode';
const MobileArea = 'mobileArea';

// 小程序账号绑定状态，0未绑定，1已绑定
const AppletLoginStatus = 'appletLoginStatus';

export function getToken() {
  return uni.getStorageSync(TokenKey);
}

export function setToken(token) {
  return uni.setStorageSync(TokenKey, token);
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey);
}
export function setUserImg(userImg) {
  return uni.setStorageSync(UserImg, userImg);
}
export function getUserImg() {
  return uni.getStorageSync(UserImg);
}
export function removeUserImg() {
  return uni.removeStorageSync(UserImg);
}

export function getUserId() {
  return uni.getStorageSync(UserId);
}

export function removeUserId() {
  return uni.removeStorageSync(UserId);
}

export function setUserId(userId) {
  return uni.setStorageSync(UserId, userId);
}

export function getUserPhone() {
  return uni.getStorageSync(UserPhone);
}

export function removeUserPhone() {
  return uni.removeStorageSync(UserPhone);
}

export function setUserPhone(userPhone) {
  return uni.setStorageSync(UserPhone, userPhone);
}

export function setUserType(userType) {
  return uni.setStorageSync(UserType, userType);
}
export function getUserType() {
  return uni.getStorageSync(UserType);
}
export function removeUserType() {
  return uni.removeStorageSync(UserType);
}

export function setUserName(userName) {
  return uni.setStorageSync(UserName, userName);
}
export function getUserName() {
  return uni.getStorageSync(UserName);
}
export function removeUserName() {
  return uni.removeStorageSync(UserName);
}
export function setRecommendCode(recommendCode) {
  return uni.setStorageSync(RecommendCode, recommendCode);
}
export function getRecommendCode() {
  return uni.getStorageSync(RecommendCode);
}
export function removeRecommendCode() {
  return uni.removeStorageSync(RecommendCode);
}
export function setMobileArea(mobileArea) {
  return uni.setStorageSync(MobileArea, mobileArea);
}
export function getMobileArea() {
  return uni.getStorageSync(MobileArea);
}
export function removeMobileArea() {
  return uni.removeStorageSync(MobileArea);
}
export function setAppletLoginStatus(appletLoginStatus) {
  return uni.setStorageSync(AppletLoginStatus, appletLoginStatus);
}
export function getAppletLoginStatus() {
  return uni.getStorageSync(AppletLoginStatus);
}
export function clearStorageSync() {
  removeUserName();
  removeUserType();
  removeUserPhone();
  removeUserId();
  removeUserImg();
  removeToken();
  removeRecommendCode();
  removeMobileArea();
}
