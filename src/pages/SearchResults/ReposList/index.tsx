import { RepositoryItem } from '../RepositoryItem';
import React from 'react';
import styles from './style.module.css';

interface IReposList {
  reposList: Array<any>
}

export const ReposList: React.FC<IReposList> = ({reposList}) => {
  return (
    <div className={styles.reposList}>
      {reposList.length ?
        reposList.map(({name, description, language, watchers, forks, html_url }: any, index) => (
          <RepositoryItem
            key={`repo-${index}`}
            name={name}
            description={description}
            language={language}
            watchers={watchers}
            forks={forks}
            url={html_url}
          />
        )) :
        <h3>No repositories</h3>
      }
    </div>
  )
}
