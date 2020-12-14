import React from 'react';
import intl from 'react-intl-universal';

import SwitchLanguage from '_components/SwitchLanguage';

import Logo from '_assets/images/logo.png';
import FavoriteSvg from '_assets/fonts/favorite.svg';

import './index.less';

function Home() {
  return (
    <div className="home">
      <img src={Logo}></img>
      首页
      <img src={FavoriteSvg} style={{ color: 'red', fontSize: '48px' }} />
      <SwitchLanguage />
    </div>
  );
}
export default Home;
