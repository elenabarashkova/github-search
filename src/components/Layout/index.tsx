import React from 'react';
import {
  NavLink,
  Outlet
} from "react-router-dom";
import { ROUTES } from '../../routes';
import styles from './style.module.css';

export const Layout: React.FC = () => (
  <>
    <header>
      <nav className={`${styles.navigation} container`}>
        {ROUTES.map(({path, title}, index) => (
          <NavLink
            key={`nav-link-${index}`}
            to={path}
            className={({ isActive }) => isActive ? styles.active : '' }
          >
            {title}
          </NavLink>
        ))}
      </nav>
    </header>
    <main className={`${styles.content} container`}>
      <Outlet />
    </main>
  </>
);
