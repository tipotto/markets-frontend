const apiRequest = async (endPoint, body) => {
  const fetchOptions = {
    method: "POST",
    mode: "cors",
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "fetch",
      "X-Requested-By": "markets.jp",
    },
    body: JSON.stringify(body),
  };

  return fetch(endPoint, fetchOptions);
};

const handleErrors = async (res) => {
  if (res.ok) {
    return res.json();
  }

  switch (res.status) {
    case 400:
      throw Error("BAD_REQUEST");
    case 401:
      throw Error("UNAUTHORIZED");
    case 403:
      throw Error("FORBIDDEN");
    case 404:
      throw Error("NOT_FOUND");
    case 422:
      throw Error("UNPROCESSABLE_ENTITY");
    case 500:
      throw Error("INTERNAL_SERVER_ERROR");
    case 502:
      throw Error("BAD_GATEWAY");
    default:
      throw Error("UNHANDLED_ERROR");
  }
};

const search = async (params) => {
  return (
    apiRequest("/api/v1/search", params)
      // ネットワーク周りなどリクエスト以前の段階でのエラーを処理
      .catch((e) => {
        throw Error(e);
      })
      // サーバサイドで発行されたエラーステータスを処理
      // .then((res) => handleErrors(res))
      .then(handleErrors)
      // 以上2つをパスした正常なレスポンスからのJSONオブジェクトを取得
      .then((res) => {
        return res;
      })
  );
};

export default search;
