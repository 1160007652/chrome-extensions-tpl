import axios from './dataProxy';
import URL from '_constants/URL';

/**
 * 用户中心
 */
const userServer = {
  /**
   * 登录接口
   * @param {object} data - 请求参数
   */
  async login(data) {
    return await axios.post(URL.user.login, data);
  },
};

export default userServer;
