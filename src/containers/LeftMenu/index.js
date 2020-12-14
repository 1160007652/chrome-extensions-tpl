/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 16:51:00
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';

import pageURL from '_constants/pageURL';

import './index.less';

const LeftMenu = () => {
  return (
    <div className="left-menu-list">
      <Link to={pageURL.home}>首页</Link>
      <Link to={pageURL.other}>其它</Link>
    </div>
  );
};

export default LeftMenu;
