import React from 'react';
import ReactDOM from 'react-dom';
import intl from 'react-intl-universal';
import { Provider } from 'mobx-react';
import rootStore from '_src/stores';

import '_assets/less/index.less';
import './index.less';

ReactDOM.render(
  <Provider {...rootStore}>
    <div className="about-box">
      <div className="version">{process.env.VERSION_APP}</div>
    </div>
  </Provider>,
  document.getElementById('root'),
);
