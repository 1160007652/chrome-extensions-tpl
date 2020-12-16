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
