import React from 'react';

interface IResultsList {
  users: any
}

export const ResultsList: React.FC<IResultsList> = ({ users = []}) => {
  console.log('In ResultsList:', users)
  return (
    <div>
      users
    </div>
  )
}
