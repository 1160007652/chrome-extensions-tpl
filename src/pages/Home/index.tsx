import React from 'react';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import Logo from '_assets/images/logo.png';

import './index.less';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="home">
      <img src={Logo} className="logo"></img>
      <div className="title">{t('home:title')}</div>
      <div className="technology">
        <Tag>Webpack ^5</Tag>
        <Tag>typeScript ^4</Tag>
        <Tag>Babel ^7</Tag>
        <Tag>React ^17</Tag>
        <Tag>react-i18next ^5</Tag>
        <Tag>i18next ^19</Tag>
        <Tag>react-router-dom ^5</Tag>
        <Tag>mobx ^6</Tag>
        <Tag>mobx-react ^7</Tag>
      </div>

      <div style={{ margin: '30px 0 0' }}>更多套件，请使用 muniz 脚手架， 命令：muniz create</div>
    </div>
  );
}
export default Home;
