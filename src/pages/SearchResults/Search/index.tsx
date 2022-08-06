import React, { ChangeEventHandler } from 'react';

interface ISearch {
  onChange: ChangeEventHandler<HTMLInputElement>,
  value: string | null
}

export const Search: React.FC<ISearch> = ({ onChange, value}) => (
  <div>
    <label htmlFor="search">Start searching:</label>
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
