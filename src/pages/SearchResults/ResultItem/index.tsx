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
  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.resultItem}>
    <div className={styles.imgContainer}>
      <img src={imgUrl} alt={login} />
    </div>
    <h3 className={styles.name}><span>{login}</span></h3>
    <ReposSection login={login} />
  </a>
)
