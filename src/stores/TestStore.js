/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 11:37:48
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, makeAutoObservable } from 'mobx';

/**
 * TestStore
 */
class TestStore {
  count = 0;
  increment = () => {
    this.count = this.count + 1;
  };

  constructor() {
    makeAutoObservable(this, {
      count: observable,
      increment: action,
    });
  }
}

export default TestStore;
