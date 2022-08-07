import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from './components/Search';
import { useSearchParams } from 'react-router-dom';
import { PAGE_QUERY, SEARCH_QUERY, INITIAL_PAGE_NUM } from './constants';
import { UsersList } from './components/UsersList';
import { getUsers, QUANTITY_PER_PAGE } from '../../service';
import { Spinner } from '../../components/Spinner';
import styles from './style.module.css';
import { PaginationButtons } from './components/PaginationButtons';
import { User } from '../../interfaces';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleSearchChange = useCallback((value: string) => {
    const newSearchParams = {
      [SEARCH_QUERY]: value,
      [PAGE_QUERY]: INITIAL_PAGE_NUM
    };
    setSearchParams(!value.length ? {} : newSearchParams);
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
      setIsPending(false);
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

  const isLastPageCurrent = useMemo(() => {
    const pagesQuantity = `${Math.ceil(usersCount / QUANTITY_PER_PAGE)}`;
    return searchParams.get(PAGE_QUERY) === pagesQuantity || pagesQuantity === '0';
  }, [usersCount, searchParams]);

  return (
    <>
      <h1>Find accounts on GitHub</h1>
      <Search onChange={handleSearchChange} value={searchParams.get(SEARCH_QUERY)} />
      { !!searchParams.get(SEARCH_QUERY) &&
        (<div className={styles.resultsSection}>
          <h3>Total results: {usersCount}</h3>
          {isPending ?
            <Spinner /> :
            isError ?
              <div>Sorry, something went wrong. Please, try your search again.</div> :
              <UsersList users={usersList} />
          }
          <PaginationButtons
            onPageChange={handlePageChange}
            isFirstPageCurrent={searchParams.get(PAGE_QUERY) === INITIAL_PAGE_NUM}
            isLastPageCurrent={isLastPageCurrent} />
        </div>)
      }
    </>
  )
}
