import React, { useCallback, useEffect, useState } from 'react';
import { getUserRepos } from '../../../../service';
import { ReposList } from '../ReposList';
import { ABORT_ERROR_CODE, VISIBLE_REPOS_QUANTITY } from '../../constants';
import styles from './style.module.css';
import { Repository } from '../../../../interfaces';
import { Spinner } from '../../../../components/Spinner';

interface IReposSection {
  login: string,
}

export const ReposSection: React.FC<IReposSection> = ({ login, }) => {
  const [reposList, setReposList] = useState<Array<Repository>>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchRepos = useCallback(async (login: string, signal: AbortSignal) => {
    try {
      const response = await getUserRepos(login, { signal });
      setIsError(false);
      setReposList(response);
      setIsPending(false);
    } catch (e: unknown) {
      if ((e as DOMException).code !== ABORT_ERROR_CODE) {
        setIsError(true);
        setIsPending(false);
      }
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

  console.log('!!', isPending);

  return (
    <div className={styles.reposSection}>
      <h3>Repositories:</h3>
      {isPending ?
        <Spinner /> :
        isError ?
          <div>Sorry, something went wrong.</div> :
          <ReposList reposList={reposList.slice(0, VISIBLE_REPOS_QUANTITY)} />
      }
      {reposList.length > VISIBLE_REPOS_QUANTITY &&
        <div
          className={`link ${styles.allReposLink}`}
          onClick={() => window.open(`https://github.com/${login}?tab=repositories`, '_blank')}
        >
          Go to all repositories
        </div>
      }
    </div>
  )
}
