import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import intl from 'react-intl-universal';

import LeftMenu from '_containers/LeftMenu';

// event
import { languageEvent, EVENT_LIST } from '_src/utils/events';

// 多语言库
import LocaleEnUS from '_assets/locales/en';
import LocaleZhCN from '_assets/locales/zh';

// antd 组件库 多语言
import antdEnUS from 'antd/lib/locale/en_US';
import antdZhCN from 'antd/lib/locale/zh_CN';

import './index.less';

const WebLayout = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') ?? 'zhCN');

  useEffect(() => {
    // 监听多语言变更
    languageEvent.on(EVENT_LIST.CHANGE_LANGUAGE, (lang) => {
      loadLocales(lang);
    });
    // 初始化多语言
    loadLocales(language);
  }, []);

  const loadLocales = (lang) => {
    localStorage.setItem('locale', lang);
    intl
      .init({
        currentLocale: lang,
        locales: {
          enUS: LocaleEnUS,
          zhCN: LocaleZhCN,
        },
      })
      .then(() => {
        setLanguage(lang);
      });
  };

  return (
    <div className="web-container" key={language}>
      <ConfigProvider locale={language === 'zhCN' ? antdZhCN : antdEnUS}>
        <div className="layout">
          <div className="left">
            <LeftMenu />
          </div>
          <div className="right">{children}</div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default WebLayout;
