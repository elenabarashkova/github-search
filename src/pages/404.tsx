import React from 'react';
import {Link} from 'react-router-dom';
import { ROUTES } from '../routes';

export const Page404: React.FC = () => (
  <>
    <h1>404 Page</h1>
    <p>Seems like this page doesn't exist.</p>
    <Link to={ROUTES[0].path}>Please return to the main page</Link>
  </>

);
