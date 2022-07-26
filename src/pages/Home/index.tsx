import React from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '_assets/images/logo.png';

import './index.less';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="home">
      <img src={Logo} className="logo"></img>
      <div className="title">{t('home:title')}</div>

      <div style={{ margin: '30px 0 0' }}>更多套件，请使用 muniz 脚手架， 命令：muniz create</div>
    </div>
  );
}
export default Home;
