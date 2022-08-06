import React from 'react';
import { ResultItem } from '../ResultItem';
import styles from './style.module.css';

interface IResultsList {
  users: any
}

export const ResultsList: React.FC<IResultsList> = ({ users = []}) => {
  // console.log('In ResultsList:', users)
  return (
    <div className={styles.resultsList}>
      {users.map(({avatar_url, login, html_url }: any) => <ResultItem key={login} login={login} imgUrl={avatar_url} url={html_url} />)}
    </div>
  )
}
