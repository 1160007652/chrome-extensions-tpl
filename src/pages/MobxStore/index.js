import React from 'react';

import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

function Other() {
  const { testStore } = React.useContext(MobXProviderContext);
  function handleAddCount() {
    testStore.increment();
  }
  return (
    <div className="other">
      <div onClick={handleAddCount}> Mobx testStore count value: {testStore.count}</div>
    </div>
  );
}
export default observer(Other);
