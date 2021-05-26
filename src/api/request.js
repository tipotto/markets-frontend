const sendRequest = async (endPoint, body) => {
  const fetchOptions = {
    method: 'POST',
    mode: 'cors',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'fetch',
      'X-Requested-By': 'markets.jp',
    },
    body: JSON.stringify(body),
  };

  return fetch(endPoint, fetchOptions);
};

// const handleErrors = async (res) => {
//   if (res.ok) {
//     return res.json();
//   }

//   switch (res.status) {
//     case 400:
//       throw Error("BAD_REQUEST");
//     case 401:
//       throw Error("UNAUTHORIZED");
//     case 403:
//       throw Error("FORBIDDEN");
//     case 404:
//       throw Error("NOT_FOUND");
//     case 422:
//       throw Error("UNPROCESSABLE_ENTITY");
//     case 500:
//       throw Error("INTERNAL_SERVER_ERROR");
//     case 502:
//       throw Error("BAD_GATEWAY");
//     default:
//       throw Error("UNHANDLED_ERROR");
//   }
// };

const handleResponse = async (res) => {
  const resultJson = await res.json();
  if (res.ok) {
    // console.log("res ok", resultJson);
    return { result: resultJson, error: null };
  }

  // console.log("res error", resultJson);
  const error = { status: res.status, message: resultJson.error };
  return { result: null, error };
};

const fetchItems = async (params) =>
  // return sendRequest('/api/v1/search', params)
  sendRequest('https://www.markets-jp.com/api/v1/search', params)
    .then(handleResponse)
    .then((res) => res)
    .catch((e) => {
      const error = { status: 504, message: 'Gateway Timeout' };
      return { result: null, error };
    });
export default fetchItems;
