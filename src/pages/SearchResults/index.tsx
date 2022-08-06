import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from './Search';
import { useSearchParams } from 'react-router-dom';
import { PAGE_QUERY, SEARCH_QUERY, INITIAL_PAGE_NUM } from '../../constants';
import { ResultsList } from './ResultsList';
import { getUsers, QUANTITY_PER_PAGE } from '../../service';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [usersList, setUsersList] = useState<Array<any>>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleSearchChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = {
      [SEARCH_QUERY]: target.value,
      [PAGE_QUERY]: INITIAL_PAGE_NUM
    };
    setSearchParams(!target.value.length ? {} : newSearchParams);
  }, [setSearchParams]);

  const handlePageChange = useCallback((modifier: number) => {
    const newPageNum = Number(searchParams.get(PAGE_QUERY)) + modifier;
    const currentSearchQuery = {
      [SEARCH_QUERY]: searchParams.get(SEARCH_QUERY) as string
    };
    setSearchParams({...currentSearchQuery, [PAGE_QUERY]: `${newPageNum}`});
  }, [searchParams, setSearchParams]);

  const fetchUsers = useCallback(async (query: string, currentUsersPage: number, signal: AbortSignal) => {
    try {
      setUsersList([]);
      setIsPending(true);

      const {total_count, items} = await getUsers(query, currentUsersPage, { signal });

      setIsError(false);
      setUsersList(items);
      setUsersCount(total_count);
      setIsPending(false);
    } catch (e) {
      setIsError(true);
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

  const pagesQuantity = useMemo(() => `${Math.ceil(usersCount / QUANTITY_PER_PAGE)}`, [usersCount]);

  return (
    <>
      <Search onChange={handleSearchChange} value={searchParams.get(SEARCH_QUERY)} />
      { !!searchParams.get(SEARCH_QUERY) &&
        (<div>
          <div>List container</div>
          <div>Total results: {usersCount}</div>
          {isPending ?
            <div>PENDING</div> :
            isError ?
              <div>Sorry, something went wrong. Please, try your search again.</div> :
              <ResultsList users={usersList} />
          }
          <button disabled={searchParams.get(PAGE_QUERY) === INITIAL_PAGE_NUM} onClick={() => handlePageChange(-1)}>PREV</button>
          <button disabled={searchParams.get(PAGE_QUERY) === pagesQuantity} onClick={() => handlePageChange(1)}>NEXT</button>
        </div>)
      }
    </>
  )
}
