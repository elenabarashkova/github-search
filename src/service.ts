const TOKEN = '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';

const HEADERS = {
  headers: {
    'User-Agent': 'request',
    'Authorization': `token ${TOKEN}`,
    'accept': 'application/vnd.github+json'
  }
}

export const QUANTITY_PER_PAGE = 6;

export const getUsers = async (query: string, page: number, signal:  {signal: AbortSignal}): Promise<any> => {
  while (true) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${QUANTITY_PER_PAGE}&page=${page}`, {
      ...signal,
      ...HEADERS
    });
    if (response.status !== 403) {
      if (!response.ok) {
        throw new Error('Error');
      }
      const { total_count, items } = await response.json();
      return { total_count, items };
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
