import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../organisms/Header";
import Main from "./_Top";
import Footer from "../organisms/Footer";

class Top extends Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider>
          <Header />
          <Main />
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default Top;
