import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRouter from './pages/MainRouter';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
    	<MainRouter />
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
