const request = async (url, body) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'fetch',
      'X-Requested-By': 'markets.jp',
    },
    body: JSON.stringify(body),
  };

  return fetch(url, options);
};

const handleResponse = async (res) => {
  const resJson = await res.json();
  if (res.ok) return resJson;
  const error = { status: res.status, message: resJson.error };
  return { result: null, error };
};

export const searchData = async (params) =>
  request(process.env.REACT_APP_BACKEND_SEARCH_API, params)
    .then(handleResponse)
    .then((res) => res)
    .catch((e) => {
      const error = { status: 504, message: 'Gateway Timeout' };
      return { result: null, error };
    });

export const analyzeData = async (params) =>
  request(process.env.REACT_APP_BACKEND_ANALYZE_API, params)
    .then(handleResponse)
    .then((res) => res)
    .catch((e) => {
      const error = { status: 504, message: 'Gateway Timeout' };
      return { result: null, error };
    });
