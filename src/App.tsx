import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './routes';
import { Page404 } from './pages/404';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {ROUTES.map(({path, Element}, index) => (
        <Route
          key={`route-${index}`}
          path={path}
          element={Element}
        />
      ))}
      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
);
