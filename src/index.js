import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import * as serviceWorker from './serviceWorker';
import storeCreator from './store';
import Top from './components/pages/Top';
import Analytics from './components/pages/Analytics';
import './index.css';

Chart.register(zoomPlugin);

const store = storeCreator();
const persistor = persistStore(store);

const customTheme = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      A100: '#82b1ff',
      A200: '#448aff',
      A400: '#2979ff',
      A700: '#2962ff',
      contrastDefaultColor: 'light',
    },
    secondary: {
      50: '#fce4ec',
      100: '#f8bbd0',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63',
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f',
      A100: '#ff80ab',
      A200: '#ff4081',
      A400: '#f50057',
      A700: '#c51162',
      contrastDefaultColor: 'light', // 対象色のデフォルト色をlightテーマにする
    },
  },
};

const breakpoints = {
  xs: 360, // スマホサイズ
  sm: 768, // タブレットサイズ
  md: 1025, // PCサイズ
  lg: 1000000000,
  xl: 1000000000,
};

const breakpointsFull = createBreakpoints({
  values: { ...breakpoints },
  keys: Object.keys(breakpoints),
});

// Material-UIテーマを上書きする
const theme = createTheme({
  default: customTheme,
  breakpoints: breakpointsFull,
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route exact path="/analyze" component={Analytics} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
