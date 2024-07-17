import { getRecommendCode } from '@/utils/auth';

export default {
  onShow() {
    let pages = getCurrentPages();
    if (pages.length >= 1) {
      this.pageRouter = pages[pages.length - 1].route;
      if (this.pageRouter) {
        this.mpShare = {
          title: '找外教、练口语，就上"说客英语"',
          path: `/pages/home/index?recommendCode=${getRecommendCode()}`,
          imageUrl:
            'https://talk915-1302759139.cos.ap-beijing.myqcloud.com/data/image/690225bd24f74f808b7333c564c2540c.png',
        };
      }
      return;
    }
  },
  // 分享到好友
  onShareAppMessage() {
    return this.mpShare;
  },
};
