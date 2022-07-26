import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

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

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        {routeMap.map((item, index) => (
          <Route key={index} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
