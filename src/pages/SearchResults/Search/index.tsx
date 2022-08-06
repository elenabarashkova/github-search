import React, { ChangeEvent } from 'react';

interface ISearch {
  onChange: CallableFunction,
  value: string | null
}

//todo: add validation maxLength for input => sum with operator for fetch could be not more than 256 => need to count

export const Search: React.FC<ISearch> = ({ onChange, value}) => (
  <div>
    <label htmlFor="search">Start searching:</label>
    <input
      type="search"
      name='search'
      id='search'
      onChange={({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.value)}
      placeholder='Search here'
      value={value ?? ''}
    />
  </div>
);
