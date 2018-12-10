const util = require('../../util')
export default {
  dbs: 'mongodb://localhost:27017/meituan',
  redis: {
    get host() {
      return '127.0.0.1';
    },
    get post() {
      return 6379;
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com';
    },
    get post() {
      return 587;
    },
    get user() {
      return '214180117@qq.com';
    },
    get pass() {
      return util.emailPass;
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase();
      };
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    }
  }
};
