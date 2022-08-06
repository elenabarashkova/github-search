import React, { useCallback, useEffect, useState } from 'react';
import { Search } from './Search';
import { useSearchParams } from 'react-router-dom';
import { PAGE_QUERY, SEARCH_QUERY } from '../../constants';
import { ResultsList } from './ResultsList';
import { getUsers } from '../../service/github-search';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [usersList, setUsersList] = useState<Array<any>>([]);

  const handleSearchChange = useCallback((value: string) => {
    const newSearchParams = {
      [SEARCH_QUERY]: value,
      [PAGE_QUERY]: '1'
    };
    const searchParamsToSet = value.length === 0 ? {} : newSearchParams;
    setSearchParams(searchParamsToSet);
  }, [setSearchParams]);

  const handlePageChange = useCallback((modifier: number) => {
    const newPageNum = Number(searchParams.get(PAGE_QUERY)) + modifier;
    const currentSearchQuery = {
      [SEARCH_QUERY]: searchParams.get(SEARCH_QUERY) as string
    };
    setSearchParams({...currentSearchQuery, [PAGE_QUERY]: `${newPageNum}`});
  }, [searchParams, setSearchParams]);

  const fetchUsers = useCallback(async (query: string, currentUsersPage: number, signal: AbortSignal) => {
    // todo: check & fix multiple invoke

    try {
      setIsPending(true);
      setUsersList([]);
      const response = await getUsers(query, currentUsersPage, { signal });
      setUsersList(response);
      setIsPending(false);
    } catch (e) {
      //todo: resolve errors - e.g. stop spinner & show error message
      console.log('Error', e);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const searchQuery = searchParams.get(SEARCH_QUERY);
    const pageQuery = Number(searchParams.get(PAGE_QUERY));

    if (searchQuery) {
      fetchUsers(searchQuery, pageQuery, signal);
    }

    return () => {
      abortController.abort();
    };
  }, [searchParams, fetchUsers]);
//todo: add dasables prop for next bnt && for it need to recieve total number of items
  return (
    <>
      <Search onChange={handleSearchChange} value={searchParams.get(SEARCH_QUERY)} />
      { !!searchParams.get(SEARCH_QUERY) &&
        <div>
          List container
          {isPending && !usersList.length ?
            <div>PENDING</div> :
            <>
              <ResultsList users={usersList} />
              {isPending && <div>Mini pending</div> }
            </>
          }
          <button disabled={searchParams.get(PAGE_QUERY) === '1'} onClick={() => handlePageChange(-1)}>PREV</button>
          <button onClick={() => handlePageChange(1)}>NEXT</button>
        </div>
      }
    </>
  )
}
