import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../organisms/Header";
import List from "../organisms/List";
import Footer from "../organisms/Footer";

class ItemList extends Component {
  // 現状では、List（TableのOrganism）に汎用性を持たせていないため、
  // ItemListといっても、コンテンツとしてただListをレンダリングしているに過ぎない。
  // しかし、今後Listに汎用性を持たせるとすれば、各リストページの共通部分だけを
  // ListのOrganismとして切り出し、各Listページ固有の部分
  // （Listのタイトルなど。汎用性の持たせ方によっては、Tableの外枠のフレーム部分やヘッダーなども含む）
  // はpagesの各Listページ（ItemListであればこのページ）に入れるようにすれば、よりpage感が出てくると思われる。
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider>
          <Header />
          <div className="main-wrapper">
            <div className="main">
              <List />
            </div>
          </div>
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default ItemList;
