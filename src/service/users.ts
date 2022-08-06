export const getUsers = async (query: string): Promise<Array<any>> => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`);
  if (!response.ok) {
    throw new Error('Error');
  }
  return (await response.json()).items;
}

export const getUserRepos = async (login: string): Promise<any> => {
    const response = await fetch(`https://api.github.com/users/${login}/repos`);
  if (!response.ok) {
    throw new Error('Error');
  }
  return await response.json();
}
