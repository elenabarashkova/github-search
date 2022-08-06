import React, { useCallback, useEffect, useState } from 'react';
import { Search } from './Search';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_QUERY } from '../../constants';
import { ResultsList } from './ResultsList';
import { getUsers } from '../../service/github-search';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [usersList, setUsersList] = useState<Array<any>>([]);

  const handleSearchChange = useCallback((value: string) => {
    const searchParam = {
      [SEARCH_QUERY]: value
    };
    const newSearchParam = value.length === 0 ? {} : searchParam;
    setSearchParams(newSearchParam);
  }, [setSearchParams]);

  const fetchUsers = useCallback(async (query: string, signal: AbortSignal) => {
    // todo: fix limit errors (get 403) - mostly fixed - check again for endless scroll

    // todo: fix multiple invoke
    // todo: add endless scroll & additional params in request

    try {
      setIsPending(true);
      const response = await getUsers(query, { signal });
      setUsersList(response);
      setIsPending(false);
    } catch (e) {
      //todo: resolve errors - e.g. stop spinner & show error message
      console.log('Error', e);
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const searchQuery = searchParams.get(SEARCH_QUERY);

    if (searchQuery) {
      fetchUsers(searchQuery, signal);
    }

    return () => {
      abortController.abort();
    };
  }, [searchParams, fetchUsers]);

  return (
    <>
      <Search onChange={handleSearchChange} value={searchParams.get(SEARCH_QUERY)} />
      { searchParams.get(SEARCH_QUERY) ?
        <div>
          List container
          {isPending ?
            <div>PENDING</div> :
            <ResultsList users={usersList} />
          }
        </div> :
        null
      }
    </>
  )
}
