import React from 'react';
import { ResultItem } from '../ResultItem';
import styles from './style.module.css';

interface IResultsList {
  users: any
}

export const ResultsList: React.FC<IResultsList> = ({ users}) => (
  <div className={styles.resultsList}>
    {users.length ?
      users.map(({avatar_url, login, html_url }: any) => (
        <ResultItem
          key={login}
          login={login}
          imgUrl={avatar_url}
          url={html_url}
        />
      )) :
      <h3>There're no such accounts</h3>
    }
  </div>
);
