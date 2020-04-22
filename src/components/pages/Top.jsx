import React from "react";
import { useSelector } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { commonStyle } from "../../style/common";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Item from "../organisms/Item";
import FormContainer from "../organisms/MuiForm";
import FormData from "../../constants/FormData";

const useStyles = makeStyles((theme) =>
  createStyles({
    formContainer: {
      marginTop: "96px",
    },
    resultContainer: {
      marginTop: "96px",
    },
    results: {
      display: "flex",
      flexWrap: "wrap",
    },
    h1: {
      fontFamily: "Avenir Next",
      fontSize: "56px",
      fontWeight: 400,
      color: "#0bc8b6",
    },
    h2: {
      fontSize: "24px",
      marginTop: "8px",
    },
    h3: {
      fontSize: "20px",
      borderBottom: "1px solid #e1e6ec",
      lineHeight: "64px",
    },
    common: {
      fontFamily: "Lato",
      color: "#2b546a",
      fontWeight: 300,
    },
  })
);

const Main = (props) => {
  const common = props.classes;
  const classes = useStyles();
  const items = useSelector((state) => state.search.items);
  const loading = useSelector((state) => state.state.isLoading);

  let content;
  if (loading) {
    content = <div className="contact-submit-message">検索しています...</div>;
  } else if (!loading && items.length === 0) {
    content = (
      <div className="contact-submit-message">検索結果はありません。</div>
    );
  } else {
    content = items.map((item) => (
      <Item
        title={item.title}
        price={item.price}
        image={item.imageUrl}
        detail={item.detailUrl}
        platform={item.platform}
      />
    ));
  }

  return (
    <React.Fragment>
      <MuiThemeProvider>
        <Header />
        <div className={common.wrapper}>
          <div className={common.main}>
            <div>
              <h1 className={classes.h1}>Market Explorer</h1>
              <h2 className={clsx(classes.h2, classes.common)}>
                フリマを一括検索することができます。
              </h2>
            </div>
            <div className={classes.formContainer}>
              <h3 className={clsx(classes.h3, classes.common)}>検索フォーム</h3>
              <FormContainer form={FormData.SEARCH} />
            </div>
            <div className={classes.resultContainer}>
              <h3 className={clsx(classes.h3, classes.common)}>
                あなたの検索結果
              </h3>
              <div className={classes.results}>{content}</div>
            </div>
          </div>
        </div>
        <Footer />
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default withStyles(commonStyle)(Main);
