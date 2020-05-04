import React from "react";
import { useSelector } from "react-redux";
import {
  MuiThemeProvider,
  withStyles,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    loading: {
      width: "100%",
      textAlign: "center",
      paddingTop: "30px",
    },
    loadingText: {
      fontSize: "18px",
      marginTop: "23px",
    },
    serviceName: {
      fontFamily: "Avenir Next",
      fontSize: "56px",
      fontWeight: 400,
      color: "#0bc8b6",
      letterSpacing: "0.035em",
    },
    description: {
      fontSize: "24px",
      marginTop: "8px",
    },
    sectionTitle: {
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
    content = (
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
        <div className={clsx(classes.loadingText, classes.common)}>
          ただいま検索しています...
        </div>
      </div>
    );
  } else if (!loading && items.length === 0) {
    content = (
      <div className={classes.loading}>
        <div className={clsx(classes.loadingText, classes.common)}>
          検索結果はありません。
        </div>
      </div>
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
              <h1 className={classes.serviceName}>markets.jp</h1>
              <h2 className={clsx(classes.description, classes.common)}>
                フリマサイトを一括検索することができます。
              </h2>
            </div>
            <div className={classes.formContainer}>
              <h3 className={clsx(classes.sectionTitle, classes.common)}>
                検索フォーム
              </h3>
              <FormContainer form={FormData.SEARCH} />
            </div>
            <div id="result" className={classes.resultContainer}>
              <h3 className={clsx(classes.sectionTitle, classes.common)}>
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
