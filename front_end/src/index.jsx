import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import configureStore, { history } from './stores';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
