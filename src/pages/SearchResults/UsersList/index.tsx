import React from 'react';
import { UserCard } from '../UserCard';
import styles from './style.module.css';

interface IUsersList {
  users: any
}

export const UsersList: React.FC<IUsersList> = ({ users}) => (
  <div className={styles.usersList}>
    {users.length ?
      users.map(({avatar_url, login, html_url }: any) => (
        <UserCard
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
