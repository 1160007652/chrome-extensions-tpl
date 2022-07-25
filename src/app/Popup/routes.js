import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import pageURL from '_constants/pageURL';
import Home from '_src/pages/Home';

const routeMap = [
  {
    path: pageURL.home,
    component: Home,
  },
  {
    path: pageURL.other,
    component: lazy(() => import(/* webpackChunkName: 'mobxstore' */ '../../pages/MobxStore')),
  },
  {
    path: '*',
    component: () => <div>404</div>,
  },
];

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {routeMap.map((item) => (
          <Route key={item.path} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
