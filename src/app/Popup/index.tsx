/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:59
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 18:37:36
 * @ Description: popup.html chrome 扩展插件, 弹出框的页面展示入口
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from '_components/SwitchThemes';
import Routes from '_src/app/Popup/routes';
import rootStore from '_src/stores';

import '_utils/i18n';
import { WebLayout } from '_src/Layout';

import '_assets/themes/light.css';
import '_assets/themes/dark.css';
import '_assets/less/index.less';
import './index.less';

const Root: React.FC = () => {
  return (
    <Provider {...rootStore}>
      <ThemeProvider>
        <HashRouter>
          <WebLayout>
            <Routes />
          </WebLayout>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
