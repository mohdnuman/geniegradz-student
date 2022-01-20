import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import configureStore from './store';
import {Provider} from'react-redux';

let store=configureStore();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


