import { FetchSignal, GetUsersResult, Repository } from './interfaces';

// private token for increasing GitHub Api requests per minute limit
const API_KEY = process.env.REACT_APP_API_KEY;

const HEADERS = {
  headers: {
    'User-Agent': 'request',
    'Authorization': `token ${API_KEY}`,
    'accept': 'application/vnd.github+json'
  }
}

export const QUANTITY_PER_PAGE = 6;

export const getUsers = async (query: string, page: number, signal: FetchSignal): Promise<GetUsersResult> => {
  // retry fetch for 403 response code: requests limit per minute exceeded
  while (true) {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}&per_page=${QUANTITY_PER_PAGE}&page=${page}`,
      {
      ...signal,
      ...HEADERS
      }
    );
    if (response.status !== 403) {
      if (!response.ok) {
        throw new Error('Error');
      }
      const { total_count, items } = await response.json();
      return { total_count, items };
    }
  }
}

export const getUserRepos = async (username: string, signal: FetchSignal): Promise<Array<Repository>> => {
  // retry fetch for 403 response code: requests limit per minute exceeded
  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
      ...signal,
      ...HEADERS
      }
    );
    if (response.status !== 403) {
      if (!response.ok) {
        throw new Error('Error');
      }
      return await response.json();
    }
  }
}
