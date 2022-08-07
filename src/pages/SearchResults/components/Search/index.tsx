import React from 'react';
import styles from './style.module.css';

interface ISearch {
  onChange: CallableFunction,
  value: string | null
}

export const Search: React.FC<ISearch> = ({ onChange, value}) => (
  <div className={styles.search}>
    <label htmlFor="search">Start typing:</label>
    <input
      type="search"
      id='search'
      onChange={({target}) => onChange(target.value)}
      placeholder='Search here'
      value={value ?? ''}
      maxLength={200}
    />
  </div>
);
