const TOKEN = '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';

const HEADERS = {
  headers: {
    'User-Agent': 'request',
    'Authorization': `token ${TOKEN}`,
    'accept': 'application/vnd.github+json'
  }
}

export const getUsers = async (query: string): Promise<Array<any>> => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=10`, HEADERS);
  if (!response.ok) {
    throw new Error('Error');
  }
  return (await response.json()).items;
}

export const getUserRepos = async (login: string): Promise<any> => {
  const response = await fetch(`https://api.github.com/users/${login}/repos`, HEADERS);
  if (!response.ok) {
    throw new Error('Error');
  }
  return await response.json();
}
