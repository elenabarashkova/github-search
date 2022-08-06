import { RepositoryItem } from '../RepositoryItem';
import React from 'react';

interface IReposList {
  reposList: Array<any>
}

export const ReposList: React.FC<IReposList> = ({reposList}) => {
  console.log(reposList[0])
  return (
    <div>
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
