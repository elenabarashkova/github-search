export const getUsers = async (query: string): Promise<Array<any>> => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`);
  if (!response.ok) {
    throw new Error('Error');
  }
  return (await response.json()).items;
}
