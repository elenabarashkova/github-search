import { RepositoryItem } from '../RepositoryItem';
import React from 'react';

interface IReposList {
  reposList: Array<any>
}

export const ReposList: React.FC<IReposList> = ({reposList}) => (
  <div>
    {reposList.length ?
      reposList.map(({name, description, language, watchers, forks }: any, index) => (
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
  </div>
)
