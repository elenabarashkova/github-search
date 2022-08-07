import React from 'react';
import styles from './style.module.css';
import { ReposSection } from '../ReposSection';

interface IUserCard {
  imgUrl: string,
  login: string,
  url: string
}

export const UserCard: React.FC<IUserCard> = ({
  imgUrl,
  login,
  url
}) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.userCard}>
    <div className={styles.imgContainer}>
      <img src={imgUrl} alt={login} />
    </div>
    <h3 className={styles.name}><span>{login}</span></h3>
    <ReposSection login={login} />
  </a>
)
