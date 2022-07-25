import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import rootStore from '_src/stores';
import { ThemeProvider } from '_components/SwitchThemes';
import '_utils/i18n';

import '_assets/less/index.less';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider {...rootStore}>
    <ThemeProvider>
      <div className="about-box">
        <div className="version">{process.env.VERSION_APP}</div>
      </div>
    </ThemeProvider>
  </Provider>,
);
