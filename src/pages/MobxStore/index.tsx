import React from 'react';
import { Button } from 'antd';
import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

const Other: React.FC = () => {
  const { testStore } = React.useContext(MobXProviderContext);
  const handleAddCount = () => {
    testStore.increment();
  };
  return (
    <div className="other">
      <div> Mobx testStore count value: {testStore.count}</div>
      <Button onClick={handleAddCount}>add Count</Button>
    </div>
  );
};
export default observer(Other);
