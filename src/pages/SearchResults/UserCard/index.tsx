import React from 'react';
import styles from './style.module.css';
import { ReposSection } from '../ReposSection';
import { User } from '../../../interfaces';

export const UserCard: React.FC<User> = ({
  avatar_url,
  login,
  html_url,
}) => (
  <a href={html_url} target="_blank" rel="noopener noreferrer" className={styles.userCard}>
    <div className={styles.imgContainer}>
      <img src={avatar_url} alt={login} />
    </div>
    <h3 className={styles.name}><span>{login}</span></h3>
    <ReposSection login={login} />
  </a>
)
