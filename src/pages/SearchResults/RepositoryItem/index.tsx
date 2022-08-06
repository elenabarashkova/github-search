import React from 'react';
import styles from './style.module.css';
import eye from './eye.svg';

interface IRepositoryItem {
  name: string,
  description: string,
  language: string,
  watchers: number,
  forks: number,
  url: string
}

export const RepositoryItem: React.FC<IRepositoryItem> = ({
  name,
  description,
  language,
  watchers,
  forks,
  url
}) => {
  return (
    <div
      className={styles.repositoryItem}
      onClick={() => window.open(url, '_blank')}
    >
      <div>{name}</div>
      <div>{description}</div>
      <div>
        <span>Language:</span>
        <span>{language}</span>
        <img src={eye} alt=""/>
        <span>{watchers}</span>
        <span>Forks:</span>
        <span>{forks}</span>
      </div>
    </div>
  )
}
