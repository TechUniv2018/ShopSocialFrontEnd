import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Adminconsole from './Components/Adminconsole/Adminconsole';
// import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'),
);

