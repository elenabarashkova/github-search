import React from 'react';
import styles from './style.module.css';
import { ReposSection } from '../ReposSection';

interface IResultItem {
  imgUrl: string,
  login: string,
  url: string
}

export const ResultItem: React.FC<IResultItem> = ({
  imgUrl,
  login,
  url
}) => (
  <div className={styles.resultItem}>
    <div className={styles.imgContainer}>
      <img src={imgUrl} alt={login} />
    </div>
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">{login}</a>
    </div>
    <ReposSection login={login} />
  </div>
)
