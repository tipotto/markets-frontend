import React, { Component } from "react";
import Header from "./Header";
import UserList from "./list/UserList";
import Footer from "./Footer";

class List extends Component {
  render() {
    return (
      <div>
        <Header />
        <UserList />
        <Footer />
      </div>
    );
  }
}

export default List;
