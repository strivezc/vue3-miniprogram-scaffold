import request from '@/utils/request';
import { requestPort } from '@/utils/requestPort';

export default {
  login(data) {
    return request({
      url: `${requestPort.users}/user/login`,
      method: 'post',
      data,
    });
  },
  activeRecord(data) {
    //用户活跃记录
    return request({
      url: `${requestPort.record}/userActive/activeRecord`,
      method: 'post',
      data,
    })
  },
};
