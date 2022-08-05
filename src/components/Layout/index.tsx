import React from 'react';
import {
  NavLink,
  Outlet
} from "react-router-dom";
import { ROUTES } from '../../routes';
import styles from './style.module.css';

//todo: fix initial route situation : either leave / as search results or addinitial redirectfrom / to search-results

export const Layout: React.FC = () => (
  <>
    <header>
      <nav>
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
    <main className="content">
      <Outlet />
    </main>
  </>
);
