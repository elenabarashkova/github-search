import React, { ChangeEvent } from 'react';

interface ISearch {
  onChange: CallableFunction,
  value: string | null
}

export const Search: React.FC<ISearch> = ({ onChange, value}) => (
  <div>
    <label htmlFor="search">Start searching:</label>
    <input
      type="search"
      name='search'
      id='search'
      onChange={({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.value)}
      placeholder='Search here'
      value={value ?? undefined}
    />
  </div>
);
