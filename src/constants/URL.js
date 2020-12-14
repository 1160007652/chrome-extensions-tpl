// 定义URL
const URLSource = {
  /** 用户登录 */
  user: {
    login: '/user/login',
  },
};

// 联调环境接口判断
const baseUrl = {
  development: 'http://dev.test.com/api',
  production: 'https://pro.test.com/api',
};

// 代理监听 URL配置
const handler = {
  get(target, key) {
    // get 的trap 拦截get方法
    let value = target[key];
    try {
      return new Proxy(value, handler); // 使用try catch 巧妙的实现了 深层 属性代理
    } catch (err) {
      if (typeof value === 'string') {
        // 向请求地址动态绑定执行环境 如: test
        value = baseUrl[process.env.NODE_ENV] + value;

        // 替换当前浏览器的类型 通过获取路由中的第一个路径去区分
        // if (value.includes('{type}')) {
        //  这里执行 动态替换 urlPath 的事情
        // }
      }
      return value;
    }
  },
  set(target, key) {
    // 阻止外部误操作，导致URL配置文件被修改，设置属性为只读属性
    try {
      return new Proxy(target[key], handler);
    } catch (err) {
      return true;
    }
  },
};

const URL = new Proxy(URLSource, handler);

export default URL;
