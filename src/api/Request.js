const apiRequest = async (method, endPoint, body) => {
  const fetchOptions = {
    method,
    mode: 'cors',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'fetch',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(endPoint, fetchOptions);
  const json = await response.json();
  return { status: response.status, data: json };
};

const search = async (params) => {
  return apiRequest('POST', '/api/search/', params).then(
    (res) => {
      return { data: res.data };
    },
    (error) => {
      return { error };
    }
  );
};

export default search;
