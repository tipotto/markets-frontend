import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroller";
import commonStyle from "../../style/common";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Item from "../organisms/Item";
import Form from "../organisms/Form";
import FormData from "../../constants/FormData";
import { loadItems } from "../../actions";

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      maxWidth: "65rem",
      margin: "0 auto",
      padding: "6rem 1.5rem",
      [theme.breakpoints.down("xs")]: {
        padding: "2.5rem 1.5rem",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "56rem",
      },
      [theme.breakpoints.only("sm")]: {
        padding: "6rem 3rem",
      },
    },
    formContainer: {
      marginTop: "9rem",
      [theme.breakpoints.down("xs")]: {
        marginTop: "6rem",
      },
    },
    resultContainer: {
      margin: "9rem 0 5rem",
    },
    results: {
      "&>div:not(div.makeStyles-loading-6)": {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        "&:after": {
          content: "''",
          display: "block",
          height: 0,
          [theme.breakpoints.up("md")]: {
            width: "23%",
          },
          [theme.breakpoints.down("sm")]: {
            width: "32%",
          },
        },
      },
    },
    loading: {
      width: "100%",
      textAlign: "center",
      paddingTop: "2rem",
    },
    loadingText: {
      fontSize: "1.2rem",
      marginTop: "1.5rem",
      display: "block",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    title: {
      display: "inline-block",
      marginRight: "1.5rem",
      fontFamily: "Avenir Next",
      fontWeight: 400,
      color: "#0bc8b6",
      letterSpacing: "0.035em",
      fontSize: "1.5rem",
    },
    serviceName: {
      fontFamily: "Avenir Next",
      fontSize: "3.5rem",
      fontWeight: 400,
      marginBottom: "1.2rem",
      color: "#0bc8b6",
      letterSpacing: "0.035em",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3rem",
      },
    },
    siteDescription: {
      fontSize: "1.4rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem",
      },
    },
    sectionTitle: {
      fontSize: "1.4rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.3rem",
      },
    },
    sectionDescription: {
      fontSize: "1.2rem",
      marginTop: "-0.5rem",
      paddingBottom: "1.7rem",
      borderBottom: "1px solid #e1e6ec",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    common: {
      fontFamily: "Lato",
      color: "#2b546a",
      fontWeight: 300,
    },
  })
);

const Main = (props) => {
  const { wrapper } = props.classes;
  const classes = useStyles();
  const dispatch = useDispatch();
  const fetchItems = useSelector((state) => state.search.items);
  const loadedItems = useSelector((state) => state.search.loaded);
  const loading = useSelector((state) => state.state.isLoading);

  const _renderItems = (items) => {
    return items.map((item, index) => (
      <Item
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={item.title}
        price={item.price}
        image={item.imageUrl}
        detail={item.detailUrl}
        platform={item.platform}
      />
    ));
  };

  const _loadMore = () => {
    dispatch(loadItems(fetchItems));
  };

  const _setContent = () => {
    if (loading) {
      return (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
          <span className={clsx(classes.loadingText, classes.common)}>
            ただいま検索しています...
          </span>
        </div>
      );
    } else if (!loading && !loadedItems.length) {
      return (
        <div className={classes.loading}>
          <span className={clsx(classes.loadingText, classes.common)}>
            検索結果はありません。
          </span>
        </div>
      );
    }
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={_loadMore}
        hasMore={fetchItems.length > 0}
        initialLoad={false}
      >
        {_renderItems(loadedItems)}
      </InfiniteScroll>
    );
  };

  return (
    <>
      <Header />
      <div className={wrapper}>
        <div className={classes.main}>
          <div>
            <h1 className={classes.serviceName}>
              <span className={classes.title}>フリマサイト検索</span>
              markets.jp
            </h1>
            <p className={clsx(classes.siteDescription, classes.common)}>
              複数のフリマサイトを一括検索し、商品を比較することができます。
            </p>
          </div>
          <div className={classes.formContainer}>
            <h2 className={clsx(classes.sectionTitle, classes.common)}>
              検索フォーム
            </h2>
            <p className={clsx(classes.sectionDescription, classes.common)}>
              メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションにより、精度の高い検索が可能です。
            </p>
            <Form form={FormData.SEARCH} />
          </div>
          <div id="result" className={classes.resultContainer}>
            <h2 className={clsx(classes.sectionTitle, classes.common)}>
              あなたの検索結果
            </h2>
            <p className={clsx(classes.sectionDescription, classes.common)}>
              気に入った商品をクリックして、各フリマサイトですぐに購入できます。
            </p>
            <div className={classes.results}>{_setContent()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withStyles(commonStyle)(Main);
