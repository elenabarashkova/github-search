import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './routes';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {ROUTES.map(({path, Element}) => (
        <Route path={path} element={Element} />
      ))}
    </Route>
  </Routes>
);
