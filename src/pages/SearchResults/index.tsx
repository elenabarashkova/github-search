import React, { useCallback } from 'react';
import { Search } from './Search';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_QUERY } from '../../constants';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = useCallback((value: string) => {
    const searchParam = {
      SEARCH_QUERY: value
    };
    const newSearchParam = value.length === 0 ? {} : searchParam;
    setSearchParams(newSearchParam);
  }, [searchParams]);

  return (
    <Search onChange={handleSearchChange} value={searchParams.get(SEARCH_QUERY)} />
  )
}
