import React from 'react';

interface IRepositoryItem {
  name: string,
  description: string,
  language: string,
  watchers: number,
  forks: number
}

export const RepositoryItem: React.FC<IRepositoryItem> = ({
  name,
  description,
  language,
  watchers,
  forks
}) => {
  return (
    <div>
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
  )
}
