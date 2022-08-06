import React, { useCallback, useEffect, useState } from 'react';
import { getUserRepos } from '../../../service/github-search';
import { RepositoryItem } from '../RepositoryItem';

interface IReposList {
  login: string,
}

export const ReposList: React.FC<IReposList> = ({ login, }) => {
  const [reposList, setReposList] = useState<Array<any>>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  // todo: eject as hook? - common with search detch callback
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
        <div>Pending </div> :
        isError ?
          <div>Sorry, something went wrong.</div> :
          reposList.length ?
            reposList.slice(0, 3).map(({name, description, language, watchers, forks }: any, index) => (
              <RepositoryItem
                key={`repo-${index}`}
                name={name}
                description={description}
                language={language}
                watchers={watchers}
                forks={forks}
              />
            )) :
            <div>No repositories</div>
      }
      {reposList.length > 3 ?
        <a href={`https://api.github.com/users/${login}/repos`} target="_blank" rel="noopener noreferrer">See all repos</a>
        :
        null
      }
    </div>
  )
}
