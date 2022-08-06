import React, { ChangeEventHandler } from 'react';
import styles from './style.module.css';

interface ISearch {
  onChange: ChangeEventHandler<HTMLInputElement>,
  value: string | null
}

export const Search: React.FC<ISearch> = ({ onChange, value}) => (
  <div className={styles.search}>
    <label htmlFor="search">Start typing:</label>
    <input
      type="search"
      id='search'
      onChange={onChange}
      placeholder='Search here'
      value={value ?? ''}
      maxLength={200}
    />
  </div>
);
