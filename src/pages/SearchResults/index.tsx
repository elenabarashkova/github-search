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
    // setIsPending(true);
  }, [setSearchParams]);

  const fetchUsers = useCallback(async (query: string) => {
    // todo: fix limit errors (get 403) - mostly fixed - check again for endless scroll
    // todo: add abort fetch on new search
    // todo: fix multiple invoke
    // todo: add endless scroll & additional params in request
    // todo: add debounce fn https://stackoverflow.com/questions/54301090/how-to-delay-start-debounce-fetching-data-until-user-stops-typing
    try {
      setIsPending(true);
      const response = await getUsers(query);
      setUsersList(response)
    } catch (e) {
      //todo: resolve errors - e.g. stop spinner & show error message
      console.log('Error', e);
    }
  }, [])

  useEffect(() => {
    const searchQuery = searchParams.get(SEARCH_QUERY);
    if (searchQuery) {
      fetchUsers(searchQuery);
      setIsPending(false);
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
