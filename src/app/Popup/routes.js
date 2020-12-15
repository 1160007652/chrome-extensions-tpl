import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import pageURL from '_constants/pageURL';
import Home from '_src/pages/Home';

const routeMap = [
  {
    path: pageURL.home,
    component: Home,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.other,
    component: lazy(() => import(/* webpackChunkName: 'mobxstore' */ '../../pages/MobxStore')),
    exact: true,
    dynamic: true,
  },
  {
    path: '*',
    component: () => <div>404</div>,
    exact: true,
    dynamic: false,
  },
];

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {routeMap.map((item, index) => (
          <Route key={index} path={item.path} exact={item.exact} component={item.component} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
