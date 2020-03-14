import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../organisms/Header";
import FormContainer from "../organisms/Form";
import Footer from "../organisms/Footer";
import FormData from "../../constants/FormData";

class ItemForm extends Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider>
          <Header />
          <div className="main-wrapper">
            <div className="main">
              <div className="contact-container">
                <h3>アイテム登録</h3>
                <FormContainer form={FormData.ADD_ITEM} />
              </div>
            </div>
          </div>
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default ItemForm;
