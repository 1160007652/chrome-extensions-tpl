import React from 'react';
import { Link } from 'react-router-dom';

import pageURL from '_constants/pageURL';

import './index.less';

const LeftMenu: React.FC = () => {
  return (
    <div className="left-menu-list">
      <Link to={pageURL.home}>首页</Link>
      <Link to={pageURL.other}>MobxStore</Link>
    </div>
  );
};

export default LeftMenu;
