/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 13:53:20
 * @ Description: 根状态管理, 最佳使用方式
 */
import TestStore from './TestStore';

/**
 * 创建根Stroe, 统一管理状态
 */
class RootStore {
  /**
   * 构造方法, 集合子Store
   */
  constructor() {
    /** 多语言状态管理 */
    this.testStore = new TestStore(this);
  }
}

export default new RootStore();
