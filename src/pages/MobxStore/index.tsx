import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

const Other: React.FC = () => {
  const { testStore } = React.useContext(MobXProviderContext);
  const handleAddCount = () => {
    testStore.increment();
  };
  return (
    <div className="other">
      <div onClick={handleAddCount}> Mobx testStore count value: {testStore.count}</div>
    </div>
  );
};
export default observer(Other);
