import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroller';
import commonStyle from '../../style/common';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Item from '../organisms/Item';
import Form from '../organisms/Form';
import FormData from '../../constants/FormData';
import { loadItems } from '../../actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '96px 0',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '700px',
      },
    },
    formContainer: {
      marginTop: '96px',
    },
    resultContainer: {
      margin: '96px 0 80px',
    },
    results: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    loading: {
      width: '100%',
      textAlign: 'center',
      paddingTop: '30px',
    },
    loadingText: {
      fontSize: '18px',
      marginTop: '23px',
    },
    serviceName: {
      fontFamily: 'Avenir Next',
      fontSize: '56px',
      fontWeight: 400,
      color: '#0bc8b6',
      letterSpacing: '0.035em',
      [theme.breakpoints.down('sm')]: {
        fontSize: '80px',
      },
    },
    description: {
      fontSize: '24px',
      marginTop: '8px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px',
      },
    },
    sectionTitle: {
      fontSize: '20px',
      borderBottom: '1px solid #e1e6ec',
      lineHeight: '64px',
    },
    common: {
      fontFamily: 'Lato',
      color: '#2b546a',
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
  // const fetchItemNum = useSelector((state) => state.search.fetchItemNum);
  // const loadItemNum = useSelector((state) => state.search.loadItemNum);

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
  } else if (!loading && loadedItems.length === 0) {
    content = (
      <div className={classes.loading}>
        <div className={clsx(classes.loadingText, classes.common)}>
          検索結果はありません。
        </div>
      </div>
    );
  } else {
    content = (
      <InfiniteScroll
        pageStart={0}
        loadMore={_loadMore}
        hasMore={fetchItems.length > 0}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        initialLoad={false}
        // useWindow={false}
      >
        {_renderItems(loadedItems)}
      </InfiniteScroll>
    );
  }

  return (
    <>
      <Header />
      <div className={wrapper}>
        <div className={classes.main}>
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
            <Form form={FormData.SEARCH} />
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
    </>
  );
};

export default withStyles(commonStyle)(Main);
