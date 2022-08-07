import React from 'react';
import { UserCard } from '../UserCard';
import styles from './style.module.css';
import { User } from '../../../../interfaces';

interface IUsersList {
  users: Array<User>
}

export const UsersList: React.FC<IUsersList> = ({ users}) => (
  <div className={styles.usersList}>
    {users.length ?
      users.map(({avatar_url, login, html_url }: User) => (
        <UserCard
          key={login}
          login={login}
          avatar_url={avatar_url}
          html_url={html_url}
        />
      )) :
      <h3>There're no such accounts</h3>
    }
  </div>
);
