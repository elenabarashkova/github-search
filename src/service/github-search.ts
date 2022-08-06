const TOKEN = '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';

const HEADERS = {
  headers: {
    'User-Agent': 'request',
    'Authorization': `token ${TOKEN}`,
    'accept': 'application/vnd.github+json'
  }
}

export const getUsers = async (query: string, signal:  {signal: AbortSignal}): Promise<Array<any>> => {
  while (true) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=6`, {
      ...signal,
      ...HEADERS
    });
    if (response.status !== 403) {
      if (!response.ok) {
        throw new Error('Error');
      }
      return (await response.json()).items;
    }
  }
}

export const getUserRepos = async (username: string, signal:  {signal: AbortSignal}): Promise<Array<any>> => {
  while (true) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      ...signal,
      ...HEADERS
    });
    if (response.status !== 403) {
      if (!response.ok) {
        throw new Error('Error');
      }
      return await response.json();
    }
  }
}
