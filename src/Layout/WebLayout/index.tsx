import React from 'react';
import LeftMenu from '_containers/LeftMenu';
import SwitchLanguage from '_components/SwitchLanguage';
import SwitchThemes from '_components/SwitchThemes';

import './index.less';

const WebLayout: React.FC = ({ children }) => {
  return (
    <div className="web-container">
      <div className="left">
        <LeftMenu />
        <div className="left-tools">
          <SwitchLanguage />
          <SwitchThemes />
        </div>
      </div>
      <div className="right">{children}</div>
    </div>
  );
};

export default WebLayout;
