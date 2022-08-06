import React, { useCallback, useEffect, useState } from 'react';
import { getUserRepos } from '../../../service';
import { ReposList } from '../ReposList';
import { VISIBLE_REPOS_QUANTITY } from '../../../constants';

interface IReposSection {
  login: string,
}

export const ReposSection: React.FC<IReposSection> = ({ login, }) => {
  const [reposList, setReposList] = useState<Array<any>>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchRepos = useCallback(async (login: string, signal: AbortSignal) => {
    try {
      const response = await getUserRepos(login, { signal });
      setIsError(false);
      setReposList(response);
      setIsPending(false);
    } catch (e) {
      setIsError(true);
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchRepos(login, signal);

    return () => {
      abortController.abort();
    };
  }, [login, fetchRepos]);

  return (
    <div>
      <h5>Repos Info</h5>
      {isPending ?
        <div>Pending</div> :
        isError ?
          <div>Sorry, something went wrong.</div> :
          <ReposList reposList={reposList.slice(0, VISIBLE_REPOS_QUANTITY)} />
      }
      {reposList.length > VISIBLE_REPOS_QUANTITY &&
        <a
          href={`https://api.github.com/users/${login}/repos`}
          target="_blank"
          rel="noopener noreferrer">
          See all repos
        </a>
      }
    </div>
  )
}
