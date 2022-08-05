import { SearchResults } from './pages/SearchResults';
import { About } from './pages/About';
import React from 'react';

export const ROUTES = [
  {
    path: 'search-results',
    Element: <SearchResults />,
    title: 'Search Results'
  },
  {
    path: 'about',
    Element: <About />,
    title: 'About application'
  }
];
