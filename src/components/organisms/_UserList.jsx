import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestFetch, requestDelete } from "../../actions";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.fetchUserData.userData);

  useEffect(() => {
    console.log("マウントを実行しました。");
    dispatch(requestFetch());
  }, []);

  return (
    <div className="container">
      <div className="container-header">
        <h1>買い物リスト</h1>
        <a href="/" className="new-button">
          + 新規作成
        </a>
      </div>
      <div className="index-table-wrapper">
        <div className="table-head">
          <span className="id-column">ID</span>
          <span>買うもの</span>
        </div>
        <ul className="table-body">
          {users.map(data => {
            return (
              <li key={data.id}>
                <div className="item-data">
                  <span className="id-column">{data.id}</span>
                  <span className="name-column">{data.name}</span>
                </div>
                <div className="item-menu">
                  <input
                    type="button"
                    value="削除"
                    onClick={() => dispatch(requestDelete(data.id))}
                  />
                  <a href="/">編集</a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
