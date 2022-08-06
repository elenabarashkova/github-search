import React, { useCallback, useEffect, useState } from 'react';
import { Search } from './Search';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_QUERY } from '../../constants';
import { ResultsList } from './ResultsList';
import { getUsers } from '../../service/users';

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
    setIsPending(true);
  }, [setSearchParams]);

  const fetchUsers = useCallback(async (query: string) => {
    // todo: fix limit errors (get 403)
    // todo: add abort fetch on new search
    // todo invoke search on reload page with search params
    // todo: fix multiple invoke
    // todo: add endless scroll & additional params in request
    try {
      const response = await getUsers(query);
      setUsersList(response)
    } catch (e) {
      console.log('Error', e);
    }
  }, [])

  useEffect(() => {
    const searchQuery = searchParams.get(SEARCH_QUERY);
    if (searchQuery) {
      setIsPending(false);
      fetchUsers(searchQuery);
    }
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
