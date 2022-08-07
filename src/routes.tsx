import { SearchResults } from './pages/SearchResults';
import { About } from './pages/About';
import React from 'react';

export const ROUTES = [
  {
    path: 'github-search/',
    Element: <SearchResults />,
    title: 'Search Results'
  },
  {
    path: 'github-search/about',
    Element: <About />,
    title: 'About application'
  }
];
