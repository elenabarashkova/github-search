import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.css';
import { getUserRepos } from '../../../service/github-search';

interface IResultItem {
  imgUrl: string,
  login: string,
  url: string
}

export const ResultItem: React.FC<IResultItem> = ({ imgUrl, login, url}) => {
  const [reposList, setReposList] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const fetchRepos = useCallback(async (login: string) => {
    try {
      const response = await getUserRepos(login);
      setReposList(response);
      setIsPending(false);
    } catch (e) {
      //todo: resolve errors - e.g. stop spinner & show error message
      console.log('Error', e);
    }
  }, [])

  useEffect(() => {
    fetchRepos(login);
  }, [login, fetchRepos]);
  return (
    <div className={styles.resultItem}>
      <div className={styles.imgContainer}>
        <img src={imgUrl} alt={login} />
      </div>
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer">{login}</a>
      </div>
      <div>
        <h5>Repos Info</h5>
        {
          isPending ?
            <div>Pending </div> :
            reposList.slice(0, 3).map(({name, description, language, watchers, forks }: any, index) => (
              <div key={`repo-${index}`} className={styles.repository}>
                <div>{name}</div>
                <div>{description}</div>
                <div>
                  <span>Language:</span>
                  <span>{language}</span>
                  <span>Watchers:</span>
                  <span>{watchers}</span>
                  <span>Forks:</span>
                  <span>{forks}</span>
                </div>
              </div>
            ))
        }
        {reposList.length > 3 ??
          <a href={`https://api.github.com/users/${login}/repos`} target="_blank" rel="noopener noreferrer">See all repos</a>
        }
      </div>
    </div>
  )
}
