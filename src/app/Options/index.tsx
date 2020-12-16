import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import rootStore from '_src/stores';
import { ThemeProvider } from '_components/SwitchThemes';
import '_utils/i18n';

import '_assets/less/index.less';
import './index.less';

ReactDOM.render(
  <Provider {...rootStore}>
    <ThemeProvider>
      <div className="about-box">
        <div className="version">{process.env.VERSION_APP}</div>
      </div>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
