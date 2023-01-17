import { GRAPHQL_SERVER } from './constants';

export const graphQLRequest = async (payload, options = {}) => {
  //since loaders always run first so check the current accessToken
  if (localStorage.getItem('accessToken')) {
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ...options,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      //CHeck when token is expired
      if (res.status === 403) {
        return null;
      }
    }

    const { data } = await res.json();
    return data;
  }
  return null;
};
